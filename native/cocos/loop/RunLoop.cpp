#include "RunLoop.h"
#include <uv.h>
#include <chrono>
#include <cstddef>
#include <iostream>
#include <memory>
#include <mutex>
#include <unordered_map>
#include <utility>

namespace cc {

class ELTimer;

struct EventLoopContext;

struct CallbackPtr {
    EventLoop::Callback fn;
    EventLoopContext *context{nullptr};
    int id{0};
};

template <typename Handle, typename Data>
class EmbeddedHandle final {
public:
    using data_type = Data;

    static inline EmbeddedHandle wrap(void *t) {
        EmbeddedHandle s;
        s._handle = reinterpret_cast<Handle *>(t);
        return s;
    }

    EmbeddedHandle() = default;

    explicit EmbeddedHandle(Data *data) {
        _handle = new Handle;
        std::cout << "* handle[" << typeid(Handle).name() << "] " << _handle << std::endl;
        _handle->data = data;
    }

    // ~EmbeddedHandle() = default;
    ~EmbeddedHandle() {
        std::cout << " finalize " << typeid(Handle).name() << "/" << typeid(Data).name() << std::endl;
    }

    void destroy() {
        delete _handle;
        _handle = nullptr;
    }

    Handle *get() {
        return _handle;
    }

    uv_handle_t *raw() {
        return reinterpret_cast<uv_handle_t *>(_handle);
    }

    Data *data() {
        return reinterpret_cast<Data *>(_handle->data);
    }

private:
    Handle *_handle;
};

struct EventLoopContext {
    std::unique_ptr<uv_loop_t> loop{nullptr};
    std::unique_ptr<uv_timer_t> mainTimer;
    std::unique_ptr<uv_async_t> async;
    EventLoopContext() {
        loop = std::make_unique<uv_loop_t>();
        mainTimer = std::make_unique<uv_timer_t>();
        async = std::make_unique<uv_async_t>();
        uv_loop_init(loop.get());
        uv_timer_init(loop.get(), mainTimer.get());
        async->data = this;
        uv_async_init(
            loop.get(), async.get(), +[](uv_async_t *t) {
                auto *ctx = reinterpret_cast<EventLoopContext *>(t->data);
                std::lock_guard<std::mutex> guard(ctx->taskMtx);
                for (auto &task : ctx->tasks) {
                    task();
                }
                ctx->tasks.clear();
            });
        std::cout << "*mainTimer " << mainTimer.get() << std::endl;
        std::cout << "*async " << async.get() << std::endl;
    }
    ~EventLoopContext() {
        std::cout << "remove all uv context" << std::endl;
        timers.clear();
        futures.clear();
        uv_close(mainTimerHandle(), nullptr);
        uv_close(reinterpret_cast<uv_handle_t *>(async.get()), nullptr);
        uv_walk(
            loop.get(), [](uv_handle_t *h, void *arg) {
                std::cout << " alive handle " << h << ", active " << uv_is_active(h) << std::endl;
                if (uv_is_active(h)) {
                    uv_close(h, nullptr);
                    std::cout << " force closing handle!" << std::endl;
                }
            },
            nullptr);
        uv_run(loop.get(), UV_RUN_DEFAULT); // flush all tasks?
        uv_loop_close(loop.get());
    }

    void inspect() {
        uv_walk(
            loop.get(), [](uv_handle_t *h, void *arg) {
                std::cout << " alive handle " << h << ", active " << uv_is_active(h) << std::endl;
            },
            nullptr);
    }

    inline uv_handle_t *mainTimerHandle() const {
        return reinterpret_cast<uv_handle_t *>(mainTimer.get());
    }

    std::unordered_map<int, std::unique_ptr<ELTimer> > timers;
    std::unordered_map<int, std::unique_ptr<ELFuture> > futures;
    std::mutex taskMtx;
    std::vector<EventLoop::Callback> tasks;
};

// run once only
class ELFuture {
    using handle_type = EmbeddedHandle<uv_async_t, CallbackPtr>;

public:
    ELFuture(EventLoopContext *ctx, int id, EventLoop::Callback &&callback) : _handle(new CallbackPtr{std::move(callback), ctx, id}) {
        auto *loop = ctx->loop.get();
        uv_async_init(
            loop, _handle.get(), +[](uv_async_t *t) {
                auto handle = handle_type::wrap(t);
                auto *cb = handle.data();
                cb->fn();
                cb->context->futures.erase(cb->id);
            });
    }
    ~ELFuture() {
        uv_close(
            _handle.raw(), +[](uv_handle_t *t) {
                auto handle = handle_type::wrap(t);
                delete handle.data();
                handle.destroy();
            });
    }

