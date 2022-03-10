/****************************************************************************
 Copyright (c) 2020-2022 Xiamen Yaji Software Co., Ltd.

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

#include "base/CoreStd.h"
#include "base/macro/Macros.h"
#include "cocos/bindings/jswrapper/Object.h"

namespace cc {
namespace pipeline {

class CC_DLL DefineMap final : public Object {
public:
    DefineMap();
    ~DefineMap() override;

    inline se::Object *getObject() const { return _jsbMacros; }
    inline void        getValue(const String &name, se::Value *value) const { _jsbMacros->getProperty(name.c_str(), value); }

    template <class T, class RET = void>
    ENABLE_IF_T3_RET(float, bool, String)
    setValue(const String &name, const T &value) {
        se::Value v(value);
        _jsbMacros->setProperty(name.c_str(), v);
    }

private:
    se::Object *_jsbMacros = nullptr;
};

} // namespace pipeline
} // namespace cc
