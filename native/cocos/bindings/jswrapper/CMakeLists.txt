cmake_minimum_required(VERSION 3.8)

project(jswrapper CXX)

if(NOT DEFINED CC_SE_V8)
    set(SE_STANDALONE_BUILD ON)
    set(USE_SE_V8 ON)
    set(USE_V8_DEBUGGER ON)
    set(USE_SE_JSC OFF)
endif()

set(module_name "bindings")

set(bindings_source)

############# module bindings
if(USE_SE_V8)
    list(APPEND bindings_source
        v8/Base.h
        v8/Class.cpp
        v8/Class.h
        v8/HelperMacros.h
        v8/HelperMacros.cpp
        v8/Object.cpp
        v8/Object.h
        v8/ObjectWrap.cpp
        v8/ObjectWrap.h
        v8/ScriptEngine.cpp
        v8/ScriptEngine.h
        v8/SeApi.h
        v8/Utils.cpp
        v8/Utils.h
        v8/MissingSymbols.cpp
        v8/MissingSymbols.h
    )
    if(USE_V8_DEBUGGER)
        list(APPEND bindings_source
            v8/debugger/base64.h
            v8/debugger/env.cpp
            v8/debugger/env.h
            v8/debugger/http_parser.cpp
            v8/debugger/http_parser.h
            v8/debugger/inspector_agent.cpp
            v8/debugger/inspector_agent.h
            v8/debugger/inspector_io.cpp
            v8/debugger/inspector_io.h
            v8/debugger/inspector_socket.cpp
            v8/debugger/inspector_socket.h
            v8/debugger/inspector_socket_server.cpp
            v8/debugger/inspector_socket_server.h
            v8/debugger/node.cpp
            v8/debugger/node.h
            v8/debugger/node_debug_options.cpp
            v8/debugger/node_debug_options.h
            v8/debugger/node_mutex.h
            v8/debugger/SHA1.cpp
            v8/debugger/SHA1.h
            v8/debugger/util-inl.h
            v8/debugger/util.cpp
            v8/debugger/util.h
            v8/debugger/v8_inspector_protocol_json.h
        )
    endif()
endif()

if(USE_SE_JSC)
    list(APPEND bindings_source
        jsc/Class.h
        jsc/EJConvert.h
        jsc/HelperMacros.h
        jsc/Utils.cpp
        jsc/EJConvertTypedArray.h
        jsc/PlatformUtils.h
        jsc/EJConvertTypedArray.m
        jsc/EJConvert.m
        jsc/Object.h
        jsc/Object.mm
        jsc/ScriptEngine.h
        jsc/ScriptEngine.mm
        jsc/PlatformUtils.mm
        jsc/SeApi.h
        jsc/Class.cpp
        jsc/Utils.h
        jsc/Base.h
    )
endif()

list(APPEND bindings_source
    config.cpp
    config.h
    HandleObject.cpp
    HandleObject.h
    MappingUtils.cpp
    MappingUtils.h
    Object.h
    RefCounter.cpp
    RefCounter.h
    SeApi.h
    State.cpp
    State.h
    Value.cpp
    Value.h
    # NO_WERROR    cocos/bindings/manual/jsb_global_init.cpp
    #              cocos/bindings/manual/jsb_global_init.h
)

add_library(${module_name} ${bindings_source})

target_link_libraries(${module_name} PUBLIC
    ${se_libs_name}
)

if(ANDROID)
    target_link_libraries(${module_name} PUBLIC 
        log
    )
endif()

target_include_directories(${module_name} PUBLIC
    ${CMAKE_CURRENT_LIST_DIR}
)

if(SE_STANDALONE_BUILD)
    target_compile_definitions(${module_name} PRIVATE
        CC_STANDALONE_BUILD=1
    )
endif()