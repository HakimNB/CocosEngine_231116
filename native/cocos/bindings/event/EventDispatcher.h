/****************************************************************************
 Copyright (c) 2018-2022 Xiamen Yaji Software Co., Ltd.

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
#include <memory>

#include "engine/EngineEvents.h"

namespace se {
class Value;
}

namespace cc {
class EventDispatcher {
public:
    static void init();
    static void destroy();
    static bool initialized();

    static void doDispatchJsEvent(const char *jsFunctionName, const std::vector<se::Value> &args);

private:
    static void dispatchTouchEvent(const TouchEvent &touchEvent);
    static void dispatchMouseEvent(const MouseEvent &mouseEvent);
    static void dispatchKeyboardEvent(const KeyboardEvent &keyboardEvent);
    static void dispatchControllerEvent(const ControllerEvent &controllerEvent);
    static void dispatchTickEvent(float dt);
    static void dispatchResizeEvent(int width, int height, uint32_t windowId = UINT32_MAX);
    static void dispatchOrientationChangeEvent(int orientation);
    static void dispatchEnterBackgroundEvent();
    static void dispatchEnterForegroundEvent();
    static void dispatchMemoryWarningEvent();
    static void dispatchRestartVM();
    static void dispatchCloseEvent();
    static uint32_t hashListenerId; // simple increment hash

    static cc::event::Listener<events::EnterForeground> listenerEnterForeground;
    static cc::event::Listener<events::EnterBackground> listenerEnterBackground;
    static cc::event::Listener<events::WindowChanged> listenerWindowChanged;
    static cc::event::Listener<events::LowMemory> listenerLowMemory;
    static cc::event::Listener<events::Touch> listenerTouch;
    static cc::event::Listener<events::Mouse> listenerMouse;
    static cc::event::Listener<events::Keyboard> listenerKeyboard;
    static cc::event::Listener<events::Controller> listenerConroller;
    static cc::event::Listener<events::Tick> listenerTick;
    static cc::event::Listener<events::Resize> listenerResize;
    static cc::event::Listener<events::Orientation> listenerOrientation;
    static cc::event::Listener<events::RestartVM> listenerRestartVM;
    static cc::event::Listener<events::Close> listenerClose;
};

} // end of namespace cc
