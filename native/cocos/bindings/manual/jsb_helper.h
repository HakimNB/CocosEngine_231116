/****************************************************************************
 Copyright (c) 2017-2022 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
****************************************************************************/

#pragma once

#include <functional>
#include "base/RefCounted.h"
#include "cocos/bindings/jswrapper/SeApi.h"

class CleanupTask : public cc::RefCounted {
public:
    static void pushTaskToAutoReleasePool(const std::function<void()> &cb);

    CleanupTask();
    ~CleanupTask() override;

private:
    std::function<void()> _cb{nullptr};
};

template <typename T>
bool bindAsExternalBuffer(se::State &s) { // NOLINT
    auto *self = SE_THIS_OBJECT<T>(s);
    if (!self) {
        return false;
    }
    // NOLINTNEXTLINE
    se::HandleObject buffer(se::Object::createExternalArrayBufferObject(self, sizeof(*self), [](void *, size_t, void *) {}));
    s.rval().setObject(buffer);
    return true;
}

#define REG_UNDERLINE_DATA(currentProto, type) \
    currentProto->defineFunction("underlyingData", _SE(prefix##_##type##_underlyingData))

#define DESC_OFFSET_OF(type, field) \
    static_cast<int>(reinterpret_cast<uintptr_t>(&(static_cast<type *>(nullptr)->field)))

#define DESC_UNDERLINE_DATA_BEGIN(kls, prefix)                   \
    {                                                            \
        using current_type = kls;                                \
        se::Object *localProto = __jsb_##prefix##_##kls##_proto; \
        se::HandleObject info{se::Object::createPlainObject()};

#define DESC_UNDERLINE_DATA_FIELD(field)                                                        \
    {                                                                                           \
        se::HandleObject fieldInfo{se::Object::createPlainObject()};                            \
        int fieldOffset = DESC_OFFSET_OF(current_type, field);                                  \
        constexpr int fieldSize = static_cast<int>(sizeof(std::declval<current_type>().field)); \
        fieldInfo->setProperty("fieldName", se::Value(#field));                                 \
        fieldInfo->setProperty("fieldOffset", se::Value(fieldOffset));                          \
        fieldInfo->setProperty("fieldSize", se::Value(fieldSize));                              \
        info->setProperty(#field, se::Value(fieldInfo));                                        \
    }

#define DESC_UNDERLINE_DATA_END(kls)                                       \
    se::Value protoVal;                                                    \
    localProto->getProperty("constructor", &protoVal);                     \
    protoVal.toObject()->setProperty("__nativeFields__", se::Value(info)); \
    REG_UNDERLINE_DATA(localProto, kls);                                   \
    }

#define IMPL_UNDERLINE_DATA(type)                                \
    static bool prefix##_##type##_underlyingData(se::State &s) { \
        return bindAsExternalBuffer<type>(s);                    \
    }                                                            \
    SE_BIND_FUNC(prefix##_##type##_underlyingData)