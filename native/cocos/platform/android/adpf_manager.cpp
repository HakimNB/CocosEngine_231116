/*
 * Copyright 2022 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "adpf_manager.h"
#include "platform/BasePlatform.h"

#if CC_PLATFORM == CC_PLATFORM_ANDROID && __ANDROID_API__ >= 30

    #include <algorithm>
    #include <unistd.h>
    #include <chrono>
    #include <cstdio>
    #include <cstdlib>
    #include <cstring>
    #include <sstream>
    #include "java/jni/JniHelper.h"

    #define ALOGI(...)
    #define ALOGE(...)

// Invoke the method periodically (once a frame) to monitor
// the device's thermal throttling status.
void ADPFManager::Monitor() {
    auto currentClock = std::chrono::high_resolution_clock::now();
    auto past = currentClock - last_clock_;
    auto pastMS = std::chrono::duration_cast<std::chrono::milliseconds>(past).count();

    //    if (current_clock - last_clock_ >= kThermalHeadroomUpdateThreshold) {
    if (past > kThermalHeadroomUpdateThreshold) {
        // Update thermal headroom.
        //        CC_LOG_INFO(" Monitor past %d ms", static_cast<int>(pastMS));
        UpdateThermalStatusHeadRoom();
        last_clock_ = currentClock;
    }
}

float ADPFManager::GetThermalStatusNormalized() const {
    if (thermal_manager_ == nullptr) {
        return 0;
    }
    auto level = AThermal_getCurrentThermalStatus(thermal_manager_);
    auto levelValue = (static_cast<int>(level) - static_cast<int>(ATHERMAL_STATUS_NONE)) * 1.0f /
                      static_cast<int>(ATHERMAL_STATUS_SHUTDOWN);
    return levelValue;
}

void ADPFManager::reportThreadWorkDuration(int32_t thread_id, long work_duration) {
    CC_LOG_INFO("ADPFManager::reportThreadWorkDuration threadId: %ld workDuration: %ld", thread_id, work_duration);
    JNIEnv *env = cc::JniHelper::getEnv();

    std::ostringstream ss;
    ss << thread_id;
    std::string key = ss.str();

    jobject obj_hintsession = getHintSession(key, true);
    if ( obj_hintsession == NULL ) {
        CC_LOG_ERROR("ADPFManager::reportThreadWorkDuration unable to get hint session %s", key.c_str());
        return;
    }
    if ( report_actual_work_duration_ == NULL ) {
        CC_LOG_ERROR("ADPFManager::reportThreadWorkDuration unable to get method id, is it initialized?");
        return;
    }
    env->CallVoidMethod(obj_hintsession, report_actual_work_duration_, work_duration);
}

jobject ADPFManager::getHintSession(std::string name, bool create_if_needed) {
    JNIEnv *env = cc::JniHelper::getEnv();
    auto *javaGameActivity = cc::JniHelper::getActivity();

    auto pos = map_hint_sessions.find(name);
    if ( pos == map_hint_sessions.end() ) {
        // not found
        if ( create_if_needed ) {
            jintArray array = env->NewIntArray(1);
            int32_t tid = atoi(name.c_str());
//            int32_t tid = getpid();
            CC_LOG_DEBUG("ADPFManager::getHintSession getpid %d %s", tid, name.c_str());
            env->SetIntArrayRegion(array, 0, 1, &tid);

            const jlong DEFAULT_TARGET_NS = 16666666;

            jobject obj_hintsession = env->CallObjectMethod(obj_perfhint_service_, create_hint_session_, array, DEFAULT_TARGET_NS);
            jboolean check = env->ExceptionCheck();
            CC_LOG_DEBUG("ADPFManager::getHintSession done createHintSession %d %x", check, obj_hintsession);

            if ( obj_hintsession == nullptr ) {
                CC_LOG_ERROR("Failed to create a perf hint session.");
                return NULL;
            }
            CC_LOG_DEBUG("getHintSession about to global new obj_hintsession");
            obj_hintsession = env->NewGlobalRef(obj_hintsession);
            map_hint_sessions[name] = obj_hintsession;
            return obj_hintsession;
        } else {
            return NULL;
        }
    } else {
        jobject session = pos->second;
        return session;
    }
}

// Invoke the API first to set the android_app instance.
void ADPFManager::Initialize() {
    CC_LOG_INFO("ADPFManager::Initialize");
    // Initialize PowerManager reference.
    InitializePowerManager();

    // Initialize PowerHintManager reference.
    InitializePerformanceHintManager();

    beforeTick.bind([&]() {
        // CC_LOG_INFO("Before Tick: ");
        // CC_LOG_DEBUG("beginTick threadId: %ld gettid: %ld getpid: %ld", std::this_thread::get_id(), gettid(), getpi);
        this->BeginPerfHintSession();
        this->Monitor();
    });

    afterTick.bind([&]() {
        // auto frameDuration = std::chrono::duration_cast<std::chrono::nanoseconds>(
        //                          std::chrono::milliseconds(16))
        //                          .count();
        // CC_LOG_INFO("After Tick: %ld", frameDuration); // 16,000,000
        // this->EndPerfHintSession(frameDuration);

        auto fps = cc::BasePlatform::getPlatform()->getFps();
        auto frameDurationNS = 1000000000LL / fps;
        // CC_LOG_INFO("After Tick FPS: %ld frameDuration: %ld", fps, frameDurationNS); // 60 && 16,666,666
        this->EndPerfHintSession(frameDurationNS);
        // CC_LOG_DEBUG("afterTick threadId: %ld gettid: %ld getpid: %ld", std::this_thread::get_id(), gettid(), getpid());
    });

    if (thermal_manager_) {
        auto ret = AThermal_registerThermalStatusListener(
            thermal_manager_, +[](void *data, AThermalStatus status) {
                ADPFManager::getInstance().SetThermalStatus(status);
                CC_LOG_INFO("Thermal Status :%d", static_cast<int>(status));
            },
            nullptr);
        ALOGI("Thermal Status callback registerred to:%d", ret);
    }
}

// Initialize JNI calls for the powermanager.
bool ADPFManager::InitializePowerManager() {
    CC_LOG_INFO("ADPFManager::InitializePowerManager");
    #if __ANDROID_API__ >= 31
    if (android_get_device_api_level() >= 31) {
        // Initialize the powermanager using NDK API.
        thermal_manager_ = AThermal_acquireManager();
        CC_LOG_INFO("ADPFManager::InitializePowerManager NDK");
        return true;
    }
    #endif

    JNIEnv *env = cc::JniHelper::getEnv();
    auto *javaGameActivity = cc::JniHelper::getActivity();

    // Retrieve class information
    jclass context = env->FindClass("android/content/Context");

    // Get the value of a constant
    jfieldID fid =
        env->GetStaticFieldID(context, "POWER_SERVICE", "Ljava/lang/String;");
    jobject str_svc = env->GetStaticObjectField(context, fid);

    // Get the method 'getSystemService' and call it
    jmethodID mid_getss = env->GetMethodID(
        context, "getSystemService", "(Ljava/lang/String;)Ljava/lang/Object;");
    jobject obj_power_service = env->CallObjectMethod(javaGameActivity, mid_getss, str_svc);

    // Add global reference to the power service object.
    obj_power_service_ = env->NewGlobalRef(obj_power_service);

    jclass cls_power_service = env->GetObjectClass(obj_power_service_);
    get_thermal_headroom_ =
        env->GetMethodID(cls_power_service, "getThermalHeadroom", "(I)F");

    // Free references
    env->DeleteLocalRef(cls_power_service);
    env->DeleteLocalRef(obj_power_service);
    env->DeleteLocalRef(str_svc);
    env->DeleteLocalRef(context);

    if (get_thermal_headroom_ == 0) {
        // The API is not supported in the platform version.
        return false;
    }

    return true;
}

// Retrieve current thermal headroom using JNI call.
float ADPFManager::UpdateThermalStatusHeadRoom() {
    #if __ANDROID_API__ >= 31
    if (android_get_device_api_level() >= 31) {
        // Use NDK API to retrieve thermal status headroom.
        auto seconds = kThermalHeadroomUpdateThreshold.count();
        thermal_headroom_ = AThermal_getThermalHeadroom(
            thermal_manager_, seconds);
        if (!std::isnan(thermal_headroom_)) {
            thermal_headroom_valid_ = thermal_headroom_;
        }
        // CC_LOG_INFO("ADPFManager::UpdateThermalStatusHeadRoom NDK %d", thermal_headroom_);
        return thermal_headroom_;
    }
    #endif

    if (get_thermal_headroom_ == 0) {
        return 0.f;
    }
    JNIEnv *env = cc::JniHelper::getEnv();

    // Get thermal headroom!
    thermal_headroom_ =
        env->CallFloatMethod(obj_power_service_, get_thermal_headroom_,
                             kThermalHeadroomUpdateThreshold);

    if (!std::isnan(thermal_headroom_)) {
        thermal_headroom_valid_ = thermal_headroom_;
    }

    ALOGE("Current thermal Headroom %f", thermal_headroom_);
    return thermal_headroom_;
}

// Initialize JNI calls for the PowerHintManager.
bool ADPFManager::InitializePerformanceHintManager() {
    CC_LOG_INFO("ADPFManager::InitializePerformanceHintManager gettid: %ld", gettid());

    JNIEnv *env = cc::JniHelper::getEnv();
    auto *javaGameActivity = cc::JniHelper::getActivity();

    // Retrieve class information
    jclass context = env->FindClass("android/content/Context");

    // Get the value of a constant
    jfieldID fid = env->GetStaticFieldID(context, "PERFORMANCE_HINT_SERVICE",
                                         "Ljava/lang/String;");
    jobject str_svc = env->GetStaticObjectField(context, fid);

    // Get the method 'getSystemService' and call it
    jmethodID mid_getss = env->GetMethodID(
        context, "getSystemService", "(Ljava/lang/String;)Ljava/lang/Object;");
    jobject obj_perfhint_service = env->CallObjectMethod(
        javaGameActivity, mid_getss, str_svc);

    // Add global reference to the power service object.
    obj_perfhint_service_ = env->NewGlobalRef(obj_perfhint_service);

    // Retrieve methods IDs for the APIs.
    jclass cls_perfhint_service = env->GetObjectClass(obj_perfhint_service_);
    create_hint_session_ =
        env->GetMethodID(cls_perfhint_service, "createHintSession",
                         "([IJ)Landroid/os/PerformanceHintManager$Session;");
    jmethodID mid_preferedupdaterate = env->GetMethodID(
        cls_perfhint_service, "getPreferredUpdateRateNanos", "()J");

    // Create int array which contain current tid.
    jintArray array = env->NewIntArray(1);
    int32_t tid = gettid();
    thread_ids_.push_back(tid);
    env->SetIntArrayRegion(array, 0, 1, &tid);
    const jlong DEFAULT_TARGET_NS = 16666666;

    // Create Hint session for the thread.
    jobject obj_hintsession = env->CallObjectMethod(
        obj_perfhint_service_, create_hint_session_, array, DEFAULT_TARGET_NS);
    jboolean check = env->ExceptionCheck();
    CC_LOG_DEBUG("ADPFManager::InitializePerformanceHintManager threadId: %ld gettid: %d getpid: %ld  %d %x", std::this_thread::get_id(), gettid(), getpid(), check, obj_hintsession);
    if (obj_hintsession == nullptr) {
        CC_LOG_DEBUG("Failed First to create a perf hint session.");
    } else {
        obj_perfhint_session_ = env->NewGlobalRef(obj_hintsession);
        preferred_update_rate_ =
            env->CallLongMethod(obj_perfhint_service_, mid_preferedupdaterate);

        // Retrieve mid of Session APIs.
        jclass cls_perfhint_session = env->GetObjectClass(obj_perfhint_session_);
        report_actual_work_duration_ = env->GetMethodID(
            cls_perfhint_session, "reportActualWorkDuration", "(J)V");
        update_target_work_duration_ = env->GetMethodID(
            cls_perfhint_session, "updateTargetWorkDuration", "(J)V");
        set_threads_ = env->GetMethodID(
            cls_perfhint_session, "setThreads", "([I)V");
        check = env->ExceptionCheck();
        if ( check ) {
            env->ExceptionDescribe();
            env->ExceptionClear();
            set_threads_ = nullptr;
        }
    }

    // Free local references
    env->DeleteLocalRef(obj_hintsession);
    env->DeleteLocalRef(array);
    env->DeleteLocalRef(cls_perfhint_service);
    env->DeleteLocalRef(obj_perfhint_service);
    env->DeleteLocalRef(str_svc);
    env->DeleteLocalRef(context);

    if (report_actual_work_duration_ == 0 || update_target_work_duration_ == 0) {
        // The API is not supported in the platform version.
        return false;
    }

    return true;
}

thermalStateChangeListener ADPFManager::thermalListener = NULL;

void ADPFManager::SetThermalStatus(int32_t i) {
    int32_t prev_status_ = thermal_status_;
    int32_t current_status_ = i;
    thermal_status_ = i;
    if (thermalListener != NULL) {
        thermalListener(prev_status_, current_status_);
    }
}

void ADPFManager::SetThermalListener(thermalStateChangeListener listener) {
    thermalListener = listener;
}

// Indicates the start and end of the performance intensive task.
// The methods call performance hint API to tell the performance
// hint to the system.
void ADPFManager::BeginPerfHintSession() { perfhintsession_start_ = std::chrono::high_resolution_clock::now(); }

void ADPFManager::EndPerfHintSession(jlong target_duration_ns) {
    auto current_clock = std::chrono::high_resolution_clock::now();
    auto duration = current_clock - perfhintsession_start_;
    frame_time_ns_ = std::chrono::duration_cast<std::chrono::nanoseconds>(duration).count();
    if (obj_perfhint_session_) {
//        jlong duration_ns = std::chrono::duration_cast<std::chrono::nanoseconds>(
//                                duration * 100000000)
//                                .count();
        jlong duration_ns = std::chrono::duration_cast<std::chrono::nanoseconds>(
                                duration)
                                .count();
        // CC_LOG_DEBUG("ADPFManager::EndPerfHintSession duration actualDuration: %ld targetDuration: %ld", duration_ns, target_duration_ns);

        auto *env = cc::JniHelper::getEnv();

        // Report and update the target work duration using JNI calls.
        env->CallVoidMethod(obj_perfhint_session_, report_actual_work_duration_,
                            duration_ns);
        env->CallVoidMethod(obj_perfhint_session_, update_target_work_duration_,
                            target_duration_ns);
    }
}
void ADPFManager::AddThreadIdToHintSession(int32_t tid)
{
    thread_ids_.push_back(tid);
    auto data = thread_ids_.data();
    for (std::size_t i = 0; i < thread_ids_.size(); i++ ) {
        CC_LOG_INFO("ADPFManager::AddThreadIdToHintSession threadId: %d", data[i]);
    }

    registerThreadIdsToHintSession();
}

void ADPFManager::RemoveThreadIdFromHintSession(int32_t tid)
{
    thread_ids_.erase(std::remove(thread_ids_.begin(), thread_ids_.end(), tid), thread_ids_.end());
    auto data = thread_ids_.data();
    for (std::size_t i = 0; i < thread_ids_.size(); i++ ) {
        CC_LOG_INFO("ADPFManager::RemoveThreadIdFromHintSession threadId: %d", data[i]);
    }

    registerThreadIdsToHintSession();
}

void ADPFManager::registerThreadIdsToHintSession()
{
    JNIEnv *env = cc::JniHelper::getEnv();
    std::size_t size = thread_ids_.size();
    jintArray array = env->NewIntArray(size);
    auto data = thread_ids_.data();
    env->SetIntArrayRegion(array, 0, size, data);
    if ( set_threads_ == nullptr ) {
        // we have to recreate the hint session
        if ( obj_perfhint_session_ ) {
            env->DeleteGlobalRef(obj_perfhint_session_ );
        }
        const jlong DEFAULT_TARGET_NS = 16666666;
        jobject obj_hintsession = env->CallObjectMethod(obj_perfhint_service_, create_hint_session_, array, DEFAULT_TARGET_NS);
        obj_perfhint_session_ = env->NewGlobalRef(obj_hintsession);
    } else {
        // API Level 34
        env->CallVoidMethod(obj_perfhint_session_, set_threads_, array);
    }
}

#endif
