#include <sys/types.h>
#include <unistd.h>
#include <algorithm>
#include <csignal>
#include <cstdlib>
#include <ctime>
#include <functional>
#include <memory>
#include "../WatchDog.h"

#include "WatchDog.h"
#include "base/Log.h"

namespace {
void timer_signal_handler(int signal, siginfo_t *si, void *uc) { // NOLINT
    if (signal == SIGRTMIN) {
        auto *svptr = si->si_value.sival_ptr;
        auto *etimer = reinterpret_cast<cc::WatchDog *>(svptr);
        etimer->fire();
    }
}
} // namespace

namespace cc {

struct WatchDogContext {
    struct sigaction preAction;
    struct sigaction currAction;
    timer_t timer;
};

WatchDog::WatchDog(int32_t timeoutMS, Callback cb) : _onTimeout(cb), _timeoutMS(timeoutMS) {
    if (timeoutMS <= 0) {
        return;
    }

    _context = std::make_unique<WatchDogContext>();

    auto &action = _context->currAction;
    auto &prev = _context->preAction;
    auto &timer = _context->timer;

    memset(&action, 0, sizeof(action));
    action.sa_sigaction = timer_signal_handler;
    action.sa_flags = SA_SIGINFO;
    sigaction(SIGRTMIN, &action, &prev);

    sigevent sev;
    memset(&sev, 0, sizeof(sev));
    sev.sigev_notify = SIGEV_SIGNAL;
    sev.sigev_signo = SIGRTMIN;
    sev.sigev_value.sival_ptr = this;
    timer_create(CLOCK_REALTIME, &sev, &timer);

    struct itimerspec its;
    its.it_value.tv_sec = timeoutMS / 1000;
    its.it_value.tv_nsec = (timeoutMS % 1000) * 1000000;
    its.it_interval.tv_sec = 0;
    its.it_interval.tv_nsec = 0;
    timer_settime(timer, 0, &its, nullptr);
}

WatchDog::~WatchDog() {
    if (!_context) {
        return;
    }
    if (!_callbackFired) {
        timer_delete(_context->timer);
    }
    sigaction(SIGRTMIN, &_context->preAction, nullptr);
}

void WatchDog::fire() {
    if (_onTimeout) _onTimeout();
    _callbackFired = true;
    auto &prevHandler = _context->preAction.sa_handler;
    if (prevHandler && prevHandler != SIG_IGN && prevHandler != SIG_DFL) {
        prevHandler(SIGRTMIN);
    }
}

} // namespace cc
