/****************************************************************************
 Copyright (c) 2021-2023 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 of the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
****************************************************************************/

// clang-format off
#include <winsock2.h>
#include <ws2tcpip.h>
#include "application/ApplicationManager.h"
#include "base/DeferredReleasePool.h"
#include "engine/EngineEvents.h"
#include "uv/uv.h"
// clang-format on

#include "platform/win32/WindowsPlatform.h"
#include "platform/win32/modules/SystemWindowManager.h"

#include "bindings/jswrapper/SeApi.h"

#include <Windows.h>
#include <shellapi.h>
#include <sstream>

#include "modules/Accelerometer.h"
#include "modules/Battery.h"
#include "modules/Network.h"
#include "modules/System.h"
#if defined(CC_SERVER_MODE)
    #include "platform/empty/modules/Screen.h"
    #include "platform/empty/modules/SystemWindow.h"
#else
    #include "modules/Screen.h"
    #include "modules/SystemWindow.h"
#endif
#include "base/memory/Memory.h"
#include "modules/Vibrator.h"

namespace {
/**
 @brief  This function changes the PVRFrame show/hide setting in register.
 @param  bEnable If true show the PVRFrame window, otherwise hide.
*/
void PVRFrameEnableControlWindow(bool bEnable) {
    HKEY hKey = 0;

    // Open PVRFrame control key, if not exist create it.
    if (ERROR_SUCCESS != RegCreateKeyExW(HKEY_CURRENT_USER,
                                         L"Software\\Imagination Technologies\\PVRVFRame\\STARTUP\\",
                                         0,
                                         0,
                                         REG_OPTION_NON_VOLATILE,
                                         KEY_ALL_ACCESS,
                                         0,
                                         &hKey,
                                         nullptr)) {
        return;
    }

    const WCHAR *wszValue = L"hide_gui";
    const WCHAR *wszNewData = (bEnable) ? L"NO" : L"YES";
    WCHAR wszOldData[256] = {0};
    DWORD dwSize = sizeof(wszOldData);
    LSTATUS status = RegQueryValueExW(hKey, wszValue, 0, nullptr, (LPBYTE)wszOldData, &dwSize);
    if (ERROR_FILE_NOT_FOUND == status               // the key not exist
        || (ERROR_SUCCESS == status                  // or the hide_gui value is exist
            && 0 != wcscmp(wszNewData, wszOldData))) // but new data and old data not equal
    {
        dwSize = static_cast<DWORD>(sizeof(WCHAR) * (wcslen(wszNewData) + 1));
        RegSetValueEx(hKey, wszValue, 0, REG_SZ, (const BYTE *)wszNewData, dwSize);
    }

    RegCloseKey(hKey);
}

void mainTimerCallback(uv_timer_t *timer) {
    cc::WindowsPlatform *platform = reinterpret_cast<cc::WindowsPlatform *>(timer->data);
    platform->step();
}

struct FnTask {
    std::function<void()> fn;
    uv_timer_t *timer;
    int32_t id;
    bool repeat;
};

int32_t timerIndex{1000};
std::unordered_map<int32_t, FnTask *> timerMap;

} // namespace

