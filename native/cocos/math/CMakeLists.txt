cmake_minimum_required(VERSION 3.8)

project(ccmath CXX)

enable_language(ASM C)

set(module_name "ccmath")

set(math_source
    Geometry.cpp
    Geometry.h
    MathDef.h
    MathDef.cpp
    MathBase.h
    Vertex.cpp
    Vertex.h
    Mat3.cpp
    Mat3.h
    Mat4.cpp
    Mat4.h
    Mat4.inl
    MathUtil.cpp
    MathUtil.h
    MathUtil.inl
    MathUtilNeon.inl
    MathUtilNeon64.inl
    MathUtilSSE.inl
    Quaternion.cpp
    Quaternion.h
    Quaternion.inl
    Vec2.cpp
    Vec2.h
    Vec2.inl
    Vec3.cpp
    Vec3.h
    Vec3.inl
    Vec4.cpp
    Vec4.h
    Vec4.inl
)

add_library(${module_name} ${math_source})


set_property(TARGET ${module_name} 
     PROPERTY CXX_STANDARD 14)

if(ANDROID)
    target_link_libraries(${module_name} PUBLIC 
        android_platform
    )
endif()

target_include_directories(${module_name} PUBLIC
    ${CMAKE_CURRENT_LIST_DIR}
)

target_link_libraries(${module_name} PUBLIC
    ccmarcos
)

if(SE_STANDALONE_BUILD)
    target_compile_definitions(${module_name} PRIVATE
        CC_STANDALONE_BUILD=1
    )
endif()