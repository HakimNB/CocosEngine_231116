/****************************************************************************
Copyright (c) 2023 Xiamen Yaji Software Co., Ltd.

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
#include "uv.h"
// clang-format on

#include "WatchDog.h"
#include <future>
#include <memory>
#include <thread>
#include "base/Log.h"

#if _WIN32
    #include <Windows.h>
#else
    #include <pthread.h>
#endif

namespace cc {
struct WatchDogContext {
    uv_timer_t *timer;
};
} // namespace cc

namespace {
std::unique_ptr<std::thread> gWatchDogThread;
uv_loop_t loop;
uv_async_t async;
std::promise<void> gWatchDogThreadFence;

void fire_watchdog_timer(uv_timer_t *timer) { // NOLINT
    auto *watcher = reinterpret_cast<cc::WatchDog *>(timer->data);
    if (watcher) {
        watcher->fire();
    }
}

void watcherThreadLoop() {
#if CC_PLATFORM == CC_PLATFORM_WINDOWS
    SetThreadDescription(GetCurrentThread(), L"WatchDog");
    timeBeginPeriod(1); // Enable 1ms timer resolution
#elif CC_PLATFORM == CC_PLATFORM_MAC_IOS || CC_PLATFORM == CC_PLATFORM_MAC_OSX
    pthread_setname_np("WatchDog");
#else
    pthread_setname_np(pthread_self(), "WatchDog");
#endif

    uv_loop_init(&loop);

    uv_async_init(
        &loop, &async, +[](uv_async_t *) {});
    uv_async_send(&async);

    gWatchDogThreadFence.set_value();
    uv_run(&loop, UV_RUN_DEFAULT);
    uv_close(reinterpret_cast<uv_handle_t *>(&async), nullptr);
    uv_loop_close(&loop);

#ifdef _WIN32
    timeEndPeriod(1); // Restore default timer resolution
#endif
}

uv_timer_t *addToWatchQueue(cc::WatchDog *watcher, int32_t timeoutMS) { // NOLINT
    if (!gWatchDogThread) {
        gWatchDogThread = std::make_unique<std::thread>(watcherThreadLoop);
        gWatchDogThreadFence.get_future().get();
        gWatchDogThread->detach();
    }
    auto *timer = new uv_timer_t;
    timer->data = watcher;
    uv_timer_init(&loop, timer);
    uv_timer_start(timer, fire_watchdog_timer, timeoutMS, 0);

    uv_async_send(&async); // wakeup thread
    return timer;
}

void removeFromWatchQueue(uv_timer_t *timer) { // NOLINT
    uv_timer_stop(timer);
    uv_close(
        reinterpret_cast<uv_handle_t *>(timer), +[](uv_handle_t *handle) {
            auto *timer = reinterpret_cast<uv_timer_t *>(handle);
            delete timer;
        });
}
} // namespace

namespace cc {

WatchDog::WatchDog(int32_t timeoutMS, Callback cb) : _onTimeout(cb), _timeoutMS(timeoutMS) {
    if (timeoutMS <= 0) {
        return;
    }
    _context = std::make_unique<WatchDogContext>();
    _startTime = std::chrono::steady_clock::now();
    _context->timer = addToWatchQueue(this, timeoutMS);
}

WatchDog::~WatchDog() {
    auto *timer = _context->timer;
    if (timer) {
        timer->data = nullptr;
        removeFromWatchQueue(timer);
    }
    if (_callbackFired) {
        inspect();
    }
}

void WatchDog::fire() {
    if (_onTimeout) _onTimeout();
    _callbackFired = true;
}
} // namespace cc
