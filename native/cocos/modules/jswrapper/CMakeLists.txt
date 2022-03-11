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

if(USE_SE_V8)
    set(private_include_folder v8)
elseif(USE_SE_JSC)
    set(private_include_folder jsc)
elseif(USE_SE_SM)
    set(private_include_folder sm)
endif()


############# module bindings
if(USE_SE_V8)
    list(APPEND bindings_source
        include/jswrapper/v8/Base.h
        include/jswrapper/v8/Class.h
        include/jswrapper/v8/HelperMacros.h
        include/jswrapper/v8/Object.h
        include/jswrapper/v8/ObjectWrap.h
        include/jswrapper/v8/ScriptEngine.h
        include/jswrapper/v8/SeApi.h
        include/jswrapper/v8/Utils.h
        include/jswrapper/v8/MissingSymbols.h
        src/v8/Class.cpp
        src/v8/HelperMacros.cpp
        src/v8/Object.cpp
        src/v8/ObjectWrap.cpp
        src/v8/ScriptEngine.cpp
        src/v8/Utils.cpp
        src/v8/MissingSymbols.cpp
    )
    if(USE_V8_DEBUGGER)
        list(APPEND bindings_source
            v8-debugger/base64.h
            v8-debugger/env.cpp
            v8-debugger/env.h
            v8-debugger/http_parser.cpp
            v8-debugger/http_parser.h
            v8-debugger/inspector_agent.cpp
            v8-debugger/inspector_agent.h
            v8-debugger/inspector_io.cpp
            v8-debugger/inspector_io.h
            v8-debugger/inspector_socket.cpp
            v8-debugger/inspector_socket.h
            v8-debugger/inspector_socket_server.cpp
            v8-debugger/inspector_socket_server.h
            v8-debugger/node.cpp
            v8-debugger/node.h
            v8-debugger/node_debug_options.cpp
            v8-debugger/node_debug_options.h
            v8-debugger/node_mutex.h
            v8-debugger/SHA1.cpp
            v8-debugger/SHA1.h
            v8-debugger/util-inl.h
            v8-debugger/util.cpp
            v8-debugger/util.h
            v8-debugger/v8_inspector_protocol_json.h
        )
    endif()
endif()

if(USE_SE_JSC)
    list(APPEND bindings_source
        include/jswrapper/jsc/Class.h
        include/jswrapper/jsc/EJConvert.h
        include/jswrapper/jsc/HelperMacros.h
        include/jswrapper/jsc/EJConvertTypedArray.h
        include/jswrapper/jsc/Object.h
        include/jswrapper/jsc/PlatformUtils.h
        include/jswrapper/jsc/ScriptEngine.h
        include/jswrapper/jsc/SeApi.h
        include/jswrapper/jsc/Utils.h
        include/jswrapper/jsc/Base.h
        src/jsc/Utils.cpp
        src/jsc/EJConvertTypedArray.m
        src/jsc/EJConvert.m
        src/jsc/Object.mm
        src/jsc/ScriptEngine.mm
        src/jsc/PlatformUtils.mm
        src/jsc/Class.cpp
    )
endif()

list(APPEND bindings_source
    include/jswrapper/config.h
    include/jswrapper/HandleObject.h
    include/jswrapper/MappingUtils.h
    include/jswrapper/Object.h
    include/jswrapper/RefCounter.h
    include/jswrapper/SeApi.h
    include/jswrapper/State.h
    include/jswrapper/Value.h
    src/HandleObject.cpp
    src/MappingUtils.cpp
    src/RefCounter.cpp
    src/config.cpp
    src/State.cpp
    src/Value.cpp
    # NO_WERROR    cocos/bindings/manual/jsb_global_init.cpp
    #              cocos/bindings/manual/jsb_global_init.h
)

add_library(${module_name} ${bindings_source})

target_link_libraries(${module_name} PUBLIC
    ${se_libs_name}
    ccmacros
    cclogs
)

if(ANDROID)
    target_link_libraries(${module_name} PUBLIC 
        log
    )
endif()

target_include_directories(${module_name} PUBLIC
    ${CMAKE_CURRENT_LIST_DIR}/include
    PRIVATE
    ${CMAKE_CURRENT_LIST_DIR}/include/jswrapper
    ${CMAKE_CURRENT_LIST_DIR}/include/jswrapper/${private_include_folder}
)

if(SE_STANDALONE_BUILD)
    target_compile_definitions(${module_name} PRIVATE
        CC_STANDALONE_BUILD=1
    )
endif()

INSTALL(TARGETS ${module_name})
INSTALL (
    DIRECTORY ${CMAKE_CURRENT_LIST_DIR}/include/
    DESTINATION "include"
    FILES_MATCHING PATTERN "*.h*")