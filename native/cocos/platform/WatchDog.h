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
#pragma once

#include <chrono>
#include <memory>
#include "base/Log.h"

namespace cc {
struct WatchDogContext;
class WatchDog final {
public:
    using Callback = void (*)();
    WatchDog(int32_t timeoutMS, Callback cb);
    ~WatchDog();

    void fire();

    WatchDogContext *getContext() { return _context.get(); }

private:
    Callback _onTimeout;
    int32_t _timeoutMS{1000};
    bool _callbackFired{false};
    std::unique_ptr<WatchDogContext> _context;
    std::chrono::time_point<std::chrono::steady_clock> _startTime;
    void inspect();
};

inline void WatchDog::inspect() {
    using std::chrono::duration_cast;
    using std::chrono::milliseconds;
    using std::chrono::steady_clock;
    auto now = steady_clock::now();
    auto past = duration_cast<milliseconds>(now - _startTime).count();
    CC_LOG_INFO("[WatchDog] timeout: %dms, past: %dms", _timeoutMS, static_cast<int>(past));
}

} // namespace cc