    void fire() {
        if (!_fired) {
            uv_async_send(_handle.get());
            _fired = true;
        }
    }

private:
    handle_type _handle;
    bool _fired{false};
};

class ELTimer {
    using handle_type = EmbeddedHandle<uv_timer_t, CallbackPtr>;

public:
    ELTimer(EventLoopContext *context, int id, EventLoop::Callback &&fn, int delay, int repeat) : _timer{new CallbackPtr{std::move(fn), context, id}} { // NOLINT
        uv_loop_t *loop = context->loop.get();
        uv_timer_init(loop, _timer.get());
        uv_timer_start(
            _timer.get(), +[](uv_timer_t *t) {
                auto handle = handle_type::wrap(t);
                auto *cb = handle.data();
                auto repeat = uv_timer_get_repeat(handle.get());
                cb->fn();
                if (repeat == 0) {
                    cb->context->timers.erase(cb->id);
                }
            },
            delay, repeat);
    }
    ~ELTimer() {
        uv_timer_stop(_timer.get());
        uv_close(
            _timer.raw(), +[](uv_handle_t *t) {
                auto handle = handle_type::wrap(t);
                delete handle.data();
                handle.destroy();
            });
    }
    ELTimer(const ELTimer &) = delete;
    ELTimer &operator=(const ELTimer &) = delete;

private:
    handle_type _timer;
};

EventLoop::EventLoop() {
    _context = new EventLoopContext();
    _context->mainTimer->data = this;
    _currentTickTime = std::chrono::high_resolution_clock::now();
}

EventLoop::~EventLoop() {
    std::cout << "deleting EventLoop " << std::endl;
    delete _context;
}

// std::shared_ptr<ELAsync> EventLoop::queueWork(Callback &&callback) {
// return std::make_shared<ELAsync>(_context, std::move(callback));
// }
void EventLoop::queueWork(Callback &&callback) {
    {
        std::lock_guard<std::mutex> guard(_context->taskMtx);
        _context->tasks.emplace_back(std::move(callback));
    }
    uv_async_send(_context->async.get());
}

int EventLoop::schedule(Callback &&task, int delay, int repeat) { // NOLINT
    int id = ++_scheduleIndex;
    _context->timers.emplace(id, std::make_unique<ELTimer>(_context, id, std::move(task), delay, repeat));
    return id;
}

void EventLoop::unschedule(int id) {
    _context->timers.erase(id);
}

FutureTask EventLoop::future(Callback &&task) {
    int id = ++_futureIndex;
    FutureTask ret{this, id};
    _context->futures.emplace(id, std::make_unique<ELFuture>(_context, id, std::move(task)));
    return ret;
}

void EventLoop::timerCallback() {
    _currentTickTime = std::chrono::high_resolution_clock::now();
    if (_beforeTickCB) _beforeTickCB();
    if (_tickCB) _tickCB();
    if (_afterTickCB) _afterTickCB();
}

void EventLoop::scheduleNextTick() {
    int delay = nextFrameTimeDelayInMillieconds();
    std::cout << " next tick in " << delay << " ms" << std::endl;
    scheduleTick(delay);
}

void EventLoop::scheduleTick(int delayMS) {
    auto *timer = _context->mainTimer.get();
    std::cout << "   __ schedule tick in " << delayMS << " ms" << std::endl;
    uv_timer_start(
        timer, +[](uv_timer_t *t) {
            auto *r = reinterpret_cast<EventLoop *>(t->data);
            r->timerCallback();
        },
        delayMS, 0);
}

void EventLoop::scheduleTickImmediate() {
    std::cout << " scheduleTickImmediate ..!!!" << std::endl;
    auto *timer = _context->mainTimer.get();
    uv_timer_stop(timer);
    scheduleTick(0);
}

void EventLoop::setFPS(float fps) {
    _fps = fps;
    scheduleTickImmediate();
}

void EventLoop::run() {
    auto *loop = _context->loop.get();
    auto *timer = _context->mainTimer.get();
    timer->data = this;

    scheduleTickImmediate();

    // while (!_stopped) {
    uv_run(loop, UV_RUN_DEFAULT);
    // std::cout << " run once ---- " << std::endl;
    // }
    uv_timer_stop(timer);
}

void EventLoop::stop() {
    std::cout << "stop inside " << this << ", context " << _context << std::endl;
    _stopped = true;
    auto *loop = _context->loop.get();
    uv_stop(loop);
}

void EventLoop::inspect() {
    _context->inspect();
}

void FutureTask::done() {
    _loop->queueWork([loop = _loop, id = _id]() {
        auto &futures = loop->_context->futures;
        auto itr = futures.find(id);
        if (itr != futures.end()) {
            itr->second->fire();
        }
    });
}

void FutureTask::cancel() {
    _loop->queueWork([loop = _loop, id = _id]() {
        auto &futures = loop->_context->futures;
        futures.erase(id);
    });
}

} // namespace cc