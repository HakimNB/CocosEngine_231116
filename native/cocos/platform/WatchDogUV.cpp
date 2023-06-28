// clang-format off
#include "uv.h"
// clang-format on

#include <future>
#include <memory>
#include <thread>
#include "WatchDog.h"
#include "base/Log.h"

#if CC_PLATFORM == CC_PLATFORM_WINDOWS
    #include <Windows.h>
#elif CC_PLATFORM == CC_PLATFORM_ANDROID || CC_PLATFORM == CC_PLATFORM_MAC_IOS || CC_PLATFORM == CC_PLATFORM_MAC_OSX
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
std::promise<void> gWatchDogThreadFence;

void fire_watchdog_timer(uv_timer_t *timer) { // NOLINT
    auto *watcher = reinterpret_cast<cc::WatchDog *>(timer->data);
    if (watcher) {
        watcher->fire();
    }
}

void watcherThreadLoop() {
#if CC_PLATFORM == CC_PLATFORM_MAC_IOS || CC_PLATFORM == CC_PLATFORM_MAC_OSX
    pthread_setname_np("WatchDog");
#else
    pthread_setname_np(pthread_self(), "WatchDog");
#endif

    uv_loop_init(&loop);
    // stop loop from
    uv_timer_t ticker;
    uv_timer_init(&loop, &ticker);
    uv_timer_start(
        &ticker, +[](uv_timer_t *) {}, 2000, 2000);

    gWatchDogThreadFence.set_value();
    uv_run(&loop, UV_RUN_DEFAULT);
    uv_close(reinterpret_cast<uv_handle_t *>(&ticker), nullptr);
    uv_loop_close(&loop);
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
#if CC_DEBUG
    _startTime = std::chrono::steady_clock::now();
#endif
    _context->timer = addToWatchQueue(this, timeoutMS);
}

WatchDog::~WatchDog() {
    auto *timer = _context->timer;
    if (timer) {
        timer->data = nullptr;
        removeFromWatchQueue(timer);
    }
#if CC_DEBUG
    if (_callbackFired) {
        auto past = std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now() - _startTime).count();
        CC_LOG_WARNING(" >>>>>>>  %d ms passed.", static_cast<int>(past));
    }
#endif
}

void WatchDog::fire() {
    if (_onTimeout) _onTimeout();
#if CC_DEBUG
    _callbackFired = true;
    auto past = std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now() - _startTime).count();
    CC_LOG_DEBUG(" WatchDog fired after %d ms, timeout value %d ms", static_cast<int>(past), _timeoutMS);
#endif
}
} // namespace cc
