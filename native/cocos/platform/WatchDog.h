#pragma once

#include <functional>
#include <memory>

namespace cc {
struct WatchDogContext;
class WatchDog final {
public:
    using Callback = void (*)();
    WatchDog(int32_t timeoutMS, Callback cb);
    ~WatchDog();

    inline void fire();

private:
    Callback _onTimeout;
    int32_t _timeoutMS{1000};
    bool _timerFired{false};
    std::unique_ptr<WatchDogContext> _context;
};

inline void WatchDog::fire() {
    _timerFired = true;
    if (_onTimeout) _onTimeout();
}

} // namespace cc