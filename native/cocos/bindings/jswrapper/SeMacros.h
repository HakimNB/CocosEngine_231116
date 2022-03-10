#pragma once

/** @def CC_DEPRECATED_ATTRIBUTE
* Only certain compilers support __attribute__((deprecated)).
*/
#if defined(__GNUC__) && ((__GNUC__ >= 4) || ((__GNUC__ == 3) && (__GNUC_MINOR__ >= 1)))
    #define CC_DEPRECATED_ATTRIBUTE __attribute__((deprecated))
#elif _MSC_VER >= 1400 //vs 2005 or higher
    #define CC_DEPRECATED_ATTRIBUTE __declspec(deprecated)
#else
    #define CC_DEPRECATED_ATTRIBUTE
#endif

/** @def CC_DEPRECATED(...)
* Macro to mark things deprecated as of a particular version
* can be used with arbitrary parameters which are thrown away.
* e.g. CC_DEPRECATED(4.0) or CC_DEPRECATED(4.0, "not going to need this anymore") etc.
*/
#define CC_DEPRECATED(...) CC_DEPRECATED_ATTRIBUTE
