/****************************************************************************
 Copyright (c) 2021-2022 Xiamen Yaji Software Co., Ltd.

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

#include "PassInsertPointManager.h"
#include "base/macro/Macros.h"

namespace cc {
namespace framegraph {

PassInsertPointManager &PassInsertPointManager::getInstance() {
    static PassInsertPointManager instance;
    return instance;
}

PassInsertPoint PassInsertPointManager::record(const char *const name, const PassInsertPoint point) {
    StringHandle nameHandle = _stringPool.find(name);

    if (nameHandle.isValid()) {
        CC_ASSERT(point == get(nameHandle));
        return get(nameHandle);
    }

    nameHandle = _stringPool.stringToHandle(name);
    CC_ASSERT(nameHandle == _insertPoints.size());
    _insertPoints.emplace_back(point);
    return point;
}

PassInsertPoint PassInsertPointManager::get(const char *const name) const {
    const StringHandle nameHandle = _stringPool.find(name);
    CC_ASSERT(nameHandle.isValid());
    return get(nameHandle);
}

} // namespace framegraph
} // namespace cc
