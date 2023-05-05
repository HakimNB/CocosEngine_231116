#pragma once

#include <algorithm>
#include <chrono>
#include <functional>
#include <memory>

namespace cc {
struct EventLoopContext;
class ELFuture;
class EventLoop;

class FutureTask {
public:
    FutureTask(EventLoop *loop, int id) : _loop(loop), _id(id) {}
    void done();
    void cancel();

private:
    EventLoop *_loop;
    int _id;
};
class EventLoop final /*: public std::enable_shared_from_this<EventLoop> */ {
public:
    EventLoop();
    ~EventLoop();

    EventLoop(const EventLoop &) = delete;
    EventLoop(EventLoop &&) = delete;
    EventLoop &operator=(const EventLoop &) = delete;
    EventLoop &operator=(EventLoop &&) = delete;

    using Callback = std::function<void()>;
    // std::shared_ptr<ELAsync> queueWork(Callback &&);
    void queueWork(Callback &&);
    int schedule(Callback &&task, int delay, int repeat); // NOLINT
    void unschedule(int id);

    FutureTask future(Callback &&task);

    void onTick(Callback &&cb) { _tickCB = std::move(cb); }
    void onBeforeTick(Callback &&cb) { _beforeTickCB = std::move(cb); }
    void onAfterTick(Callback &&cb) { _afterTickCB = std::move(cb); }

    void timerCallback();

    void scheduleNextTick();
    void scheduleTickImmediate();
    void setFPS(float fps);
    void run();
    void stop();
    void reset() {
        _beforeTickCB = nullptr;
        _tickCB = nullptr;
        _afterTickCB = nullptr;
        _stopped = false;
    }
    void inspect();
    inline float getDeltaTimeInSeconds() const;

private:
    inline float getDeltaTimeInMilliseconds() const;
    inline int nextFrameTimeDelayInMillieconds() const;
    void scheduleTick(int delayMS);

    inline auto getDeltaTime() const {
        auto now = std::chrono::high_resolution_clock::now();
        return now - _currentTickTime;
    }

    inline std::chrono::microseconds getFrameTimeMS() const {
        return std::chrono::microseconds(static_cast<int>(1000000.0 / _fps));
    }

    Callback _beforeTickCB;
    Callback _tickCB;
    Callback _afterTickCB;
    EventLoopContext *_context{nullptr};
    std::chrono::time_point<std::chrono::high_resolution_clock> _currentTickTime;
    int _scheduleIndex{0};
    int _futureIndex{0};
    float _fps{60.F};
    bool _stopped{false};

    friend class FutureTask;
};

int EventLoop::nextFrameTimeDelayInMillieconds() const {
    auto shouldDelay = getFrameTimeMS() - getDeltaTime();
    auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(shouldDelay).count();
    return std::clamp<int>(static_cast<int>(ms), 0, static_cast<int>(getFrameTimeMS().count()));
}
float EventLoop::getDeltaTimeInSeconds() const {
    return static_cast<float>(std::chrono::duration_cast<std::chrono::microseconds>(getDeltaTime()).count() * 0.000001);
}

float EventLoop::getDeltaTimeInMilliseconds() const {
    return static_cast<float>(std::chrono::duration_cast<std::chrono::microseconds>(getDeltaTime()).count() * 0.001);
}

} // namespace cc