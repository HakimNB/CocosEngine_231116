// generated code

#define DECLARE_BUS_EVENT0(BusEventClass, EventBusClass)                                        \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void> { \
        using bus_type = EventBusName_(EventBusClass);                                          \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass>;                    \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;         \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                             \
        constexpr static size_t TypeID() {                                                      \
            return cc::event::intl::hash(#BusEventClass);                                       \
        }                                                                                       \
        static inline void broadcast() {                                                        \
            cc::event::broadcast<BusEventClass>();                                              \
        }                                                                                       \
    };

#define DECLARE_BUS_EVENT1(BusEventClass, EventBusClass, ArgType0)                                        \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0> { \
        using bus_type = EventBusName_(EventBusClass);                                                    \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0>;                    \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                   \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                       \
        constexpr static size_t TypeID() {                                                                \
            return cc::event::intl::hash(#BusEventClass);                                                 \
        }                                                                                                 \
        static inline void broadcast(ArgType0 arg0) {                                                     \
            cc::event::broadcast<BusEventClass>(arg0);                                                    \
        }                                                                                                 \
    };

#define DECLARE_BUS_EVENT2(BusEventClass, EventBusClass, ArgType0, ArgType1)                                        \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1> { \
        using bus_type = EventBusName_(EventBusClass);                                                              \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1>;                    \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                             \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                 \
        constexpr static size_t TypeID() {                                                                          \
            return cc::event::intl::hash(#BusEventClass);                                                           \
        }                                                                                                           \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1) {                                                \
            cc::event::broadcast<BusEventClass>(arg0, arg1);                                                        \
        }                                                                                                           \
    };

#define DECLARE_BUS_EVENT3(BusEventClass, EventBusClass, ArgType0, ArgType1, ArgType2)                                        \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1, ArgType2> { \
        using bus_type = EventBusName_(EventBusClass);                                                                        \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1, ArgType2>;                    \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                                       \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                           \
        constexpr static size_t TypeID() {                                                                                    \
            return cc::event::intl::hash(#BusEventClass);                                                                     \
        }                                                                                                                     \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1, ArgType2 arg2) {                                           \
            cc::event::broadcast<BusEventClass>(arg0, arg1, arg2);                                                            \
        }                                                                                                                     \
    };

#define DECLARE_BUS_EVENT4(BusEventClass, EventBusClass, ArgType0, ArgType1, ArgType2, ArgType3)                                        \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1, ArgType2, ArgType3> { \
        using bus_type = EventBusName_(EventBusClass);                                                                                  \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1, ArgType2, ArgType3>;                    \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                                                 \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                                     \
        constexpr static size_t TypeID() {                                                                                              \
            return cc::event::intl::hash(#BusEventClass);                                                                               \
        }                                                                                                                               \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1, ArgType2 arg2, ArgType3 arg3) {                                      \
            cc::event::broadcast<BusEventClass>(arg0, arg1, arg2, arg3);                                                                \
        }                                                                                                                               \
    };

#define DECLARE_BUS_EVENT5(BusEventClass, EventBusClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4)                                        \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4> { \
        using bus_type = EventBusName_(EventBusClass);                                                                                            \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4>;                    \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                                                           \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                                               \
        constexpr static size_t TypeID() {                                                                                                        \
            return cc::event::intl::hash(#BusEventClass);                                                                                         \
        }                                                                                                                                         \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1, ArgType2 arg2, ArgType3 arg3, ArgType4 arg4) {                                 \
            cc::event::broadcast<BusEventClass>(arg0, arg1, arg2, arg3, arg4);                                                                    \
        }                                                                                                                                         \
    };

#define DECLARE_BUS_EVENT6(BusEventClass, EventBusClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5)                                        \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5> { \
        using bus_type = EventBusName_(EventBusClass);                                                                                                      \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5>;                    \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                                                                     \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                                                         \
        constexpr static size_t TypeID() {                                                                                                                  \
            return cc::event::intl::hash(#BusEventClass);                                                                                                   \
        }                                                                                                                                                   \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1, ArgType2 arg2, ArgType3 arg3, ArgType4 arg4, ArgType5 arg5) {                            \
            cc::event::broadcast<BusEventClass>(arg0, arg1, arg2, arg3, arg4, arg5);                                                                        \
        }                                                                                                                                                   \
    };

#define DECLARE_BUS_EVENT7(BusEventClass, EventBusClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6)                                        \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6> { \
        using bus_type = EventBusName_(EventBusClass);                                                                                                                \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6>;                    \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                                                                               \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                                                                   \
        constexpr static size_t TypeID() {                                                                                                                            \
            return cc::event::intl::hash(#BusEventClass);                                                                                                             \
        }                                                                                                                                                             \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1, ArgType2 arg2, ArgType3 arg3, ArgType4 arg4, ArgType5 arg5, ArgType6 arg6) {                       \
            cc::event::broadcast<BusEventClass>(arg0, arg1, arg2, arg3, arg4, arg5, arg6);                                                                            \
        }                                                                                                                                                             \
    };

