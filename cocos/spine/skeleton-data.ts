/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

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

import { Asset, CCString, Enum, errorID, Node, Texture2D } from '../../cocos/core';
import SkeletonCache from './skeleton-cache';
import { Skeleton } from './Skeleton';
import { SkeletonTexture } from './skeleton-texture';
import spine from './lib/spine-core.js';
import { ccclass, serializable, type } from '../../cocos/core/data/decorators';
import { EDITOR } from '../../editor/exports/populate-internal-constants';

/**
 * !#en The skeleton data of spine.
 * !#zh Spine 的 骨骼数据。
 * @class SkeletonData
 * @extends Asset
 */
@ccclass('sp.SkeletonData')
export class SkeletonData extends Asset {

    constructor () {
        super();
        this.reset();
    }

    _skeletonJson: spine.SkeletonJson | null = null;

    // use by jsb
    get skeletonJsonStr (): string {
        if (this._skeletonJson) {
            return JSON.stringify(this._skeletonJson);
        } else {
            return '';
        }

    }

    /**
     * !#en See http://en.esotericsoftware.com/spine-json-format
     * !#zh 可查看 Spine 官方文档 http://zh.esotericsoftware.com/spine-json-format
     * @property {Object} skeletonJson
     */
    @serializable
    get skeletonJson (): spine.SkeletonJson {
        return this._skeletonJson!;
    }
    set skeletonJson (value: spine.SkeletonJson) {
        this.reset();
        if (typeof (value) === 'string') {
            this._skeletonJson = JSON.parse(value);
        } else {
            this._skeletonJson = value;
        }
        // If create by manual, uuid is empty.
        if (!this._uuid && (value as any).skeleton) {
            this._uuid = (value as any).skeleton.hash;
        }
    }


    protected _atlasText: string = '';

    /**
     * @property {String} atlasText
     */
    @serializable
    get atlasText () {
        return this._atlasText;
    }
    set atlasText (value) {
        this._atlasText = value;
        this.reset();
    }


    /**
     * @property {Texture2D[]} textures
     */

    @serializable
    @type([Texture2D])
    textures: Texture2D[] = [];

    /**
     * @property {String[]} textureNames
     * @private
     */
    @serializable
    @type([CCString])
    textureNames: string[] = [];

    /**
     * !#en
     * A scale can be specified on the JSON or binary loader which will scale the bone positions,
     * image sizes, and animation translations.
     * This can be useful when using different sized images than were used when design ing the skeleton
     * in Spine. For example, if using images that are half the size than were used in Spine,
     * a scale of 0.5 can be used. This is commonly used for games that can run with either low or high
     * resolution texture atlases.
     * see http://en.esotericsoftware.com/spine-using-runtimes#Scaling
     * !#zh 可查看 Spine 官方文档： http://zh.esotericsoftware.com/spine-using-runtimes#Scaling
     * @property {Number} scale
     */
    @serializable
    scale: number = 1;

    private _buffer?: ArrayBuffer;

    get _nativeAsset (): ArrayBuffer {
        return this._buffer!;
    }
    set _nativeAsset (bin: ArrayBuffer) {
        this._buffer = bin;
        this.reset();
    }




    static preventDeferredLoadDependents: boolean = true;


    // PUBLIC

    createNode (callback:(err:Error|null, node:Node)=>void) {
        const node = new Node(this.name);
        const skeleton = node.addComponent(Skeleton);
        skeleton.skeletonData = this;

        return callback(null, node);
    }

    /**
     * @property {sp.spine.SkeletonData} _skeletonData
     * @private
     */
    private _skeletonCache: spine.SkeletonData | null = null;

    private _atlasCache: spine.TextureAtlas | null = null;

    reset () {
        this._skeletonCache = null;
        this._atlasCache = null;
        if (EDITOR) {
            this._skinsEnum = null;
            this._animsEnum = null;
        }
    }

