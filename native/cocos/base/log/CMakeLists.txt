cmake_minimum_required(VERSION 3.8)

project(cclogs CXX)

add_library(cclogs 
    Log.cpp
    Log.h
)
target_include_directories(cclogs INTERFACE
    ${CMAKE_CURRENT_LIST_DIR}
)
set_target_properties(cclogs PROPERTIES PUBLIC_HEADER "Log.h")
INSTALL(TARGETS cclogs 
        PUBLIC_HEADER DESTINATION log
)
target_link_libraries(cclogs PUBLIC
    ccmacros
)
if(ANDROID)
    target_link_libraries(cclogs PUBLIC
        log
    )
endif()