#define DECLARE_BUS_EVENT8(BusEventClass, EventBusClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7)                                        \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7> { \
        using bus_type = EventBusName_(EventBusClass);                                                                                                                          \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7>;                    \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                                                                                         \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                                                                             \
        constexpr static size_t TypeID() {                                                                                                                                      \
            return cc::event::intl::hash(#BusEventClass);                                                                                                                       \
        }                                                                                                                                                                       \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1, ArgType2 arg2, ArgType3 arg3, ArgType4 arg4, ArgType5 arg5, ArgType6 arg6, ArgType7 arg7) {                  \
            cc::event::broadcast<BusEventClass>(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7);                                                                                \
        }                                                                                                                                                                       \
    };

#define DECLARE_BUS_EVENT9(BusEventClass, EventBusClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8)                                        \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8> { \
        using bus_type = EventBusName_(EventBusClass);                                                                                                                                    \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8>;                    \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                                                                                                   \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                                                                                       \
        constexpr static size_t TypeID() {                                                                                                                                                \
            return cc::event::intl::hash(#BusEventClass);                                                                                                                                 \
        }                                                                                                                                                                                 \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1, ArgType2 arg2, ArgType3 arg3, ArgType4 arg4, ArgType5 arg5, ArgType6 arg6, ArgType7 arg7, ArgType8 arg8) {             \
            cc::event::broadcast<BusEventClass>(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);                                                                                    \
        }                                                                                                                                                                                 \
    };

#define DECLARE_BUS_EVENT10(BusEventClass, EventBusClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9)                                       \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9> { \
        using bus_type = EventBusName_(EventBusClass);                                                                                                                                              \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9>;                    \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                                                                                                             \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                                                                                                 \
        constexpr static size_t TypeID() {                                                                                                                                                          \
            return cc::event::intl::hash(#BusEventClass);                                                                                                                                           \
        }                                                                                                                                                                                           \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1, ArgType2 arg2, ArgType3 arg3, ArgType4 arg4, ArgType5 arg5, ArgType6 arg6, ArgType7 arg7, ArgType8 arg8, ArgType9 arg9) {        \
            cc::event::broadcast<BusEventClass>(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);                                                                                        \
        }                                                                                                                                                                                           \
    };

#define DECLARE_BUS_EVENT11(BusEventClass, EventBusClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10)                                       \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10> { \
        using bus_type = EventBusName_(EventBusClass);                                                                                                                                                         \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10>;                    \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                                                                                                                        \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                                                                                                            \
        constexpr static size_t TypeID() {                                                                                                                                                                     \
            return cc::event::intl::hash(#BusEventClass);                                                                                                                                                      \
        }                                                                                                                                                                                                      \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1, ArgType2 arg2, ArgType3 arg3, ArgType4 arg4, ArgType5 arg5, ArgType6 arg6, ArgType7 arg7, ArgType8 arg8, ArgType9 arg9, ArgType10 arg10) {  \
            cc::event::broadcast<BusEventClass>(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10);                                                                                            \
        }                                                                                                                                                                                                      \
    };

#define DECLARE_BUS_EVENT12(BusEventClass, EventBusClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11)                                            \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11> {      \
        using bus_type = EventBusName_(EventBusClass);                                                                                                                                                                         \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11>;                         \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                                                                                                                                        \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                                                                                                                            \
        constexpr static size_t TypeID() {                                                                                                                                                                                     \
            return cc::event::intl::hash(#BusEventClass);                                                                                                                                                                      \
        }                                                                                                                                                                                                                      \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1, ArgType2 arg2, ArgType3 arg3, ArgType4 arg4, ArgType5 arg5, ArgType6 arg6, ArgType7 arg7, ArgType8 arg8, ArgType9 arg9, ArgType10 arg10, ArgType11 arg11) { \
            cc::event::broadcast<BusEventClass>(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11);                                                                                                     \
        }                                                                                                                                                                                                                      \
    };

#define DECLARE_BUS_EVENT13(BusEventClass, EventBusClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12)                                                  \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12> {            \
        using bus_type = EventBusName_(EventBusClass);                                                                                                                                                                                          \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12>;                               \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                                                                                                                                                         \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                                                                                                                                             \
        constexpr static size_t TypeID() {                                                                                                                                                                                                      \
            return cc::event::intl::hash(#BusEventClass);                                                                                                                                                                                       \
        }                                                                                                                                                                                                                                       \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1, ArgType2 arg2, ArgType3 arg3, ArgType4 arg4, ArgType5 arg5, ArgType6 arg6, ArgType7 arg7, ArgType8 arg8, ArgType9 arg9, ArgType10 arg10, ArgType11 arg11, ArgType12 arg12) { \
            cc::event::broadcast<BusEventClass>(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12);                                                                                                               \
        }                                                                                                                                                                                                                                       \
    };

