cmake_minimum_required(VERSION 3.8)

project(ccmacros CXX)

enable_language(ASM C)

add_library(ccmacros INTERFACE)
target_include_directories(ccmacros INTERFACE
    ${CMAKE_CURRENT_LIST_DIR}/include
)
set_target_properties(ccmacros PROPERTIES PUBLIC_HEADER "include/base/Macros.h")
INSTALL(TARGETS ccmacros 
        PUBLIC_HEADER DESTINATION include/base
)