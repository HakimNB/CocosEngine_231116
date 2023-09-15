/****************************************************************************
 Copyright (c) 2022-2023 Xiamen Yaji Software Co., Ltd.

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

#include <cstddef>
#include <cstdint>
#include <functional>
#include <type_traits>
namespace cc {
namespace event {
namespace intl {
template <size_t N, size_t I = 0>
struct hash_calc { // NOLINT
    static constexpr size_t apply(const char (&str)[N]) {
        return (hash_calc<N, I + 1>::apply(str) ^ str[I]) * 16777619U;
    };
};

template <size_t N>
struct hash_calc<N, N> { // NOLINT
    static constexpr size_t apply(const char (&/*used*/)[N]) {
        return 2166136261U;
    };
};

template <size_t N>
constexpr size_t hash(const char (&str)[N]) {
    return hash_calc<N>::apply(str);
}

template <typename... TYPES>
struct HeadType;

template <typename Head, typename... Tails>
struct HeadType<Head, Tails...> {
    using head = Head;
    using remain = HeadType<Tails...>;
};

template <typename Head>
struct HeadType<Head> {
    using head = Head;
    using remain = HeadType<>;
};

template <>
struct HeadType<> {
    using head = void;
    using remain = HeadType<>;
};

template <int idx, typename EHandler>
constexpr bool validateParameters() {
    return true;
}

template <int idx, typename EHandler, typename Head>
constexpr bool validateParameters(Head && /*unused*/) {
    using element_t = std::remove_reference_t<std::tuple_element_t<idx, typename EHandler::_argument_tuple_types>>;
    using head = std::remove_reference_t<Head>;
    constexpr bool assignable = std::is_assignable<head, element_t>::value || std::is_convertible<head, element_t>::value;
    constexpr bool ret = assignable;
    static_assert(ret, "Parameter type incorrect");
    return ret;
}

template <int idx, typename EHandler, typename Head, typename... ARGS>
constexpr bool validateParameters(Head &&head, ARGS &&...remain) {
    return validateParameters<idx, EHandler, Head>(std::forward<Head>(head)) && validateParameters<idx + 1, EHandler, ARGS...>(std::forward<ARGS>(remain)...);
}

template <typename T>
struct TupleExtractor {
    using func_type = void();
};

template <typename... ARGS>
struct TupleExtractor<std::tuple<ARGS...>> {
    using func_type = void(ARGS...);
    using std_func_type = std::function<void(ARGS...)>;
};

template <typename F>
struct FunctionTrait : public FunctionTrait<decltype(&F::operator())> {
    constexpr static bool IS_LAMBDA = true;
};

template <typename R, typename C, typename... ARGS>
struct FunctionTrait<R (C::*)(ARGS...)> {
    constexpr static bool IS_LAMBDA = false;
    using function_type = R (C::*)(ARGS...);
};

template <typename R, typename C, typename... ARGS>
struct FunctionTrait<R (C::*)(ARGS...) const> {
    constexpr static bool IS_LAMBDA = false;
    using function_type = R (C::*)(ARGS...) const;
};

template <typename R, typename... ARGS>
struct FunctionTrait<R (*)(ARGS...)> {
    using function_type = R (*)(ARGS...);
    constexpr static bool IS_LAMBDA = false;
};

template <typename R, typename... ARGS>
struct FunctionTrait<R(ARGS...)> {
    using function_type = R(ARGS...);
    constexpr static bool IS_LAMBDA = false;
};
template <typename R, typename... ARGS>
struct FunctionTrait<std::function<R(ARGS...)>> {
    using function_type = std::function<R(ARGS...)>;
    constexpr static bool IS_LAMBDA = false;
};

template <typename T>
struct RemoveClass {
    using type = T;
};

template <typename C, typename R, typename... ARGS>
struct RemoveClass<R (C::*)(ARGS...)> {
    using type = std::function<R(ARGS...)>;
};
template <typename C, typename R, typename... ARGS>
struct RemoveClass<R (C::*)(ARGS...) const> {
    using type = std::function<R(ARGS...)>;
};