#define DECLARE_BUS_EVENT14(BusEventClass, EventBusClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13)                                                        \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13> {                  \
        using bus_type = EventBusName_(EventBusClass);                                                                                                                                                                                                           \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13>;                                     \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                                                                                                                                                                          \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                                                                                                                                                              \
        constexpr static size_t TypeID() {                                                                                                                                                                                                                       \
            return cc::event::intl::hash(#BusEventClass);                                                                                                                                                                                                        \
        }                                                                                                                                                                                                                                                        \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1, ArgType2 arg2, ArgType3 arg3, ArgType4 arg4, ArgType5 arg5, ArgType6 arg6, ArgType7 arg7, ArgType8 arg8, ArgType9 arg9, ArgType10 arg10, ArgType11 arg11, ArgType12 arg12, ArgType13 arg13) { \
            cc::event::broadcast<BusEventClass>(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13);                                                                                                                         \
        }                                                                                                                                                                                                                                                        \
    };

#define DECLARE_BUS_EVENT15(BusEventClass, EventBusClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13, ArgType14)                                                              \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13, ArgType14> {                        \
        using bus_type = EventBusName_(EventBusClass);                                                                                                                                                                                                                            \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13, ArgType14>;                                           \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                                                                                                                                                                                           \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                                                                                                                                                                               \
        constexpr static size_t TypeID() {                                                                                                                                                                                                                                        \
            return cc::event::intl::hash(#BusEventClass);                                                                                                                                                                                                                         \
        }                                                                                                                                                                                                                                                                         \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1, ArgType2 arg2, ArgType3 arg3, ArgType4 arg4, ArgType5 arg5, ArgType6 arg6, ArgType7 arg7, ArgType8 arg8, ArgType9 arg9, ArgType10 arg10, ArgType11 arg11, ArgType12 arg12, ArgType13 arg13, ArgType14 arg14) { \
            cc::event::broadcast<BusEventClass>(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14);                                                                                                                                   \
        }                                                                                                                                                                                                                                                                         \
    };

#define DECLARE_BUS_EVENT16(BusEventClass, EventBusClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13, ArgType14, ArgType15)                                                                    \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13, ArgType14, ArgType15> {                              \
        using bus_type = EventBusName_(EventBusClass);                                                                                                                                                                                                                                             \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13, ArgType14, ArgType15>;                                                 \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                                                                                                                                                                                                            \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                                                                                                                                                                                                \
        constexpr static size_t TypeID() {                                                                                                                                                                                                                                                         \
            return cc::event::intl::hash(#BusEventClass);                                                                                                                                                                                                                                          \
        }                                                                                                                                                                                                                                                                                          \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1, ArgType2 arg2, ArgType3 arg3, ArgType4 arg4, ArgType5 arg5, ArgType6 arg6, ArgType7 arg7, ArgType8 arg8, ArgType9 arg9, ArgType10 arg10, ArgType11 arg11, ArgType12 arg12, ArgType13 arg13, ArgType14 arg14, ArgType15 arg15) { \
            cc::event::broadcast<BusEventClass>(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15);                                                                                                                                             \
        }                                                                                                                                                                                                                                                                                          \
    };

#define DECLARE_BUS_EVENT17(BusEventClass, EventBusClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13, ArgType14, ArgType15, ArgType16)                                                                          \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13, ArgType14, ArgType15, ArgType16> {                                    \
        using bus_type = EventBusName_(EventBusClass);                                                                                                                                                                                                                                                              \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13, ArgType14, ArgType15, ArgType16>;                                                       \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                                                                                                                                                                                                                             \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                                                                                                                                                                                                                 \
        constexpr static size_t TypeID() {                                                                                                                                                                                                                                                                          \
            return cc::event::intl::hash(#BusEventClass);                                                                                                                                                                                                                                                           \
        }                                                                                                                                                                                                                                                                                                           \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1, ArgType2 arg2, ArgType3 arg3, ArgType4 arg4, ArgType5 arg5, ArgType6 arg6, ArgType7 arg7, ArgType8 arg8, ArgType9 arg9, ArgType10 arg10, ArgType11 arg11, ArgType12 arg12, ArgType13 arg13, ArgType14 arg14, ArgType15 arg15, ArgType16 arg16) { \
            cc::event::broadcast<BusEventClass>(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15, arg16);                                                                                                                                                       \
        }                                                                                                                                                                                                                                                                                                           \
    };

