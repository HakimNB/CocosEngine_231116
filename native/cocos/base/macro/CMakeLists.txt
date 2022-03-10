cmake_minimum_required(VERSION 3.8)

project(ccmacros CXX)

add_library(ccmacros INTERFACE)
target_include_directories(ccmacros INTERFACE
    ${CMAKE_CURRENT_LIST_DIR}
)
set_target_properties(ccmacros PROPERTIES PUBLIC_HEADER "Macros.h")
