
set(CC_LOADED_PLUGINS)

function(cc_plugin_entry)
    set(entry_content)
    list(LENGTH CC_LOADED_PLUGINS PLG_CNT)
    if(PLG_CNT GREATER 0)
        message(STATUS "Generating plugin_registry code, total ${PLG_CNT} plugins")
        string(APPEND entry_content "// automatically generated code, do not manually modify\n\n")
        string(APPEND entry_content "// plugin entry list begin, size ${PLG_CNT}\n")
        foreach(pname ${CC_LOADED_PLUGINS})
            string(APPEND entry_content "extern \"C\" void cc_load_plugin_${pname}()\; // NOLINT\n") 
            # message(FATAL_ERROR "plugin ${pname}")
        endforeach()
        string(APPEND entry_content "// plugin entry list end\n")
        string(APPEND entry_content "\n\n//NOLINTNEXTLINE\n")
        string(APPEND entry_content "extern \"C\" void cc_load_all_plugins() {\n") 
        foreach(pname ${CC_LOADED_PLUGINS})
            string(APPEND entry_content "    cc_load_plugin_${pname}()\;\n")
        endforeach()
        string(APPEND entry_content "}\n")
        set(GEN_PATH ${CMAKE_CURRENT_BINARY_DIR}/plugin_registry_autogen.cpp)
        set(GEN_PATH_TMP ${GEN_PATH}.tmp)
        file(WRITE ${GEN_PATH_TMP} ${entry_content})
        execute_process(COMMAND ${CMAKE_COMMAND} -E copy_if_different ${GEN_PATH_TMP} ${GEN_PATH})
        file(REMOVE ${GEN_PATH_TMP})
        add_library(plugin_registry STATIC ${GEN_PATH})
        target_link_libraries(plugin_registry ${CC_LOADED_PLUGINS})
        set_target_properties(plugin_registry PROPERTIES
            INTERFACE_COMPILE_DEFINITIONS CC_USE_PLUGINS=1 
        )
    else()
        message(STATUS "No plugins are loaded!")
    endif()

endfunction()


function(cc_gen_plugin_cmake_hook)
    set(project_root_dir ${CC_PROJECT_DIR}/../../..)
    set(load_plugin_cmake ${CC_PROJECT_DIR}/Pre-AutoLoadPlulgins.cmake)
    list(APPEND cc_plugin_search_path 
        # ${project_root_dir}/native/plugins 
        ${project_root_dir}/native-usr/plugins #TODO: remove later 
        ${project_root_dir}/extensions
        )
    set(plugin_args_info ${CMAKE_CURRENT_BINARY_DIR}/plugin_dirs.txt)
    file(WRITE ${plugin_args_info} "# directories for searching native plugins\n")
    foreach(dir ${cc_plugin_search_path})
        get_filename_component(abs_dir ${dir} ABSOLUTE)
        file(APPEND ${plugin_args_info} "${abs_dir}\n")
    endforeach()
    execute_process(COMMAND ${NODE_EXECUTABLE} ${COCOS_X_PATH}/cmake/scripts/plugins_parser.js
        ${plugin_args_info}
        ${load_plugin_cmake}
        ${PLATFORM_FOLDER}
        WORKING_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}
        )
endfunction()

macro(cc_include_resources ARG_RES_ROOT ASSET_FILES)
    set(all_files_local)
    foreach(res ${ARG_RES_ROOT})
        set(res_list)
        if(NOT EXISTS ${res})
            continue()
        endif()

        if(IS_DIRECTORY ${res})
            file(GLOB_RECURSE res_list "${res}/*")
        else()
            set(res_list ${res})
        endif()
        foreach(res ${res_list})
            get_filename_component(res_abs ${res} ABSOLUTE)
            file(RELATIVE_PATH res_rel ${ARG_RES_ROOT} ${res_abs})
            get_filename_component(res_dir ${res_rel} PATH)
            set_source_files_properties(${res_abs} PROPERTIES
                                        MACOSX_PACKAGE_LOCATION "Resources/${res_dir}/"
                                        HEADER_FILE_ONLY 1
                                        )
            list(APPEND all_files_local ${res_abs})
        endforeach()
    endforeach()
    set(${ASSET_FILES} ${all_files_local})
