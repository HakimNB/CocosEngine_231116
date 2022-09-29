import { NATIVE } from 'internal:constants';
import { Mat4 } from './mat4';
import { Mat3 } from './mat3';
import { Vec3 } from './vec3';
import { Vec2 } from './vec2';
import { Vec4 } from './vec4';
import { Quat } from './quat';
import { Color } from './color';

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

enum MathType {
    VEC2 = 0,
    VEC3,
    VEC4,
    QUATERNION,
    MAT3,
    MAT4,
    SIZE,
    RECT,
    COLOR,
}

function defineType (proto:any, parentProto:any,  typ: MathType) {
    proto._data = function () {
        if (!this.__data) {
            this.__data = new Float32Array(this.underlyingData());
        }
        return this.__data as Float32Array;
    };
    Object.setPrototypeOf(proto, parentProto);
    Object.defineProperty(proto, 'type', { configurable: true, enumerable: true, writable: false, value: typ });
}

if (NATIVE) {
    defineType(jsb.Mat4.prototype, Mat4.prototype, MathType.MAT4);

    // map attributes x, y, z to underlyingData
    for (let i = 0; i < 16; i++) {
        const numb = `0${i}`;
        defineAttr(jsb.Mat4.prototype, `m${numb.substring(numb.length - 2)}`, i);
    }

    // inherit Vec3

    for (let i = 0; i < 9; i++) {
        const numb = `0${i}`;
        defineAttr(jsb.Mat3.prototype, `m${numb.substring(numb.length - 2)}`, i);
    }
    // inherit Vec3
    defineType(jsb.Mat3.prototype, Mat3.prototype, MathType.MAT3);

    // map attributes x, y, z to underlyingData
    defineAttr(jsb.Vec2.prototype, 'x', 0);
    defineAttr(jsb.Vec2.prototype, 'y', 1);
    defineType(jsb.Vec2.prototype, Vec2.prototype, MathType.VEC2);

    // map attributes x, y, z to underlyingData
    defineAttr(jsb.Vec3.prototype, 'x', 0);
    defineAttr(jsb.Vec3.prototype, 'y', 1);
    defineAttr(jsb.Vec3.prototype, 'z', 2);

    defineType(jsb.Vec3.prototype, Vec3.prototype, MathType.VEC3);

    // map attributes x, y, z to underlyingData
    defineAttr(jsb.Vec4.prototype, 'x', 0);
    defineAttr(jsb.Vec4.prototype, 'y', 1);
    defineAttr(jsb.Vec4.prototype, 'z', 2);
    defineAttr(jsb.Vec4.prototype, 'w', 3);

    // inherit Vec3
    defineType(jsb.Vec4.prototype, Vec4.prototype, MathType.VEC4);

    // map attributes x, y, z to underlyingData
    defineAttr(jsb.Quat.prototype, 'x', 0);
    defineAttr(jsb.Quat.prototype, 'y', 1);
    defineAttr(jsb.Quat.prototype, 'z', 2);
    defineAttr(jsb.Quat.prototype, 'w', 3);

    // inherit Vec3
    defineType(jsb.Quat.prototype, Quat.prototype, MathType.QUATERNION);

    // map attributes x, y, z to underlyingData
    defineAttr(jsb.Color.prototype, 'x', 0);
    defineAttr(jsb.Color.prototype, 'y', 1);
    defineAttr(jsb.Color.prototype, 'z', 2);
    defineAttr(jsb.Color.prototype, 'w', 3);

    // inherit Vec3
    Object.setPrototypeOf(jsb.Color.prototype, Color.prototype);
    Object.defineProperty(jsb.Color.prototype, 'type', { configurable: true, enumerable: true, writable: false, value: MathType.COLOR });
}
