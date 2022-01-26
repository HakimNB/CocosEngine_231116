
import { ccclass, override, serializable } from 'cc.decorator';
import { JSB } from 'internal:constants';
import { CCClass } from '../../core/data/class';


import {
  _applyDecoratedDescriptor,
  _assertThisInitialized,
  _initializerDefineProperty,
} from '../../core/data/utils/decorator-jsb-utils';


import { legacyCC } from '../../core/global-exports';
import { Vec4 } from '../../core/math';
import { Enum } from '../../core/value-types';


/**
 * @en Shadow projection mode.
 * @zh 阴影投射方式。
 */
const ModelShadowCastingMode = Enum({
  /**
   * @en Disable shadow projection.
   * @zh 不投射阴影。
   */
  OFF: 0,
  /**
   * @en Enable shadow projection.
   * @zh 开启阴影投射。
   */
  ON: 1,
});

/**
 * @en Shadow receive mode.
 * @zh 阴影接收方式。
 */
const ModelShadowReceivingMode = Enum({
  /**
   * @en Disable shadow projection.
   * @zh 不接收阴影。
   */
  OFF: 0,
  /**
   * @en Enable shadow projection.
   * @zh 开启阴影投射。
   */
  ON: 1,
});



export type MeshRenderer = jsb.MeshRenderer;
export const MeshRenderer = jsb.MeshRenderer;

export type ModelLightmapSettings = jsb.ModelLightmapSettings;
export const ModelLightmapSettings = jsb.ModelLightmapSettings;

const _class2 = jsb.ModelLightmapSettings;
const _class5 = jsb.MeshRenderer;


// TODO: need automatically do this
MeshRenderer.isNativeComponent = true;


function WatchArray<T>(array: T[], syncFun: (v: T[]) => void) {
  return new Proxy(array, {
    // apply: function (target, thisArg, argumentsList) {
    //   return Reflect.get(target, thisArg).apply(this, argumentsList);
    // },
    set: function (target, property, value, receiver) {
      // console.log(`set ${property} to ${value}`);
      Reflect.set(target, property, value, receiver);
      if (!isNaN(parseInt(property.toString())) || property === 'length') {
        syncFun(target);
      }
      return true;
    },
    get: function (target, property, receiver) {
      // console.log(`get ${property}`);
      const ret = Reflect.get(target, property, receiver);
      if (property === 'target') {
        return target;
      }
      if (property === 'push' || property === 'pop') {
        return (...args) => {
          ret.call(target, args);
          syncFun(target);
        };
      }
      return ret;
    },
  });
}

const meshRendererProto = MeshRenderer.prototype;

meshRendererProto._ctor = function () {
  this.registerCallbacks(this);
  // this.lightmapSettings = new jsb.ModelLightmapSettings();
  this.syncMaterialsInvoked = false;
};

/*
   enum class Type {
        DEFAULT,
        SKINNING,
        BAKED_SKINNING,
        BATCH_2D,
        PARTICLE_BATCH,
        LINE,
    };
*/

const ModelTypes = {
  DEFAULT: 0,
  SKINNING: 1,
  BAKED_SKINNING: 2,
  BATCH_2D: 3,
  PARTICLE_BATCH: 4,
  LINE: 5,
};

Object.defineProperty(meshRendererProto, '_modelType', {
  enumerable: true,
  configurable: true,
  set(v) {
    if (v === jsb.Model) {
      this.__modelType = ModelTypes.DEFAULT;
    } else if (v === jsb.SkinningModel) {
      this.__modelType = ModelTypes.SKINNING;
    } else if (v === jsb.BakedSkinningModel) {
      this.__modelType = ModelTypes.BAKED_SKINNING;
    } else {
      //TODO(PatriceJiang)
      this.__modelType = ModelTypes.DEFAULT;
    }
    this._$modelType = v;
  },
  get() {
    return this._$modelType;
  }
})


function searchPropertyDescriptor(proto: any, key: string) {
  let p = proto;
  let desc;
  while (p !== Object.prototype) {
    desc = Object.getOwnPropertyDescriptor(p, key);
    if (desc) {
      return desc;
    }
    p = Object.getPrototypeOf(p);
  }
}

meshRendererProto.syncMaterials = function () {
  this.lightmapSettings = this.lightmapSettings;
  this._materials = this._materials;
  this.syncMaterialsInvoked = true;
};

