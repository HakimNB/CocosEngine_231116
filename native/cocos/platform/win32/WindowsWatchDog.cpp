#include <Windows.h>
#include <conio.h>
#include "../WatchDog.h"
#include "base/Log.h"

namespace {
VOID CALLBACK timer_routine(PVOID lpParam, BOOLEAN timerOrWaitFired) { // NOLINT
    auto *watchDog = static_cast<cc::WatchDog *>(lpParam);
    if (watchDog) {
        watchDog->fire();
    }
}

} // namespace

namespace cc {
struct WatchDogContext {
    HANDLE timer;
};

WatchDog::WatchDog(int32_t timeoutMS, Callback cb) : _onTimeout(cb), _timeoutMS(timeoutMS) {
    ;
    if (timeoutMS <= 0) {
        return;
    }
    _context = std::make_unique<WatchDogContext>();
    BOOLEAN success = CreateTimerQueueTimer(&_context->timer, nullptr, (WAITORTIMERCALLBACK)timer_routine, this, timeoutMS, 0, 0);
    if (!success) {
        CC_LOG_ERROR("Failed to create timer");
    }
}

WatchDog::~WatchDog() {
    if (!_context) return;
    if (!_timerFired) {
        if (!DeleteTimerQueueTimer(nullptr, _context->timer, nullptr)) {
            CC_LOG_ERROR("Failed to delete timer");
        }
    }
}

} // namespace cc
