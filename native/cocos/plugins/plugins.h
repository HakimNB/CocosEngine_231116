#pragma once

extern "C" void cc_load_all_plugins(); //NOLINT

#if CC_PLUGIN_STATIC
    #define CC_PLUGIN_ENTRY(name, load_func)      \
        extern "C" void cc_load_plugin_##name() { \
            load_func();                          \
        }
#else
    #define CC_PLUGIN_ENTRY(name, load_func) \
        extern "C" void cc_load_plugin() {   \
            load_func();                     \
        }
#endif