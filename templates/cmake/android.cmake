

macro(cc_android_before_target target_name)
    list(APPEND CC_ALL_SOURCES ${CC_COMMON_SOURCES} ${CC_PROJ_SOURCES})
    cc_common_before_target(${target_name})
endmacro()


macro(cc_android_after_target target_name)
    
    target_link_libraries(${target_name} PRIVATE
        "-Wl,--whole-archive"
        cocos_jni 
        ${ENGINE_NAME}
        ${se_libs_name}
        "-Wl,--no-whole-archive"
    )
    # target_link_libraries(${target_name} PUBLIC
        # "-Wl,--whole-archive" ${se_libs_name} "-Wl,--no-whole-archive"
    # )

#    set_target_properties(${target_name} PROPERTIES LINK_FLAGS " -Wl,--gc-sections")

    target_include_directories(${target_name} PRIVATE
        ${CC_PROJECT_DIR}/../common/Classes
    )
    target_include_directories(${target_name} PUBLIC
        ${COCOS_X_PATH}/cocos
        ${COCOS_X_PATH}
        ${CC_EXTERNAL_INCLUDES}
        ${se_libs_include}
    )
    cc_common_after_target(${target_name})
endmacro()