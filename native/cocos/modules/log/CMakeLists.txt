cmake_minimum_required(VERSION 3.8)

project(cclogs CXX)

add_library(cclogs 
    include/base/Log.h
    src/Log.cpp
)
target_include_directories(cclogs PUBLIC
    ${CMAKE_CURRENT_LIST_DIR}/include
    PRIVATE
    ${CMAKE_CURRENT_LIST_DIR}/include/base
)
set_target_properties(cclogs PROPERTIES PUBLIC_HEADER "include/base/Log.h")

target_link_libraries(cclogs PUBLIC
    ccmacros
)
if(ANDROID)
    target_link_libraries(cclogs PUBLIC
        log
    )
endif()
INSTALL(TARGETS cclogs 
        PUBLIC_HEADER DESTINATION include/log
)