template <typename F>
using function_type_t = typename FunctionTrait<F>::function_type;

template <typename F>
using lambda_without_class_t = typename RemoveClass<function_type_t<F>>::type;

template <typename F>
using mix_function_type = typename std::conditional<FunctionTrait<F>::IS_LAMBDA,
                                                    lambda_without_class_t<F>,
                                                    function_type_t<F>>::type;

template <typename F>
inline auto convertLambda(F &&lambda) {
    return static_cast<mix_function_type<F>>(std::forward<F>(lambda));
}
template <typename T>
struct TgtEvtFnTrait;

template <typename Func, typename Tuple, std::size_t... I>
auto apply_impl(Func &&f, Tuple &&t, std::index_sequence<I...>) // NOLINT
    -> decltype(std::forward<Func>(f)(std::get<I>(std::forward<Tuple>(t))...)) {
    return std::forward<Func>(f)(std::get<I>(std::forward<Tuple>(t))...);
}

template <typename Func, typename Tuple>
auto applyx(Func &&f, Tuple &&t)
    -> decltype(apply_impl(
        std::forward<Func>(f),
        std::forward<Tuple>(t),
        std::make_index_sequence<std::tuple_size<typename std::decay<Tuple>::type>::value>{})) {
    return apply_impl(
        std::forward<Func>(f),
        std::forward<Tuple>(t),
        std::make_index_sequence<std::tuple_size<typename std::decay<Tuple>::type>::value>{});
}
template <typename C, typename R, typename... ARGS>
struct TgtEvtFnTrait<R(C *, ARGS...)> {
    using param0_type = C;
    using src_func_type = R(C *, ARGS...);
    constexpr static bool IS_MEMBER_FUNC = false;
    template <typename TgtEvent>
    static constexpr bool accept() {
        using event_type = typename TgtEvent::EventType;
        return sizeof...(ARGS) == 0 && std::is_same<param0_type, event_type>::value;
    }

    template <bool COND, typename Func, typename EmitterType, typename EventType>
    struct invoker {
        static auto invoke(Func &&func) {
            return [&func](EmitterType * /*self*/, EventType *event) {
                func(event);
            };
        }
    };
    template <typename Func, typename EmitterType, typename EventType>
    struct invoker<false, Func, EmitterType, EventType> {
        static auto invoke(Func &&func) {
            static_assert(std::is_same<param0_type, EmitterType>::value, "mismatch emitter type");
            return [func](EmitterType *self, EventType *event) {
                return apply([self, func](auto &&...args) { func(self, args...); }, event->args);
            };
        }
    };
    template <typename TgtEvent>
    static auto wrap(src_func_type func) {
        using event_type = typename TgtEvent::EventType;
        using persist_function_type = typename TgtEvent::_persist_function_type;
        using emitter_type = typename TgtEvent::_emitter_type;
        persist_function_type ret = invoker<accept<TgtEvent>(), src_func_type, emitter_type, event_type>::invoke(func);
        return ret;
    }
};
template <typename C, typename R, typename... ARGS>
struct TgtEvtFnTrait<R(const C *, ARGS...)> {
    using param0_type = C;
    using src_func_type = R(const C *, ARGS...);
    constexpr static bool IS_MEMBER_FUNC = false;
    template <typename TgtEvent>
    static constexpr bool accept() {
        using event_type = typename TgtEvent::EventType;
        return sizeof...(ARGS) == 0 && std::is_same<param0_type, event_type>::value;
    }