function replaceMaybeArrayProperty(proto: any, key: string, underlyKey: string) {
  const CACHE_KEY = `${key}_cache`;
  const CACHE_KEY_BK = `${key}_cacheBackup`;
  // const PROXY_KEY = `${key}_proxy`;
  Object.defineProperty(proto, key, {
    configurable: true,
    enumerable: true,
    get: function () {
      if (this[CACHE_KEY]) {
        return this[CACHE_KEY];
      }
      // if (!this[PROXY_KEY]) {
      // this[PROXY_KEY] = WatchArray(this[underlyKey], (arr) => {
      // this[underlyKey] = arr;
      // });
      // }
      return this[underlyKey];
    },
    set: function (v) {
      if (!v) return;
      let hasEmptySlot = false;
      for (let i = 0; i < v.length; i++) {
        if (v[i] === undefined || v[i] === null || typeof v[i] === 'number') {
          hasEmptySlot = true;
        }
      }
      if (v.length > 0 && hasEmptySlot) {
        this[CACHE_KEY] = v;
        this[CACHE_KEY_BK] = v;
        return;
      }
      this[CACHE_KEY] = null;
      this[underlyKey] = v;
      // if (!this[PROXY_KEY]) {
      // this[PROXY_KEY] = WatchArray(this[underlyKey], (arr) => {
      // this[underlyKey] = arr;
      // });
      // }
    }
  });
}

replaceMaybeArrayProperty(meshRendererProto, '_materials', '__materials');
// replaceMaybeArrayProperty(meshRendererProto, 'lightmapSettings', '_lightmapSettings');

Object.defineProperty(meshRendererProto, 'lightmapSettings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (this._lightmapSettingsCache) {
      return this._lightmapSettingsCache;
    }
    return this._lightmapSettings;
  },
  set: function (settings) {
    if (Array.isArray(settings)) {
      this._lightmapSettingsCache = settings;
      return;
    }
    this._lightmapSettingsCache = null;
    this._lightmapSettings = settings;
  }
});


// NOTE: use fastDefine instead 
// _applyDecoratedDescriptor(_class2.prototype, "texture", [serializable], {
//   configurable: true,
//   enumerable: true,
//   writable: true,
//   initializer: function () {
//     return null;
//   }
// });
// _applyDecoratedDescriptor(_class2.prototype, "uvParam", [serializable], {
//   configurable: true,
//   enumerable: true,
//   writable: true,
//   initializer: function () {
//     return new Vec4();
//   }
// });
// const _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_bakeable", [serializable], {
//   configurable: true,
//   enumerable: true,
//   writable: true,
//   initializer: function () {
//     return false;
//   }
// });
// const _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_castShadow", [serializable], {
//   configurable: true,
//   enumerable: true,
//   writable: true,
//   initializer: function () {
//     return false;
//   }
// });
// const _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_receiveShadow", [serializable], {
//   configurable: true,
//   enumerable: true,
//   writable: true,
//   initializer: function () {
//     return false;
//   }
// });
// const _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_lightmapSize", [serializable], {
//   configurable: true,
//   enumerable: true,
//   writable: true,
//   initializer: function () {
//     return 64;
//   }
// });
// TODO: fastDefine
CCClass.fastDefine("cc.ModelLightmapSettings", jsb.ModelLightmapSettings, {
  texture: null,
  uvParam: new Vec4(),
  _bakeable: false,
  _castShadow: false,
  _receiveShadow: false,
  _lightmapSize: 64,
});


const _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "lightmapSettings", [serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    if (!this._defaultLightmapSettings) {
      this._defaultLightmapSettings = new jsb.ModelLightmapSettings();
    }
    return this._defaultLightmapSettings;
  }
});
const _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "_mesh", [serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
});
const _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "_shadowCastingMode", [serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return ModelShadowCastingMode.OFF;
  }
});
const _descriptor10 = _applyDecoratedDescriptor(_class5.prototype, "_shadowReceivingMode", [serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return ModelShadowReceivingMode.ON;
  }
});
const _descriptor11 = _applyDecoratedDescriptor(_class5.prototype, "_enableMorph", [serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
});


// inherited from jsb.RenderableComponent
_applyDecoratedDescriptor(_class5.prototype, "_visFlags", [serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0; // Layers.Enum.NONE;
  }
});

_applyDecoratedDescriptor(_class5.prototype, "_materials", [serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
});
// inherited from jsb.Component
_applyDecoratedDescriptor(_class5.prototype, "node", [serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null; // NullNode;
  }
});

_applyDecoratedDescriptor(_class5.prototype, "_enabled", [serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
});

_applyDecoratedDescriptor(_class5.prototype, "__prefab", [serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
});


{
  const clsDecorator = ccclass('cc.MeshRenderer');
  clsDecorator(MeshRenderer)
  legacyCC.MeshRenderer = jsb.MeshRenderer;
}

// {
//   const clsDecorator = ccclass('cc.ModelLightmapSettings');
//   clsDecorator(ModelLightmapSettings);
//   legacyCC.ModelLightmapSettings = jsb.ModelLightmapSettings;
// }



export declare namespace MeshRenderer {
  export type ShadowCastingMode = EnumAlias<typeof ModelShadowCastingMode>;
  export type ShadowReceivingMode = EnumAlias<typeof ModelShadowReceivingMode>;
}
