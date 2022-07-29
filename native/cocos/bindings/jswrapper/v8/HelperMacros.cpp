/****************************************************************************
 Copyright (c) 2021-2022 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
****************************************************************************/

#include "HelperMacros.h"
#include "Object.h"
#include "Utils.h"

#if defined(RECORD_JSB_INVOKING)

namespace {
bool cmp(const std::pair<const char *, std::tuple<int, uint64_t>> &a, const std::pair<const char *, std::tuple<int, uint64_t>> &b) {
    return std::get<1>(a.second) > std::get<1>(b.second);
}
unsigned int __jsbInvocationCount;                                                         // NOLINT(readability-identifier-naming)
ccstd::unordered_map<char const *, std::tuple<int, uint64_t>> __jsbFunctionInvokedRecords; // NOLINT(readability-identifier-naming)
} // namespace

JsbInvokeScopeT::JsbInvokeScopeT(const char *functionName) : _functionName(functionName) {
    _start = std::chrono::high_resolution_clock::now();
    __jsbInvocationCount++;
}
JsbInvokeScopeT::~JsbInvokeScopeT() {
    auto &ref = __jsbFunctionInvokedRecords[_functionName];
    std::get<0>(ref) += 1;
    std::get<1>(ref) += std::chrono::duration_cast<std::chrono::nanoseconds>(std::chrono::high_resolution_clock::now() - _start).count();
}

#endif

void printJSBInvokeAtFrame(int n) {
#if defined(RECORD_JSB_INVOKING)
    static int cnt = 0;
    cnt += 1;
    if (cnt % n == 0) {
        printJSBInvoke();
    }
#endif
}

void clearRecordJSBInvoke() {
#if defined(RECORD_JSB_INVOKING)
    __jsbInvocationCount = 0;
    __jsbFunctionInvokedRecords.clear();
#endif
}

void printJSBInvoke() {
#if defined(RECORD_JSB_INVOKING)
    static ccstd::vector<std::pair<const char *, std::tuple<int, uint64_t>>> pairs;
    for (const auto &it : __jsbFunctionInvokedRecords) {
        pairs.emplace_back(it); //NOLINT
    }

    std::sort(pairs.begin(), pairs.end(), cmp);
    cc::Log::logMessage(cc::LogType::KERNEL, cc::LogLevel::LEVEL_DEBUG, "Start print JSB function record info....... %d times", __jsbInvocationCount);
    for (const auto &pair : pairs) {
        cc::Log::logMessage(cc::LogType::KERNEL, cc::LogLevel::LEVEL_DEBUG, "\t%s takes %.3lf ms, invoked %u times,", pair.first, std::get<1>(pair.second) / 1000000.0, std::get<0>(pair.second));
    }
    pairs.clear();
    cc::Log::logMessage(cc::LogType::KERNEL, cc::LogLevel::LEVEL_DEBUG, "End print JSB function record info.......\n");
#endif
}

void jsb_common_function(const v8::FunctionCallbackInfo<v8::Value> &_v8args, seFuncType funcName, const char *name) {
    bool ret = false;
    v8::Isolate *_isolate = _v8args.GetIsolate();
    v8::HandleScope _hs(_isolate);
    se::ValueArray &args = se::gValueArrayPool.get(_v8args.Length());
    se::CallbackDepthGuard depthGuard{args, se::gValueArrayPool._depth};
    se::internal::jsToSeArgs(_v8args, args);
    se::Object *thisObject = se::internal::getPrivate(_isolate, _v8args.This());
    se::State state(thisObject, args);
    ret = funcName(state);
    if (!ret) {
        SE_LOGE("[ERROR] Failed to invoke %s, location: %s:%d\n", name, __FILE__, __LINE__);
    }
    se::internal::setReturnValue(state.rval(), _v8args);
}

void jsb_common_ctor(const v8::FunctionCallbackInfo<v8::Value> &_v8args, se::Class *cls, seFuncType funcName, const char *name) {
    v8::Isolate *_isolate = _v8args.GetIsolate();
    v8::HandleScope _hs(_isolate);
    bool ret = true;
    se::ValueArray &args = se::gValueArrayPool.get(_v8args.Length());
    se::CallbackDepthGuard depthGuard{args, se::gValueArrayPool._depth};
    se::internal::jsToSeArgs(_v8args, args);
    se::Object *thisObject = se::Object::_createJSObject(cls, _v8args.This());
    thisObject->_setFinalizeCallback(nullptr);
    se::State state(thisObject, args);
    ret = funcName(state);
    if (!ret) {
        SE_LOGE("[ERROR] Failed to invoke %s, location: %s:%d\n", name, __FILE__, __LINE__);
    }
    se::Value _property;
    bool _found = false;
    _found = thisObject->getProperty("_ctor", &_property);
    if (_found) _property.toObject()->call(args, thisObject);
}

void jsb_common_get(const v8::PropertyCallbackInfo<v8::Value> &_v8args, seFuncType funcName, const char *name) {
    v8::Isolate *_isolate = _v8args.GetIsolate();
    v8::HandleScope _hs(_isolate);
    bool ret = true;
    se::Object *thisObject = se::internal::getPrivate(_isolate, _v8args.This());
    se::State state(thisObject);
    ret = funcName(state);
    if (!ret) {
        SE_LOGE("[ERROR] Failed to invoke %s, location: %s:%d\n", name, __FILE__, __LINE__);
    }
    se::internal::setReturnValue(state.rval(), _v8args);
}
void jsb_common_set(const v8::PropertyCallbackInfo<void> &_v8args, v8::Local<v8::Value> _value, seFuncType funcName, const char *name) {
    v8::Isolate *_isolate = _v8args.GetIsolate();
    v8::HandleScope _hs(_isolate);
    bool ret = true;
    se::Object *thisObject = se::internal::getPrivate(_isolate, _v8args.This());
    se::ValueArray &args = se::gValueArrayPool.get(1);
    se::CallbackDepthGuard depthGuard{args, se::gValueArrayPool._depth};
    se::Value &data{args[0]};
    se::internal::jsToSeValue(_isolate, _value, &data);
    se::State state(thisObject, args);
    ret = funcName(state);
    if (!ret) {
        SE_LOGE("[ERROR] Failed to invoke %s, location: %s:%d\n", name, __FILE__, __LINE__);
    }
}