    ensureTexturesLoaded (loaded: null | ((x: boolean) => void), caller: any) {
        const textures = this.textures;
        const texsLen = textures.length;
        if (texsLen === 0) {
            loaded?.call(caller, false);
            return;
        }
        let loadedCount = 0;
        const loadedItem = () => {
            loadedCount++;
            if (loadedCount >= texsLen) {
                loaded?.call(caller, true);
                loaded = null;
            }
        }
        for (let i = 0; i < texsLen; i++) {
            const tex = textures[i];
            if (tex.loaded) {
                loadedItem();
            } else {
                tex.once('load', loadedItem);
            }
        }
    }

    isTexturesLoaded () {
        const textures = this.textures;
        const texsLen = textures.length;
        for (let i = 0; i < texsLen; i++) {
            const tex = textures[i];
            if (!tex.loaded) {
                return false;
            }
        }
        return true;
    }

    /**
     * !#en Get the included SkeletonData used in spine runtime.<br>
     * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.SkeletonData object.
     * !#zh 获取 Spine Runtime 使用的 SkeletonData。<br>
     * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.SkeletonData 对象。
     * @method getRuntimeData
     * @param {Boolean} [quiet=false]
     * @return {sp.spine.SkeletonData}
     */
    getRuntimeData (quiet?:boolean) {
        if (this._skeletonCache) {
            return this._skeletonCache;
        }

        if (!(this.textures && this.textures.length > 0) && this.textureNames && this.textureNames.length > 0) {
            if (!quiet) {
                errorID(7507, this.name);
            }
            return null;
        }

        const atlas = this._getAtlas(quiet);
        if (!atlas) {
            return null;
        }
        const attachmentLoader = new spine.AtlasAttachmentLoader(atlas);

        let resData: spine.SkeletonJson | Uint8Array | null = null;
        let reader: spine.SkeletonJson | spine.SkeletonBinary | null = null;
        if (this.skeletonJson) {
            reader = new spine.SkeletonJson(attachmentLoader);
            resData = this.skeletonJson;
        } else {
            reader = new spine.SkeletonBinary(attachmentLoader);
            resData = new Uint8Array(this._nativeAsset);
        }

        reader.scale = this.scale;
        this._skeletonCache = reader.readSkeletonData(resData as any);
        atlas.dispose();

        return this._skeletonCache;
    }

    // EDITOR functions

    _skinsEnum: { [key: string]: number } | null = null;
    _animsEnum: { [key: string]: number } | null = null;

    getSkinsEnum () {
        if (this._skinsEnum) {
            return this._skinsEnum;
        }
        const sd = this.getRuntimeData(true);
        if (sd) {
            const skins = sd.skins;
            const enumDef = {};
            for (let i = 0; i < skins.length; i++) {
                const name = skins[i].name;
                enumDef[name] = i;
            }
            return this._skinsEnum = Enum(enumDef);
        }
        return null;
    }

    getAnimsEnum () {
        if (this._animsEnum) {
            return this._animsEnum;
        }
        const sd = this.getRuntimeData(true);
        if (sd) {
            const enumDef = { '<None>': 0 };
            const anims = sd.animations;
            for (let i = 0; i < anims.length; i++) {
                const name = anims[i].name;
                enumDef[name] = i + 1;
            }
            return this._animsEnum = Enum(enumDef);
        }
        return null;
    }

    // PRIVATE

    private _getTexture (line: string) {
        const names = this.textureNames;
        for (let i = 0; i < names.length; i++) {
            if (names[i] === line) {
                const texture = this.textures[i];
                const tex = new SkeletonTexture({ width: texture.width, height: texture.height } as ImageBitmap);
                tex.setRealTexture(texture);
                return tex;
            }
        }
        errorID(7506, line);
        return null;
    }

    /**
     * @method _getAtlas
     * @param {boolean} [quiet=false]
     * @return {sp.spine.Atlas}
     * @private
     */
    private _getAtlas (quiet?: boolean) {
        if (this._atlasCache) {
            return this._atlasCache;
        }

        if (!this.atlasText) {
            if (!quiet) {
                errorID(7508, this.name);
            }
            return null;
        }

        return this._atlasCache = new spine.TextureAtlas(this.atlasText, this._getTexture.bind(this));
    }

    destroy () {
        SkeletonCache.sharedCache.removeSkeleton(this._uuid);
        return super.destroy();
    }
}
