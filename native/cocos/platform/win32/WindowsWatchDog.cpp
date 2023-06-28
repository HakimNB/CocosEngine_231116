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

#include <Windows.h>
#include <conio.h>
#include "../WatchDog.h"
#include "WatchDog.h"
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
    if (timeoutMS <= 0) {
        return;
    }
    _context = std::make_unique<WatchDogContext>();
    _startTime = std::chrono::steady_clock::now();
    BOOLEAN success = CreateTimerQueueTimer(&_context->timer, nullptr, (WAITORTIMERCALLBACK)timer_routine, this, timeoutMS, 0, 0);
    if (!success) {
        CC_LOG_ERROR("Failed to create timer");
    }
}

WatchDog::~WatchDog() {
    if (!_context) return;
    if (!_callbackFired) {
        if (!DeleteTimerQueueTimer(nullptr, _context->timer, nullptr)) {
            CC_LOG_ERROR("Failed to delete timer");
        }
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