namespace cc {
WindowsPlatform::WindowsPlatform() {
    mainLoop = malloc(sizeof(uv_loop_t));
    mainTimer = malloc(sizeof(uv_timer_t));
    auto *l = static_cast<uv_loop_t *>(mainLoop);
    auto *t = static_cast<uv_timer_t *>(mainTimer);
    uv_loop_init(l);
    uv_timer_init(l, t);
    t->data = this;
}
WindowsPlatform::~WindowsPlatform() {
#ifdef USE_WIN32_CONSOLE
    FreeConsole();
#endif
    auto *l = static_cast<uv_loop_t *>(mainLoop);
    auto *t = static_cast<uv_timer_t *>(mainTimer);
    uv_timer_stop(t);
    uv_close(
        reinterpret_cast<uv_handle_t *>(t), +[](uv_handle_t *t) {
            free(t);
        });
    uv_loop_close(l);
    // free(mainTimer);
    free(mainLoop);
}

int32_t WindowsPlatform::init() {
    registerInterface(std::make_shared<Accelerometer>());
    registerInterface(std::make_shared<Battery>());
    registerInterface(std::make_shared<Network>());
    registerInterface(std::make_shared<Screen>());
    registerInterface(std::make_shared<System>());
    _windowManager = std::make_shared<SystemWindowManager>();
    registerInterface(_windowManager);
    registerInterface(std::make_shared<Vibrator>());

#ifdef USE_WIN32_CONSOLE
    AllocConsole();
    freopen("CONIN$", "r", stdin);
    freopen("CONOUT$", "w", stdout);
    freopen("CONOUT$", "w", stderr);
#endif

    PVRFrameEnableControlWindow(false);

    return _windowManager->init();
}

void WindowsPlatform::exit() {
    _quit = true;
}

int32_t WindowsPlatform::setTimeout(int delay, std::function<void()> &&func, bool repeat) {
    if (!mainLoop) {
        return 0;
    }
    int32_t id = (timerIndex++);
    auto *l = static_cast<uv_loop_t *>(mainLoop);
    uv_timer_t *timer = static_cast<uv_timer_t *>(malloc(sizeof(uv_timer_t)));
    uv_timer_init(l, timer);
    auto *task = new FnTask{std::move(func), timer, id, repeat};
    timer->data = task;
    timerMap[id] = task;

    uv_timer_start(
        timer, +[](uv_timer_t *t) {
            auto *task = reinterpret_cast<FnTask *>(t->data);
            task->fn();
            if (!task->repeat) {
                uv_close(
                    reinterpret_cast<uv_handle_t *>(t), +[](uv_handle_t *t) {
                        auto *task = reinterpret_cast<FnTask *>(t->data);
                        timerMap.erase(task->id);
                        delete task;
                        free(reinterpret_cast<uv_timer_t *>(t));
                    });
            }
        },
        delay, repeat ? delay : 0);
    return id;
}

void WindowsPlatform::clearTimeout(int32_t id) {
    auto itr = timerMap.find(id);
    if (itr != timerMap.end()) {
        uv_timer_stop(itr->second->timer);
        uv_close(
            reinterpret_cast<uv_handle_t *>(itr->second->timer), +[](uv_handle_t *t) {
                auto *task = reinterpret_cast<FnTask *>(t->data);
                timerMap.erase(task->id);
                delete task;
                free(reinterpret_cast<uv_timer_t *>(t));
            });
    }
}

int32_t WindowsPlatform::loopWithUV() {
    QueryPerformanceCounter(&nLast);
    QueryPerformanceFrequency(&nFreq);
    auto *l = static_cast<uv_loop_t *>(mainLoop);
    auto *t = static_cast<uv_timer_t *>(mainTimer);
    uv_timer_start(t, mainTimerCallback, 0, 0);

    // uv_async_t notify;
    // notify.data = this;
    // uv_async_init(
    //     l, &notify, +[](uv_async_t *async) {
    //         WindowsPlatform *p = reinterpret_cast<WindowsPlatform *>(async->data);
    //         // CC_LOG_DEBUG(" - notfiy next frame");
    //         //p->scheduleNextStep();
    //     });

    // stepListener.bind([&](int i) {
    //     stepContinue = i;
    //     uv_async_send(&notify);
    // });
    uv_timer_t we;
    uv_timer_init(l, &we);
    we.data = _windowManager.get();
    uv_timer_start(
        &we, +[](uv_timer_t *i) {
            auto *wm = static_cast<ISystemWindowManager *>(i->data);
            // CC_LOG_DEBUG(" - process event");
            wm->processEvent();
        },
        10, 10);

    uv_prepare_t idle;
    uv_prepare_init(l, &idle);
    idle.data = _windowManager.get();
    uv_prepare_start(
        &idle, +[](uv_prepare_t *i) {
            auto *wm = static_cast<ISystemWindowManager *>(i->data);
            // CC_LOG_DEBUG(" - process event");
            wm->processEvent();
            CC_CURRENT_ENGINE()->getScheduler()->update(0.016);
            se::ScriptEngine::getInstance()->handlePromiseExceptions();
        });

    uv_check_t post;
    uv_check_init(l, &post);
    post.data = this;
    uv_check_start(&post, [](uv_check_t *post) {
        // se::ScriptEngine::getInstance()->mainLoopUpdate();
        cc::DeferredReleasePool::clear();
        // if (_quit) {
        // uv_stop(static_cast<uv_loop_t *>(mainLoop));
        // }
        se::ScriptEngine::getInstance()->flushTasks();
    });

    onResume();
    while (!_quit) {
        uv_run(l, UV_RUN_ONCE);
        // uv_run(l, UV_RUN_NOWAIT);
    }
    // uv_run(static_cast<uv_loop_t *>(mainLoop), UV_RUN_DEFAULT);
    onDestroy();
    uv_prepare_stop(&idle);
    stepListener.reset();
    // mainLoop = nullptr;
    return 0;
}

void *WindowsPlatform::getLoop() {
    return mainLoop;
}

void WindowsPlatform::scheduleNextStep() {
    QueryPerformanceCounter(&nNow);
    LONGLONG desiredInterval = (LONGLONG)(1.0 / getFps() * nFreq.QuadPart);
    LONGLONG actualInterval = nNow.QuadPart - nLast.QuadPart;
    nLast = nNow;
    LONG waitMS = static_cast<LONG>((2 * desiredInterval - actualInterval) * 1000LL / nFreq.QuadPart - 1L);
    // CC_LOG_DEBUG(" -- next tick %d ms, dt %d ms", (int)waitMS, (int)(actualInterval * 1000LL / nFreq.QuadPart));
    waitMS = waitMS > 0 ? (desiredInterval * 1000LL / nFreq.QuadPart) : 0;
    if (!_quit) {
        uv_timer_start(static_cast<uv_timer_t *>(mainTimer), mainTimerCallback, waitMS, 0);
    }
}

void WindowsPlatform::step() {
    // _windowManager->processEvent();
    events::Tick::broadcast(0);

    // if (stepContinue != 0)
    scheduleNextStep();
}

#if 1

int32_t WindowsPlatform::loop() {
    return loopWithUV();
}

#else

int32_t WindowsPlatform::loop() {
    #if CC_EDITOR
    _windowManager->processEvent();
    runTask();
    #else
    ///////////////////////////////////////////////////////////////////////////
    /////////////// changing timer resolution
    ///////////////////////////////////////////////////////////////////////////
    UINT TARGET_RESOLUTION = 1; // 1 millisecond target resolution
    TIMECAPS tc;
    UINT wTimerRes = 0;
    if (TIMERR_NOERROR == timeGetDevCaps(&tc, sizeof(TIMECAPS))) {
        wTimerRes = std::min(std::max(tc.wPeriodMin, TARGET_RESOLUTION), tc.wPeriodMax);
        timeBeginPeriod(wTimerRes);
    }

    float dt = 0.f;
    const DWORD _16ms = 16;

    // Main message loop:
    LARGE_INTEGER nFreq;
    LARGE_INTEGER nLast;
    LARGE_INTEGER nNow;

    LONGLONG actualInterval = 0LL;  // actual frame internal
    LONGLONG desiredInterval = 0LL; // desired frame internal, 1 / fps
    LONG waitMS = 0L;

    QueryPerformanceCounter(&nLast);
    QueryPerformanceFrequency(&nFreq);

    onResume();
    while (!_quit) {
        desiredInterval = (LONGLONG)(1.0 / getFps() * nFreq.QuadPart);
        _windowManager->processEvent();

        QueryPerformanceCounter(&nNow);
        actualInterval = nNow.QuadPart - nLast.QuadPart;
        if (actualInterval >= desiredInterval) {
            nLast.QuadPart = nNow.QuadPart;
            runTask();
        } else {
            // The precision of timer on Windows is set to highest (1ms) by 'timeBeginPeriod' from above code,
            // but it's still not precise enough. For example, if the precision of timer is 1ms,
            // Sleep(3) may make a sleep of 2ms or 4ms. Therefore, we subtract 1ms here to make Sleep time shorter.
            // If 'waitMS' is equal or less than 1ms, don't sleep and run into next loop to
            // boost CPU to next frame accurately.
            waitMS = static_cast<LONG>((desiredInterval - actualInterval) * 1000LL / nFreq.QuadPart - 1L);
            if (waitMS > 1L)
                Sleep(waitMS);
        }
    }

    if (wTimerRes != 0)
        timeEndPeriod(wTimerRes);

    onDestroy();
    #endif
    return 0;
}

#endif

ISystemWindow *WindowsPlatform::createNativeWindow(uint32_t windowId, void *externalHandle) {
    return ccnew SystemWindow(windowId, externalHandle);
}

} // namespace cc