    template <bool COND, typename Func, typename EmitterType, typename EventType>
    struct invoker {
        static auto invoke(Func &&func) {
            return [&func](EmitterType * /*self*/, EventType *event) {
                func(event);
            };
        }
    };
    template <typename Func, typename EmitterType, typename EventType>
    struct invoker<false, Func, EmitterType, EventType> {
        static auto invoke(Func &&func) {
            return [func](EmitterType *self, EventType *event) {
                return apply([self, func](auto &&...args) { func(self, args...); }, event->args);
            };
        }
    };
    template <typename TgtEvent>
    static auto wrap(src_func_type func) {
        using event_type = typename TgtEvent::EventType;
        using emitter_type = typename TgtEvent::_emitter_type;
        using persist_function_type = typename TgtEvent::_persist_function_type;
        persist_function_type ret = invoker<accept<TgtEvent>(), src_func_type, emitter_type, event_type>::invoke(func);
        return ret;
    }
};
template <typename C, typename R, typename... ARGS>
struct TgtEvtFnTrait<R (*)(C *, ARGS...)> {
    using param0_type = C;
    using src_func_type = R (*)(C *, ARGS...);
    constexpr static bool IS_MEMBER_FUNC = false;
    template <typename TgtEvent>
    static constexpr bool accept() {
        using event_type = typename TgtEvent::EventType;
        return sizeof...(ARGS) == 0 && std::is_same<param0_type, event_type>::value;
    }

    template <bool COND, typename Func, typename EmitterType, typename EventType>
    struct invoker {
        static auto invoke(Func &&func) {
            return [&func](EmitterType * /*self*/, EventType *event) {
                func(event);
            };
        }
    };
    template <typename Func, typename EmitterType, typename EventType>
    struct invoker<false, Func, EmitterType, EventType> {
        static auto invoke(Func &&func) {
            static_assert(std::is_same<EmitterType, param0_type>::value, "mismatch emitter type");
            return [func](EmitterType *self, EventType *event) {
                return apply([self, func](auto &&...args) { func(self, args...); }, event->args);
            };
        }
    };
    template <typename TgtEvent>
    static auto wrap(src_func_type func) {
        using EventType = typename TgtEvent::EventType;
        using persist_function_type = typename TgtEvent::_persist_function_type;
        using emitter_type = typename TgtEvent::_emitter_type;
        persist_function_type ret = invoker<accept<TgtEvent>(), src_func_type, emitter_type, EventType>::invoke(func);
        return ret;
    }
};
template <typename C, typename R, typename... ARGS>
struct TgtEvtFnTrait<R (*)(const C *, ARGS...)> {
    using src_func_type = R (*)(const C *, ARGS...);
    using param0_type = C;
    constexpr static bool IS_MEMBER_FUNC = false;
    template <typename TgtEvent>
    static constexpr bool accept() {
        using event_type = typename TgtEvent::EventType;
        return sizeof...(ARGS) == 0 && std::is_same<param0_type, event_type>::value;
    }

    template <bool COND, typename Func, typename EmitterType, typename EventType>
    struct invoker {
        static auto invoke(Func &&func) {
            return [&func](EmitterType * /*self*/, EventType *event) {
                func(event);
            };
        }
    };
    template <typename Func, typename EmitterType, typename EventType>
    struct invoker<false, Func, EmitterType, EventType> {
        static auto invoke(Func &&func) {
            return [func](EmitterType *self, EventType *event) {
                return applyx([self, func](auto &&...args) { func(self, args...); }, event->args);
            };
        }
    };
    template <typename TgtEvent>
    static auto wrap(src_func_type func) {
        using event_type = typename TgtEvent::EventType;
        using emitter_type = typename TgtEvent::_emitter_type;
        using persist_function_type = typename TgtEvent::_persist_function_type;
        persist_function_type ret = invoker<accept<TgtEvent>(), src_func_type, emitter_type, event_type>::invoke(func);
        return ret;
    }
};
template <typename C, typename R, typename... ARGS>
struct TgtEvtFnTrait<std::function<R(const C *, ARGS...)>> {
    using src_func_type = std::function<R(const C *, ARGS...)>;
    using param0_type = C;
    constexpr static bool IS_MEMBER_FUNC = false;
    template <typename TgtEvent>
    static constexpr bool accept() {
        using event_type = typename TgtEvent::EventType;
        return sizeof...(ARGS) == 0 && std::is_same<param0_type, event_type>::value;
    }

