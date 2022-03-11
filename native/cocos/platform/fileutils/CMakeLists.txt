cmake_minimum_required(VERSION 3.8)

project(ccfileutils CXX)

add_library(ccfileutils 
    FileUtils.h
    FileUtils.cpp
)
target_include_directories(ccfileutils PUBLIC
    ${CMAKE_CURRENT_LIST_DIR}
)
set_target_properties(ccfileutils PROPERTIES PUBLIC_HEADER "FileUtils.h")

target_link_libraries(ccfileutils PUBLIC
    ccmacros
)
if(ANDROID)
    target_link_libraries(ccfileutils PUBLIC
        log
    )
endif()
INSTALL(TARGETS ccfileutils 
        PUBLIC_HEADER DESTINATION log
)