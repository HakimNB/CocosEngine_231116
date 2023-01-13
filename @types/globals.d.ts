/*
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

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
*/

declare const gfx: any;
declare const global: any;
declare const xr: any;

interface Window {

    [x: string]: any;

    WebGL2RenderingContext: any;

    sharedCanvas: any;
    __canvas: any;
    canvas: any;

    XMLHttpRequest: any;
    mozRequestAnimationFrame(callback: any, element?: any): any;
    oRequestAnimationFrame(callback: any, element?: any): any;
    msRequestAnimationFrame(callback: any, element?: any): any;
    cancelRequestAnimationFrame(callback: any, element?: any): any;
    msCancelRequestAnimationFrame(callback: any, element?: any): any;
    mozCancelRequestAnimationFrame(callback: any, element?: any): any;
    oCancelRequestAnimationFrame(callback: any, element?: any): any;
    webkitCancelRequestAnimationFrame(callback: any, element?: any): any;
    msCancelAnimationFrame(callback: any, element?: any): any;
    mozCancelAnimationFrame(callback: any, element?: any): any;
    ocancelAnimationFrame(callback: any, element?: any): any;
}

interface Document {
    mozHidden: any;
    msHidden: any;
    webkitHidden: any;
}

interface HTMLElement {
    content: any;
    name: any;
}

declare type CompareFunction<T> = (a: T, b: T) => number;

declare type RecursivePartial<T> = {
    [P in keyof T]?:
    T[P] extends Array<infer U> ? Array<RecursivePartial<U>> :
        T[P] extends ReadonlyArray<infer V> ? ReadonlyArray<RecursivePartial<V>> : RecursivePartial<T[P]>;
};

declare type TypedArray = Uint8Array | Uint8ClampedArray | Int8Array | Uint16Array |
Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array;

declare type TypedArrayConstructor = Uint8ArrayConstructor | Uint8ClampedArrayConstructor |
Int8ArrayConstructor | Uint16ArrayConstructor | Int16ArrayConstructor | Uint32ArrayConstructor |
Int32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor;

declare interface IWritableArrayLike<T> {
    readonly length: number;
    [index: number]: T;
}

declare type Constructor<T = unknown> = new (...args: any[]) => T;

declare type AbstractedConstructor<T = unknown> = abstract new (...args: any[]) => T;

/**
 * Alias of `Function` but suppress eslint warning.
 * Please avoid using it and explicitly specify function signatures as possible.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
declare type AnyFunction = Function;

declare type Mutable<T> = { -readonly [P in keyof T]: T[P] };

declare type Getter = () => any;

declare type Setter = (value: any) => void;

declare const Buffer: any;

declare type EnumAlias<EnumT> = EnumT[keyof EnumT];

declare interface Xctor<T> extends Constructor<T> {
    __props__: string[];
    __values__: string[];
    __attrs__: AttrHugeObj<T>;
    __cid__: string;
    __classname__: string;
    $super?: Xctor<unknown>;
    __ccclassCache__?: {
        proto: {
            properties: { [key: string]: any }
        }
    }
}
declare interface Xattr<T> {
    visible?: boolean;
    editable?: boolean;
    serializable?: boolean;
    default?: T | { (): T };
    ctor?: Xctor<T>;
}

declare type StringTypeExtract1<T> = T extends `${infer T1}$_$${infer _}` ? T1 : never;
declare type StringTypeExtract2<T> = T extends `${infer _}$_$${infer T2}` ? T2 : never;
declare type TestAndReadField<T, Key> = Key extends keyof T ? T[Key] : never;

// declare type ExcludeFunction<M, K extends keyof M> = M[K] extends {(...args: any[]): any} ? never : K;
declare type NonFunctionPartial<T> = {
    [K in keyof T as T[K] extends AnyFunction ? never : K]: T[K]
}

// declare type AttrKeysType<T> = `${string & keyof T}$_$${keyof Xattr<T>}`;
declare type MakeAttributeName<S, T> = `${string & S}$_$${string & T}`;
declare type AttrHugeObj<T,
    Key_ofT extends keyof T = keyof NonFunctionPartial<T>,
    // Key_ofT extends keyof T = keyof T,
    FieldTypes_ofT extends T[Key_ofT] = T[Key_ofT],
    All_Attrs extends Xattr<FieldTypes_ofT> = Xattr<FieldTypes_ofT>,
    Key_ofAttrs extends keyof All_Attrs = keyof All_Attrs
>
    =
    { [Key_ofHuge in MakeAttributeName<Key_ofT, Key_ofAttrs>]:
        TestAndReadField<Xattr<TestAndReadField<T, StringTypeExtract1<Key_ofHuge>>>, StringTypeExtract2<Key_ofHuge>> };