endmacro()

macro(cc_load_hooks prefix_name)
    file(GLOB hook_files ${CC_PROJECT_DIR}/${prefix_name}*.cmake)
    message(STATUS "Searching hook files ${prefix_name}*.cmake in ${CC_PROJECT_DIR}")
    foreach(hook ${hook_files}) 
        get_filename_component(hook_abs ${hook} ABSOLUTE)
        get_filename_component(hook_name ${hook} NAME)
        message(STATUS "::Loading ${hook_name}")
        include(${hook_abs})
    endforeach()
endmacro()


macro(cc_common_after_target target_name)

    if(TARGET plugin_registry)
        target_link_libraries(${target_name} plugin_registry)
    endif()

    target_compile_definitions(${target_name} PRIVATE
        GAME_NAME="${APP_NAME}"
    )
    if(XXTEAKEY)
        target_compile_definitions(${target_name} PRIVATE
            SCRIPT_XXTEAKEY="${XXTEAKEY}"
        )
    endif()
    cc_load_hooks("Post-")
endmacro()

macro(cc_common_before_target target_name)
    set(CC_TARGET_NAME ${target_name})
    if(NOT CC_TARGET_NAME)
        message(FATAL_ERROR "CC_TARGET_NAME is not set!")
    endif()
    cc_gen_plugin_cmake_hook()
    cc_load_hooks("Pre-")
    cc_plugin_entry()
endmacro()


function(cc_load_plugin)
  set(options)
  set(oneValueArgs TARGET )
  set(multiValueArgs PATHS DEPENDS HINTS)
  cmake_parse_arguments(load_plugin "${options}" "${oneValueArgs}" "${multiValueArgs}" ${ARGN} )

  set(plugin_name ${load_plugin_TARGET})
  set(searchPath)
  foreach(p ${load_plugin_PATHS})
    if(NOT EXISTS ${p})
        message(FATAL_ERROR "Search path ${p} does not exists!")
    endif()
    get_filename_component(abs_dir ${p} ABSOLUTE)
    if(ANDROID)
      list(APPEND searchPath ${abs_dir}/${ANDROID_ABI})
      list(APPEND searchPath ${abs_dir})
    else()
      list(APPEND searchPath ${abs_dir})
    endif()
  endforeach()

  message(STATUS "Search path ${searchPath}")

  foreach(n ${load_plugin_DEPENDS})
    string(REPLACE ":" ";" pkgInfo ${n})
    list(LENGTH pkgInfo pkgLen)
    if(${pkgLen} GREATER 1) 
        list(GET pkgInfo 0 name)
        list(GET pkgInfo 1 version)
        message(STATUS "Searching package ${name} version ${version} ... ")
        find_package(${name} ${version} EXACT #REQUIRED
            NAMES "${name}"
            CONFIG
            PATHS "${searchPath}"
            NO_DEFAULT_PATH
        )
        if(NOT ${name}_FOUND)
            message(WARNING "considered configs ${name}_CONSIDERED_CONFIGS: ${${name}_CONSIDERED_CONFIGS}")
        endif()
    else()
        find_package(${n} # REQUIRED CONFIG
            NAMES "${n}"
            PATHS "${searchPath}"
            NO_DEFAULT_PATH
        )
        if(NOT ${n}_FOUND)
            message(WARNING "considered configs ${n}_CONSIDERED_CONFIGS: ${${n}_CONSIDERED_CONFIGS}")
        endif()
    endif()
    set(CC_LOADED_PLUGINS ${CC_LOADED_PLUGINS} ${n} PARENT_SCOPE)
  endforeach()
  message(STATUS "Search path in ${load_plugin_PATHS}")
  find_package(${plugin_name} #REQUIRED
      CONFIG
      NAMES "${plugin_name}"
      PATHS ${searchPath}
  )
  if(${plugin_name}_FOUND) 
    set(CC_LOADED_PLUGINS ${CC_LOADED_PLUGINS} ${plugin_name} PARENT_SCOPE)
  else()
    message(WARNING "Plugin ${plugin_name} not found!")
  endif()
endfunction()