#define DECLARE_BUS_EVENT18(BusEventClass, EventBusClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13, ArgType14, ArgType15, ArgType16, ArgType17)                                                                                \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13, ArgType14, ArgType15, ArgType16, ArgType17> {                                          \
        using bus_type = EventBusName_(EventBusClass);                                                                                                                                                                                                                                                                               \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13, ArgType14, ArgType15, ArgType16, ArgType17>;                                                             \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                                                                                                                                                                                                                                              \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                                                                                                                                                                                                                                  \
        constexpr static size_t TypeID() {                                                                                                                                                                                                                                                                                           \
            return cc::event::intl::hash(#BusEventClass);                                                                                                                                                                                                                                                                            \
        }                                                                                                                                                                                                                                                                                                                            \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1, ArgType2 arg2, ArgType3 arg3, ArgType4 arg4, ArgType5 arg5, ArgType6 arg6, ArgType7 arg7, ArgType8 arg8, ArgType9 arg9, ArgType10 arg10, ArgType11 arg11, ArgType12 arg12, ArgType13 arg13, ArgType14 arg14, ArgType15 arg15, ArgType16 arg16, ArgType17 arg17) { \
            cc::event::broadcast<BusEventClass>(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15, arg16, arg17);                                                                                                                                                                 \
        }                                                                                                                                                                                                                                                                                                                            \
    };

#define DECLARE_BUS_EVENT19(BusEventClass, EventBusClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13, ArgType14, ArgType15, ArgType16, ArgType17, ArgType18)                                                                                      \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13, ArgType14, ArgType15, ArgType16, ArgType17, ArgType18> {                                                \
        using bus_type = EventBusName_(EventBusClass);                                                                                                                                                                                                                                                                                                \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13, ArgType14, ArgType15, ArgType16, ArgType17, ArgType18>;                                                                   \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                                                                                                                                                                                                                                                               \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                                                                                                                                                                                                                                                   \
        constexpr static size_t TypeID() {                                                                                                                                                                                                                                                                                                            \
            return cc::event::intl::hash(#BusEventClass);                                                                                                                                                                                                                                                                                             \
        }                                                                                                                                                                                                                                                                                                                                             \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1, ArgType2 arg2, ArgType3 arg3, ArgType4 arg4, ArgType5 arg5, ArgType6 arg6, ArgType7 arg7, ArgType8 arg8, ArgType9 arg9, ArgType10 arg10, ArgType11 arg11, ArgType12 arg12, ArgType13 arg13, ArgType14 arg14, ArgType15 arg15, ArgType16 arg16, ArgType17 arg17, ArgType18 arg18) { \
            cc::event::broadcast<BusEventClass>(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15, arg16, arg17, arg18);                                                                                                                                                                           \
        }                                                                                                                                                                                                                                                                                                                                             \
    };

#define DECLARE_BUS_EVENT20(BusEventClass, EventBusClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13, ArgType14, ArgType15, ArgType16, ArgType17, ArgType18, ArgType19)                                                                                            \
    struct BusEventClass final : cc::event::BusEventTrait<EventBusName_(EventBusClass), void, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13, ArgType14, ArgType15, ArgType16, ArgType17, ArgType18, ArgType19> {                                                      \
        using bus_type = EventBusName_(EventBusClass);                                                                                                                                                                                                                                                                                                                 \
        using listener_type = cc::event::BusEventBroadcaster<BusEventClass, ArgType0, ArgType1, ArgType2, ArgType3, ArgType4, ArgType5, ArgType6, ArgType7, ArgType8, ArgType9, ArgType10, ArgType11, ArgType12, ArgType13, ArgType14, ArgType15, ArgType16, ArgType17, ArgType18, ArgType19>;                                                                         \
        constexpr static const char *BUS_NAME = EventBusName_(EventBusClass)::BUS_NAME;                                                                                                                                                                                                                                                                                \
        constexpr static const char *HANDLE_CLASS = #BusEventClass;                                                                                                                                                                                                                                                                                                    \
        constexpr static size_t TypeID() {                                                                                                                                                                                                                                                                                                                             \
            return cc::event::intl::hash(#BusEventClass);                                                                                                                                                                                                                                                                                                              \
        }                                                                                                                                                                                                                                                                                                                                                              \
        static inline void broadcast(ArgType0 arg0, ArgType1 arg1, ArgType2 arg2, ArgType3 arg3, ArgType4 arg4, ArgType5 arg5, ArgType6 arg6, ArgType7 arg7, ArgType8 arg8, ArgType9 arg9, ArgType10 arg10, ArgType11 arg11, ArgType12 arg12, ArgType13 arg13, ArgType14 arg14, ArgType15 arg15, ArgType16 arg16, ArgType17 arg17, ArgType18 arg18, ArgType19 arg19) { \
            cc::event::broadcast<BusEventClass>(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15, arg16, arg17, arg18, arg19);                                                                                                                                                                                     \
        }                                                                                                                                                                                                                                                                                                                                                              \
    };
