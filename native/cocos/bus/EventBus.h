#pragma once

#include <functional>
#include <memory>
#include <typeinfo>
#include <utility>

namespace cc {

namespace bus {

struct EventBase {
    const char *eventName;
};

template <typename T>
struct Event : EventBase {
    T info;
};

template <typename T>
struct EventParam : std::false_type {};

#define USE_EVENT_PARAMETER_TYPE(tp)         \
    template <>                              \
    struct EventParam<tp> : std::true_type { \
        using type = tp;                     \
    }

#define PARAMETER_TYPES(F) \
    F(char);               \
    F(int8_t);             \
    F(uint16_t);           \
    F(int16_t);            \
    F(uint32_t);           \
    F(int32_t);            \
    F(uint64_t);           \
    F(int64_t);            \
    F(float);              \
    F(double);             \
    F(const char *);       \
    F(void *);

PARAMETER_TYPES(USE_EVENT_PARAMETER_TYPE)

class EventBus {
public:
    static EventBus *accquire(const char *busName);
    template <typename... ARGS>
    void send(ARGS... args);

    void dispatch(std::unique_ptr<EventBase> event);
};

template <typename... ARGS>
void EventBus::send(ARGS... args) {
    using arg_type = std::tuple<typename std::remove_cv<typename EventParam<ARGS>::type>::type...>;
    auto event = std::make_unique<Event<arg_type>>(std::make_tuple<ARGS...>(args...));
    dispatch(event);
}

// class PersistentBus {
// };

struct EventCallbackBase {
};

template <typename T>
struct EventCallbackImpl;

template <typename... ARGS>
struct EventCallbackImpl<void (*)(ARGS...)> : EventCallbackBase {
    using arg_tuple_type = std::tuple<ARGS...>;
    using func_type = std::function<void(ARGS...)>;
    static constexpr size_t argN = sizeof...(ARGS);
};

template <typename... ARGS>
struct EventCallbackImpl<std::function<void(ARGS...)>> : EventCallbackBase {
    using arg_tuple_type = std::tuple<ARGS...>;
    using func_type = std::function<void(ARGS...)>;
    static constexpr size_t argN = sizeof...(ARGS);
};

template <typename C, typename... ARGS>
struct EventCallbackImpl<void (C::*)(ARGS...)> : EventCallbackBase {
    using arg_tuple_type = std::tuple<ARGS...>;
    using func_type = std::function<void(ARGS...)>;
    static constexpr size_t argN = sizeof...(ARGS);
};

template <typename C, typename... ARGS>
struct EventCallbackImpl<void (C::*)(ARGS...) const> : EventCallbackBase {
    using arg_tuple_type = std::tuple<ARGS...>;
    using func_type = std::function<void(ARGS...)>;
    static constexpr size_t argN = sizeof...(ARGS);
};
template <typename T>
struct FunctionSignature {
    using type = decltype(&T::operator());
};

template <typename R, typename... ARGS>
struct FunctionSignature<R (*)(ARGS...)> {
    using type = R (*)(ARGS...);
};

template <typename R, typename C, typename... ARGS>
struct FunctionSignature<R (C::*)(ARGS...)> {
    using type = R (C::*)(ARGS...);
};

template <typename R, typename C, typename... ARGS>
struct FunctionSignature<R (C::*)(ARGS...) const> {
    using type = R (C::*)(ARGS...) const;
};

template <typename L>
struct EventCallback {
    using fn_type = EventCallbackImpl<typename FunctionSignature<L>::type>;
    using arg_tuple_type = typename fn_type::arg_tuple_type;
    static constexpr size_t argN = fn_type::argN;
};

class Listener {
public:
    Listener(const std::shared_ptr<EventBus> &bus);

    template <typename C>
    void receive(C callback);

private:
    std::shared_ptr<EventBus> bus;
};


template <typename F, typename... ARGS, size_t ...indexs>
void callWithTuple(F func, const std::tuple<ARGS...> &args, std::index_sequence<sizeof...(indexs)> idx) {
    func(std::get<indexs>(args)...);
}

template <typename C>
void Listener::receive(C callback) {
    using CallbackType = EventCallback<C>;
    using tuple_arg_type = typename CallbackType::tuple_arg_type;
    typename CallbackType::fn_type func = callback;
    auto wrap = [=](const tuple_arg_type &arg) {
        callWithTuple(func, arg, std::make_index_sequence<CallbackType::argN>{});
    };

}

} // namespace bus
} // namespace cc
