/****************************************************************************
 Copyright (c) 2022 Xiamen Yaji Software Co., Ltd.

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

#include "jsb_geometry_manual.h"

#include "bindings/manual/jsb_global.h"
#include "cocos/bindings/auto/jsb_geometry_auto.h"
#include "cocos/bindings/jswrapper/SeApi.h"
#include "cocos/bindings/manual/jsb_conversions.h"
#include "cocos/bindings/manual/jsb_global_init.h"
#include "jsb_helper.h"

using namespace cc::geometry;

#define prefix jsb_cc_geometry

IMPL_UNDERLINE_DATA(Line)
IMPL_UNDERLINE_DATA(Plane)
IMPL_UNDERLINE_DATA(Ray)
IMPL_UNDERLINE_DATA(Triangle)
IMPL_UNDERLINE_DATA(Sphere)
IMPL_UNDERLINE_DATA(AABB)
IMPL_UNDERLINE_DATA(Capsule)
IMPL_UNDERLINE_DATA(Frustum)

bool register_all_geometry_manual(se::Object* /*obj*/) { // NOLINT(readability-identifier-naming)
    using namespace cc::geometry;

    DESC_UNDERLINE_DATA_BEGIN(Line, cc_geometry)
    DESC_UNDERLINE_DATA_FIELD(s)
    DESC_UNDERLINE_DATA_FIELD(e)
    DESC_UNDERLINE_DATA_END(Line)

    DESC_UNDERLINE_DATA_BEGIN(Plane, cc_geometry)
    DESC_UNDERLINE_DATA_FIELD(n)
    DESC_UNDERLINE_DATA_FIELD(d)
    DESC_UNDERLINE_DATA_END(Plane)

    DESC_UNDERLINE_DATA_BEGIN(Ray, cc_geometry)
    DESC_UNDERLINE_DATA_FIELD(o)
    DESC_UNDERLINE_DATA_FIELD(d)
    DESC_UNDERLINE_DATA_END(Ray)

    DESC_UNDERLINE_DATA_BEGIN(Triangle, cc_geometry)
    DESC_UNDERLINE_DATA_FIELD(a)
    DESC_UNDERLINE_DATA_FIELD(b)
    DESC_UNDERLINE_DATA_FIELD(c)
    DESC_UNDERLINE_DATA_END(Triangle)

    DESC_UNDERLINE_DATA_BEGIN(Sphere, cc_geometry)
    DESC_UNDERLINE_DATA_FIELD(_center)
    DESC_UNDERLINE_DATA_FIELD(_radius)
    DESC_UNDERLINE_DATA_END(Sphere)

    DESC_UNDERLINE_DATA_BEGIN(AABB, cc_geometry)
    DESC_UNDERLINE_DATA_FIELD(center)
    DESC_UNDERLINE_DATA_FIELD(halfExtents)
    DESC_UNDERLINE_DATA_END(AABB)

    DESC_UNDERLINE_DATA_BEGIN(Capsule, cc_geometry)
    DESC_UNDERLINE_DATA_FIELD(radius)
    DESC_UNDERLINE_DATA_FIELD(halfHeight)
    DESC_UNDERLINE_DATA_FIELD(axis)
    DESC_UNDERLINE_DATA_FIELD(center)
    DESC_UNDERLINE_DATA_FIELD(rotation)
    DESC_UNDERLINE_DATA_FIELD(ellipseCenter0)
    DESC_UNDERLINE_DATA_FIELD(ellipseCenter1)
    DESC_UNDERLINE_DATA_END(Capsule)

    // underlying data not required for Frustum
    // DESC_UNDERLINE_DATA_BEGIN(Frustum)
    // DESC_UNDERLINE_DATA_FIELD(vertices)
    // DESC_UNDERLINE_DATA_FIELD(planes)
    // DESC_UNDERLINE_DATA_END(Frustum)

    return true;
}