    template <bool COND, typename Func, typename EmitterType, typename EventType>
    struct invoker {
        static auto invoke(Func &&func) {
            return [&func](EmitterType * /*self*/, EventType *event) {
                func(event);
            };
        }
    };
    template <typename Func, typename EmitterType, typename EventType>
    struct invoker<false, Func, EmitterType, EventType> {
        static auto invoke(Func &&func) {
            return [func](EmitterType *self, EventType *event) {
                return applyx([self, func](auto &&...args) { func(self, args...); }, event->args);
            };
        }
    };
    template <typename TgtEvent>
    static auto wrap(src_func_type func) {
        using event_type = typename TgtEvent::EventType;
        using emitter_type = typename TgtEvent::_emitter_type;
        using persist_function_type = typename TgtEvent::_persist_function_type;
        persist_function_type ret = invoker<accept<TgtEvent>(), src_func_type, emitter_type, event_type>::invoke(func);
        return ret;
    }
};
template <typename C, typename R, typename... ARGS>
struct TgtEvtFnTrait<std::function<R(C *, ARGS...)>> {
    using param0_type = C;
    using src_func_type = std::function<R(C *, ARGS...)>;
    constexpr static bool IS_MEMBER_FUNC = false;
    template <typename TgtEvent>
    static constexpr bool accept() {
        using event_type = typename TgtEvent::EventType;
        return sizeof...(ARGS) == 0 && std::is_same<param0_type, event_type>::value;
    }

    template <bool COND, typename Func, typename EmitterType, typename EventType>
    struct invoker {
        static auto invoke(Func &&func) {
            return [&func](EmitterType * /*self*/, EventType *event) {
                func(event);
            };
        }
    };
    template <typename Func, typename EmitterType, typename EventType>
    struct invoker<false, Func, EmitterType, EventType> {
        static auto invoke(Func &&func) {
            return [func](EmitterType *self, EventType *event) {
                return applyx([self, func](auto &&...args) { func(self, args...); }, event->args);
            };
        }
    };

    template <typename TgtEvent>
    static auto wrap(src_func_type &&func) {
        using event_type = typename TgtEvent::EventType;
        using emitter_type = typename TgtEvent::_emitter_type;
        using persist_function_type = typename TgtEvent::_persist_function_type;
        persist_function_type ret = invoker<accept<TgtEvent>(), src_func_type, emitter_type, event_type>::invoke(std::forward<src_func_type>(func));
        return ret;
    }
};
template <typename C, typename R, typename... ARGS>
struct TgtEvtFnTrait<R (C::*)(ARGS...)> {
    using src_func_type = R (C::*)(ARGS...);
    using context_type = C;
    using param0_type = typename intl::HeadType<ARGS...>::head;
    constexpr static bool IS_MEMBER_FUNC = true;
    template <typename TgtEvent>
    static constexpr bool accept() {
        using event_type = typename TgtEvent::EventType;
        return sizeof...(ARGS) == 1 && std::is_same<param0_type, event_type>::value;
    }

    template <bool COND, typename Func, typename EmitterType, typename EventType>
    struct invoker {
        static auto invoke(Func &&func) {
            return [&func](EmitterType *self, EventType *event) {
                (self->*func)(event);
            };
        }
    };
    template <typename Func, typename EmitterType, typename EventType>
    struct invoker<false, Func, EmitterType, EventType> {
        static auto invoke(Func &&func) {
            return [func](EmitterType *self, EventType *event) {
                return applyx([&self, func](auto &&...args) { (self->*func)(args...); }, event->args);
            };
        }
    };
    template <typename TgtEvent>
    static auto wrap(src_func_type func) {
        using event_type = typename TgtEvent::EventType;
        using emitter_type = typename TgtEvent::_emitter_type;
        using persist_function_type = typename TgtEvent::_persist_function_type;
        static_assert(std::is_same<emitter_type, context_type>::value, "mismatch emitter type");
        persist_function_type ret = invoker<accept<TgtEvent>(), src_func_type, emitter_type, event_type>::invoke(func);
        return ret;
    }

