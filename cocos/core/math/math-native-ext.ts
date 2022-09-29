import { NATIVE } from 'internal:constants';
import { Mat4 } from './mat4';
import { Mat3 } from './mat3';
import { Vec3 } from './vec3';
import { Vec4 } from './vec4';

const defineAttr = (proto, name, offset) => {
    Object.defineProperty(proto, name, {
        configurable: true,
        enumerable: true,
        get () {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this._data()[offset];
        },
        set (v: number) {
            this._data()[offset] = v;
        },
    });
};

if (NATIVE) {
    jsb.NativeMat4.prototype._data = function () {
        if (!this.__data) {
            this.__data = new Float32Array(this.underlyingData());
        }
        return this.__data;
    };
    Object.setPrototypeOf(jsb.NativeMat4.prototype, Mat4.prototype);

    // map attributes x, y, z to underlyingData
    for (let i = 0; i < 16; i++) {
        const numb = `0${i}`;
        defineAttr(jsb.NativeMat4.prototype, `m${numb.substring(numb.length - 2)}`, i);
    }

    // inherit Vec3

    jsb.NativeMat3.prototype._data = function () {
        if (!this.__data) {
            this.__data = new Float32Array(this.underlyingData());
        }
        return this.__data;
    };

    // map attributes x, y, z to underlyingData
    for (let i = 0; i < 9; i++) {
        const numb = `0${i}`;
        defineAttr(jsb.NativeMat3.prototype, `m${numb.substring(numb.length - 2)}`, i);
    }
    // inherit Vec3
    Object.setPrototypeOf(jsb.NativeMat3.prototype, Mat3.prototype);

    jsb.NativeVec3.prototype._data = function () {
        if (!this.__data) {
            this.__data = new Float32Array(this.underlyingData());
        }
        return this.__data;
    };

    // map attributes x, y, z to underlyingData
    defineAttr(jsb.NativeVec3.prototype, 'x', 0);
    defineAttr(jsb.NativeVec3.prototype, 'y', 1);
    defineAttr(jsb.NativeVec3.prototype, 'z', 2);

    // inherit Vec3
    Object.setPrototypeOf(jsb.NativeVec3.prototype, Vec3.prototype);

    jsb.NativeVec4.prototype._data = function () {
        if (!this.__data) {
            this.__data = new Float32Array(this.underlyingData());
        }
        return this.__data;
    };

    // map attributes x, y, z to underlyingData
    defineAttr(jsb.NativeVec4.prototype, 'x', 0);
    defineAttr(jsb.NativeVec4.prototype, 'y', 1);
    defineAttr(jsb.NativeVec4.prototype, 'z', 2);
    defineAttr(jsb.NativeVec4.prototype, 'w', 3);

    // inherit Vec3
    Object.setPrototypeOf(jsb.NativeVec4.prototype, Vec4.prototype);
}
