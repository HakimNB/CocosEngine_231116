
import { ccclass, override, serializable } from 'cc.decorator';
import { JSB } from 'internal:constants';


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


const meshRendererProto = MeshRenderer.prototype;

Object.defineProperty(meshRendererProto, 'lightmapSettings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (this._lightmapSettingsCache) {
      return this._lightmapSettings;
    }
    return this._lightmapSettingsCache;
  },
  set: function (settings) {
    if (Array.isArray(settings)) {
      this._lightmapSettingsCache = settings;
      return;
    }
    this._lightmapSettingsCache = null;
    this._lightmapSettings = settings;
  }
})



_applyDecoratedDescriptor(_class2.prototype, "texture", [serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
});
_applyDecoratedDescriptor(_class2.prototype, "uvParam", [serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new Vec4();
  }
});
const _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_bakeable", [serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
});
const _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_castShadow", [serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
});
const _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_receiveShadow", [serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
});
const _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_lightmapSize", [serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 64;
  }
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

{
  const clsDecorator = ccclass('cc.ModelLightmapSettings');
  clsDecorator(ModelLightmapSettings);
  legacyCC.ModelLightmapSettings = jsb.ModelLightmapSettings;
}



export declare namespace MeshRenderer {
  export type ShadowCastingMode = EnumAlias<typeof ModelShadowCastingMode>;
  export type ShadowReceivingMode = EnumAlias<typeof ModelShadowReceivingMode>;
}