    template <bool COND, typename Func, typename ContextType, typename EmitterType, typename EventType>
    struct invoker2 {
        static auto invoke(Func &&func, ContextType *ctx) {
            return [&func, ctx](EmitterType * /*self*/, EventType *event) {
                (ctx->*func)(event);
            };
        }
    };
    template <typename Func, typename ContextType, typename EmitterType, typename EventType>
    struct invoker2<false, Func, ContextType, EmitterType, EventType> {
        static auto invoke(Func &&func, ContextType *ctx) {
            return [func, ctx](EmitterType * /*self*/, EventType *event) {
                return applyx([ctx, func](auto... args) { (ctx->*func)(args...); }, event->args);
            };
        }
    };
    template <typename TgtEvent>
    static auto wrapWithContext(src_func_type func, context_type *ctx) {
        using emitter_type = typename TgtEvent::_emitter_type;
        using event_type = typename TgtEvent::EventType;
        using persist_function_type = typename TgtEvent::_persist_function_type;
        persist_function_type ret = invoker2<accept<TgtEvent>(), src_func_type, context_type, emitter_type, event_type>::invoke(func, ctx);
        return ret;
    }
};
template <typename C, typename R, typename... ARGS>
struct TgtEvtFnTrait<R (C::*)(ARGS...) const> {
    using src_func_type = R (C::*)(ARGS...) const;
    using context_type = C;
    using param0_type = typename intl::HeadType<ARGS...>::head;
    constexpr static bool IS_MEMBER_FUNC = true;

    template <typename TgtEvent>
    static constexpr bool accept() {
        using event_type = typename TgtEvent::EventType;
        return sizeof...(ARGS) == 1 && std::is_same<param0_type, event_type *>::value;
    }
    template <bool COND, typename Func, typename ContextType, typename EventType>
    struct invoker2 {
        static auto invoke(Func &&func) {
            return [&func](context_type *ctx, EventType *event) {
                (ctx->*func)(event);
            };
        }
    };
    template <typename Func, typename ContextType, typename EventType>
    struct invoker2<false, Func, ContextType, EventType> {
        static auto invoke(Func &&func) {
            return [func](context_type *self, EventType *event) {
                return applyx([self, func](auto &&...args) { (self->*func)(args...); }, event->args);
            };
        }
    };
    template <typename TgtEvent>
    static auto wrap(src_func_type func) {
        using event_type = typename TgtEvent::EventType;
        using persist_function_type = typename TgtEvent::_persist_function_type;
        using emitter_type = typename TgtEvent::_emitter_type;
        static_assert(std::is_same<emitter_type, context_type>::value, "mismatch emitter type");
        persist_function_type ret = invoker2<accept<TgtEvent>(), src_func_type, context_type, event_type>::invoke(func);
        return ret;
    }

    template <typename TgtEvent>
    static auto wrapWithContext(src_func_type func, context_type *ctx) {
        using emitter_type = typename TgtEvent::_emitter_type;
        using event_type = typename TgtEvent::EventType;
        using persist_function_type = typename TgtEvent::_persist_function_type;
        persist_function_type ret = [func, ctx](emitter_type * /*self*/, event_type *event) {
            return apply([ctx, func](auto &&...args) { (ctx->*func)(args...); }, event->args);
        };
        return ret;
    }
};

template <typename T>
constexpr T addAll(T first) {
    return first;
}
template <typename T, typename... Others>
constexpr T addAll(T first, Others... others) {
    return first + addAll(others...);
}

template <typename... Parents>
constexpr int TotalEvents = addAll(Parents::getEventCount()...); // NOLINT

} // namespace intl
} // namespace event
} // namespace cc
