#pragma once

#include <functional>
#include <memory>

#pragma once

namespace cc {
class WatchDog final {
public:
    using Callback = void (*)();
    WatchDog(int32_t timeoutMS, Callback cb);
    ~WatchDog();
    void fire();

private:
    Callback _onTimeout;
    int32_t _timeoutMS{1000};
    void *_timer{nullptr};
};

} // namespace cc