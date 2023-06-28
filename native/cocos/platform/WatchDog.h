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
#if CC_DEBUG
    std::chrono::time_point<std::chrono::steady_clock> _startTime;
    void inspect();
#endif
};

#if CC_DEBUG
inline void WatchDog::inspect() {
    using std::chrono::duration_cast;
    using std::chrono::milliseconds;
    using std::chrono::steady_clock;
    auto now = steady_clock::now();
    auto past = duration_cast<milliseconds>(now - _startTime).count();
    CC_LOG_INFO("[WatchDog] timeout: %dms, past: %dms", _timeoutMS, static_cast<int>(past));
}
#endif

} // namespace cc
