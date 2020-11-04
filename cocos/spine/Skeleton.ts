/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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

import { TrackEntryListeners } from './track-entry-listeners';
import spine from './lib/spine-core.js';
import { default as SkeletonCache, AnimationCache, AnimationFrame } from './skeleton-cache';
import { AttachUtil } from './AttachUtil';
import { ccclass, executeInEditMode, help, menu } from '../core/data/class-decorator';
import { UIRenderable } from '../core/components/ui-base/ui-renderable';
import { builtinResMgr, CCClass, ccenum, Color, Enum, errorID, logID, Material, PrivateNode, Texture2D, warn } from '../core';
import { displayName, editable, serializable, tooltip, type, visible } from '../core/data/decorators';
import { EDITOR } from '../../editor/exports/populate-internal-constants';
import { SkeletonData } from './skeleton-data';
import { VertexEffectDelegate } from './vertex-effect-delegate';
import { MeshRenderData } from '../core/renderer/ui/render-data';
import { UI } from '../core/renderer/ui/ui';
import { Graphics } from '../ui/components/graphics';

export let timeScale = 1.0;

export enum DefaultSkinsEnum {
    default = -1,
}
ccenum(DefaultSkinsEnum);

export enum DefaultAnimsEnum {
    None = 0
}
ccenum(DefaultAnimsEnum)

/**
 * !#en Enum for animation cache mode type.
 * !#zh Spine动画缓存类型
 * @enum Skeleton.AnimationCacheMode
 */
export enum AnimationCacheMode {
    /**
     * !#en The realtime mode.
     * !#zh 实时计算模式。
     * @property {Number} REALTIME
     */
    REALTIME = 0,
    /**
     * !#en The shared cache mode.
     * !#zh 共享缓存模式。
     * @property {Number} SHARED_CACHE
     */
    SHARED_CACHE = 1,
    /**
     * !#en The private cache mode.
     * !#zh 私有缓存模式。
     * @property {Number} PRIVATE_CACHE
     */
    PRIVATE_CACHE = 2
}
ccenum(AnimationCacheMode);

function setEnumAttr (obj, propName, enumDef) {
    CCClass.Attr.setClassAttr(obj, propName, 'type', 'Enum');
    CCClass.Attr.setClassAttr(obj, propName, 'enumList', Enum.getList(enumDef));
}

interface AnimationItem {
    animationName: string;
    loop: boolean;
    delay: number;
}

type TrackListener = (x: spine.TrackEntry) => void;
type TrackListener2 = (x: spine.TrackEntry, n: number) => void;

export enum SpineMaterialType {
    COLORED_TEXTURED = 0,
    COLORED = 1,
    TWO_COLORED,
}

export interface SkeletonMeshData {
    renderData: MeshRenderData;
    texture?: Texture2D;
}

/**
 * !#en
 * The skeleton of Spine <br/>
 * <br/>
 * (Skeleton has a reference to a SkeletonData and stores the state for skeleton instance,
 * which consists of the current pose's bone SRT, slot colors, and which slot attachments are visible. <br/>
 * Multiple skeletons can use the same SkeletonData which includes all animations, skins, and attachments.) <br/>
 * !#zh
 * Spine 骨骼动画 <br/>
 * <br/>
 * (Skeleton 具有对骨骼数据的引用并且存储了骨骼实例的状态，
 * 它由当前的骨骼动作，slot 颜色，和可见的 slot attachments 组成。<br/>
 * 多个 Skeleton 可以使用相同的骨骼数据，其中包括所有的动画，皮肤和 attachments。
 *
 * @class Skeleton
 * @extends UIRenderable
 */
@ccclass('sp.Skeleton')
@help('i18n:sp.Skeleton')
@menu('Components/SpineSkeleton')
@executeInEditMode
export class Skeleton extends UIRenderable {
    // editor: EDITOR && {
    //     menu: 'i18n:MAIN_MENU.component.renderers/Spine Skeleton',
    //     help: 'app://docs/html/components/spine.html',
    //     inspector: 'packages://inspector/inspectors/comps/skeleton2d.js',
    // },

    static AnimationCacheMode = AnimationCacheMode;

    protected _meshRenderDataArray: SkeletonMeshData[] = [];

    get meshRenderDataArray() { return this._meshRenderDataArray; }

    /**
     * !#en The skeletal animation is paused?
     * !#zh 该骨骼动画是否暂停。
     * @property paused
     * @type {Boolean}
     * @readOnly
     * @default false
     */
    @visible(false)
    paused: boolean = false;

    /**
     * !#en
     * The skeleton data contains the skeleton information (bind pose bones, slots, draw order,
     * attachments, skins, etc) and animations but does not hold any state.<br/>
     * Multiple skeletons can share the same skeleton data.
     * !#zh
     * 骨骼数据包含了骨骼信息（绑定骨骼动作，slots，渲染顺序，
     * attachments，皮肤等等）和动画但不持有任何状态。<br/>
     * 多个 Skeleton 可以共用相同的骨骼数据。
     * @property {sp.SkeletonData} skeletonData
     */
    @editable
    @type(SkeletonData)
    get skeletonData () {
        return this._skeletonData!;
    }
    set skeletonData (value: SkeletonData) {
        if (this._skeletonData != value) {
            this._skeletonData = value as any;
            this.defaultSkin = '';
            this.defaultAnimation = '';
            if (EDITOR) {
                this._refreshInspector();
            }
            this._updateSkeletonData();
        }
    }

    @serializable
    _skeletonData: SkeletonData | null = null;

    // 由于 spine 的 skin 是无法二次替换的，所以只能设置默认的 skin
    /**
     * !#en The name of default skin.
     * !#zh 默认的皮肤名称。
     * @property {String} defaultSkin
     */
    @serializable
    @visible(false)
    defaultSkin: string = '';

    /**
     * !#en The name of default animation.
     * !#zh 默认的动画名称。
     * @property {String} defaultAnimation
     */
    @visible(false)
    @serializable
    defaultAnimation: string = '';

    /**
     * !#en The name of current playing animation.
     * !#zh 当前播放的动画名称。
     * @property {String} animation
     */

    @serializable
    @visible(false)
    get animation (): string {
        if (this.isAnimationCached()) {
            return this._animationName!;
        } else {
            var entry = this.getCurrent(0);
            return (entry && entry.animation.name) || "";
        }
    }
    set animation (value: string) {
        this.defaultAnimation = value;
        if (value) {
            this.setAnimation(0, value, this.loop);
        }
        else if (!this.isAnimationCached()) {
            this.clearTrack(0);
            this.setToSetupPose();
        }
    }

    @displayName('Default Skin')
    @type(DefaultSkinsEnum)
    @tooltip('i18n:COMPONENT.skeleton.default_skin')
    get _defaultSkinIndex (): number {
        if (this.skeletonData) {
            var skinsEnum = this.skeletonData.getSkinsEnum();
            if (skinsEnum) {
                if (this.defaultSkin === "") {
                    if (skinsEnum.hasOwnProperty(0)) {
                        this._defaultSkinIndex = 0;
                        return 0;
                    }
                } else {
                    var skinIndex = skinsEnum[this.defaultSkin];
                    if (skinIndex !== undefined) {
                        return skinIndex;
                    }
                }
            }
        }
        return 0;
    }
    set _defaultSkinIndex (value: number) {
        var skinsEnum;
        if (this.skeletonData) {
            skinsEnum = this.skeletonData.getSkinsEnum();
        }
        if (!skinsEnum) {
            errorID(7501, this.name);
        }
        
        var skinName = value == -1 ? "default" : skinsEnum[value];
        if (skinName !== undefined) {
            this.defaultSkin = skinName;
            this.setSkin(this.defaultSkin);
            if (EDITOR /*&& !cc.engine.isPlaying*/) {
                this._refreshInspector();
            }
        }
        else {
            errorID(7501, this.name);
        }
    }

    // value of 0 represents no animation

    @displayName('Animation')
    @type(DefaultAnimsEnum)
    @tooltip('i18n:COMPONENT.skeleton.animation')
    get _animationIndex () {
        var animationName = (!EDITOR /*|| engine.isPlaying*/) ? this.animation : this.defaultAnimation;
        if (this.skeletonData && animationName) {
            var animsEnum = this.skeletonData.getAnimsEnum();
            if (animsEnum) {
                var animIndex = animsEnum[animationName];
                if (animIndex !== undefined) {
                    return animIndex;
                }
            }
        }
        return 0;
    }
    set _animationIndex (value: number) {
        if (value === 0) {
            this.animation = '';
            return;
        }
        var animsEnum;
        if (this.skeletonData) {
            animsEnum = this.skeletonData.getAnimsEnum();
        }
        if (!animsEnum) {
            errorID(7502, this.name);
            return;
        }
        var animName = animsEnum[value];
        if (animName !== undefined) {
            this.animation = animName;
        }
        else {
            errorID(7503, this.name);
        }

    }

    // Record pre cache mode.
    _preCacheMode: number = -1;
    _cacheMode = AnimationCacheMode.REALTIME;
    @displayName('Animation Cache Mode')
    @tooltip('i18n:COMPONENT.skeleton.animation_cache_mode')
    @editable
    get defaultCacheMode () {
        return this._defaultCacheMode;
    }
    set defaultCacheMode (mode: AnimationCacheMode) {
        this._defaultCacheMode = mode;
        this.setAnimationCacheMode(this._defaultCacheMode);
    }
    @serializable
    private _defaultCacheMode: AnimationCacheMode = AnimationCacheMode.REALTIME;

    /**
     * !#en TODO
     * !#zh 是否循环播放当前骨骼动画。
     */
    @serializable
    @tooltip('i18n:COMPONENT.skeleton.loop')
    loop = true;

    /**
     * !#en Indicates whether to enable premultiplied alpha.
     * You should disable this option when image's transparent area appears to have opaque pixels,
     * or enable this option when image's half transparent area appears to be darken.
     * !#zh 是否启用贴图预乘。
     * 当图片的透明区域出现色块时需要关闭该选项，当图片的半透明区域颜色变黑时需要启用该选项。
     */
    @serializable
    @tooltip('i18n:COMPONENT.skeleton.premultipliedAlpha')
    @editable
    premultipliedAlpha: boolean = true;

    /**
     * !#en The time scale of this skeleton.
     * !#zh 当前骨骼中所有动画的时间缩放率。
     */
    @serializable
    @tooltip('i18n:COMPONENT.skeleton.time_scale')
    @editable
    timeScale: number = 1;

    /**
     * !#en Indicates whether open debug slots.
     * !#zh 是否显示 slot 的 debug 信息。
     */
    @editable
    @tooltip('i18n:COMPONENT.skeleton.debug_slots')
    get debugSlots () { return this._debugSlots; }
    set debugSlots (v: boolean) {
        if (v != this._debugSlots) {
            this._debugSlots = v;
            this._updateDebugDraw();
            this.markForUpdateRenderData();
        }
    }
    @serializable
    private _debugSlots: boolean = false;

    /**
     * !#en Indicates whether open debug bones.
     * !#zh 是否显示 bone 的 debug 信息。
     */
    @editable
    @tooltip('i18n:COMPONENT.skeleton.debug_bones')
    get debugBones () { return this._debugBones; }
    set debugBones (v: boolean) {
        if (v != this._debugBones) {
            this._debugBones = v;
            this._updateDebugDraw();
            this.markForUpdateRenderData();
        }
    }
    @serializable
    private _debugBones: boolean = false;

    /**
     * !#en Indicates whether open debug mesh.
     * !#zh 是否显示 mesh 的 debug 信息。
     */
    @editable
    @tooltip('i18n:COMPONENT.skeleton.debug_mesh')
    get debugMesh () { return this._debugMesh; }
    set debugMesh (value) {
        if (value != this._debugMesh) {
            this._debugMesh = value;
            this._updateDebugDraw();
            this.markForUpdateRenderData();
        }
    }
    @serializable
    private _debugMesh: boolean = false;


    /**
     * !#en Enabled two color tint.
     * !#zh 是否启用染色效果。
     */
    @editable
    @tooltip('i18n:COMPONENT.skeleton.use_tint')
    get useTint () { return this._useTint; }
    set useTint (value) {
        if (value != this._useTint) {
            this._useTint = value;
            this._updateUseTint()
            this.markForUpdateRenderData();
        }
    }

    @serializable
    private _useTint: boolean = false;
    /**
     * !#en Enabled batch model, if skeleton is complex, do not enable batch, or will lower performance.
     * !#zh 开启合批，如果渲染大量相同纹理，且结构简单的骨骼动画，开启合批可以降低drawcall，否则请不要开启，cpu消耗会上升。
     */
    @tooltip('i18n:COMPONENT.skeleton.enabled_batch')
    get enableBatch () { return this._enableBatch; }
    set enableBatch (value) {
        if (value != this._enableBatch) {
            this._enableBatch = value;
            this._updateBatch();
        }
    }

    @serializable
    private _enableBatch: boolean = true;

    // Below properties will effect when cache mode is SHARED_CACHE or PRIVATE_CACHE.
    // accumulate time
    _accTime = 0;
    // Play times counter
    _playCount = 0;
    // Frame cache
    _frameCache: AnimationCache | null = null;
    // Cur frame
    _curFrame: AnimationFrame | null = null;
    // Skeleton cache
    _skeletonCache: SkeletonCache | null = null;
    // Aimation name
    _animationName: string = "";
    // Animation queue
    _animationQueue: AnimationItem[] = [];
    // Head animation info of 
    _headAniInfo: AnimationItem | null = null;
    // Play times
    _playTimes = 0;
    // Is animation complete.
    _isAniComplete = true;


    public _effectDelegate:VertexEffectDelegate|null = null;
    public _skeleton: spine.Skeleton | null;
    public _clipper?: spine.SkeletonClipping;
    protected _rootBone: spine.Bone | null;
    protected _state?: spine.AnimationState;
    protected _listener: spine.AnimationStateListener | null;
    // protected _materialCache = {};
    public _debugRenderer: Graphics | null;
    public _startSlotIndex;
    public _endSlotIndex;
    public _startEntry;
    public _endEntry;
    attachUtil: AttachUtil;

    // CONSTRUCTOR
    constructor () {
        super();
        this._effectDelegate = null;
        this._skeleton = null;
        this._rootBone = null;
        this._listener = null;
        // this._materialCache = {};
        this._debugRenderer = null;
        this._startSlotIndex = -1;
        this._endSlotIndex = -1;
        this._startEntry = { animation: { name: "" }, trackIndex: 0 } as any;
        this._endEntry = { animation: { name: "" }, trackIndex: 0 } as any;
        this.attachUtil = new AttachUtil();
    }


    // override base class disableRender to clear post render flag
    disableRender () {
        // this._super();
        // this.node._renderFlag &= ~FLAG_POST_RENDER;
    }

    // override base class disableRender to add post render flag
    markForRender () {
        // this._super(enable);
        // if (enable) {
        //     this.node._renderFlag |= FLAG_POST_RENDER;
        // } else {
        //     this.node._renderFlag &= ~FLAG_POST_RENDER;
        // }
    }

    // if change use tint mode, just clear material cache
    _updateUseTint () {
        this.spineMatrialType = SpineMaterialType.COLORED_TEXTURED;
    }

    protected _spineMatrialType = SpineMaterialType.COLORED_TEXTURED;

    public set spineMatrialType(type: SpineMaterialType) {
        if(type != this._spineMatrialType) {
            this._spineMatrialType = type;
            this.updateMaterial();
            this._updateBlendFunc();
        }
    }

    public _updateBuiltinMaterial():Material {
        // not need _uiMaterialDirty at firstTime
        let mat;
        switch (this._spineMatrialType) {
            case SpineMaterialType.COLORED:
                mat = builtinResMgr.get('ui-base-material') as Material;
                break;
            case SpineMaterialType.TWO_COLORED:
                mat = builtinResMgr.get('ui-spine-two-colored-material') as Material;
                break;
            case SpineMaterialType.COLORED_TEXTURED:
            default:
                mat = builtinResMgr.get('ui-sprite-material') as Material;
                break;
        }
        return mat;
    }

    // if change use batch mode, just clear material cache
    _updateBatch () {
        // let baseMaterial = this.getMaterial(0);
        // if (baseMaterial) {
        //     baseMaterial.define('CC_USE_MODEL', !this.enableBatch);
        // }
        // this._materialCache = {};
        this.markForUpdateRenderData();
    }

    _validateRender () {
        let skeletonData = this.skeletonData;
        if (!skeletonData || !skeletonData.isTexturesLoaded()) {
            this.disableRender();
            return;
        }
    }

    /**
     * !#en
     * Sets runtime skeleton data to sp.Skeleton.<br>
     * This method is different from the `skeletonData` property. This method is passed in the raw data provided by the Spine runtime, and the skeletonData type is the asset type provided by Creator.
     * !#zh
     * 设置底层运行时用到的 SkeletonData。<br>
     * 这个接口有别于 `skeletonData` 属性，这个接口传入的是 Spine runtime 提供的原始数据，而 skeletonData 的类型是 Creator 提供的资源类型。
     * @method setSkeletonData
     * @param {sp.spine.SkeletonData} skeletonData
     */
    setSkeletonData (skeletonData: spine.SkeletonData) {
        let uiTrans = this.node._uiProps.uiTransformComp!;
        if (skeletonData.width != null && skeletonData.height != null) {
            uiTrans.setContentSize(skeletonData.width, skeletonData.height);
        }

        if (!EDITOR) {
            if (this._cacheMode === AnimationCacheMode.SHARED_CACHE) {
                this._skeletonCache = SkeletonCache.sharedCache;
            } else if (this._cacheMode === AnimationCacheMode.PRIVATE_CACHE) {
                this._skeletonCache = new SkeletonCache;
                this._skeletonCache.enablePrivateMode();
            }
        }

        if (this.isAnimationCached()) {
            if (this.debugBones || this.debugSlots) {
                warn("Debug bones or slots is invalid in cached mode");
            }
            let skeletonInfo = this._skeletonCache!.getSkeletonCache((this.skeletonData as any)._uuid, skeletonData);
            this._skeleton = skeletonInfo.skeleton;
            this._clipper = skeletonInfo.clipper;
            this._rootBone = this._skeleton.getRootBone();
        } else {
            this._skeleton = new spine.Skeleton(skeletonData);
            this._clipper = new spine.SkeletonClipping();
            this._rootBone = this._skeleton.getRootBone();
        }

        this.markForRender();
    }

    /**
     * !#en Sets slots visible range.
     * !#zh 设置骨骼插槽可视范围。
     */
    setSlotsRange (startSlotIndex, endSlotIndex) {
        if (this.isAnimationCached()) {
            warn("Slots visible range can not be modified in cached mode.");
        } else {
            this._startSlotIndex = startSlotIndex;
            this._endSlotIndex = endSlotIndex;
        }
    }

    /**
     * !#en Sets animation state data.<br>
     * The parameter type is {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.AnimationStateData.
     * !#zh 设置动画状态数据。<br>
     * 参数是 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.AnimationStateData。
     */
    setAnimationStateData (stateData) {
        if (this.isAnimationCached()) {
            warn("'setAnimationStateData' interface can not be invoked in cached mode.");
        } else {
            var state = new spine.AnimationState(stateData);
            if (this._listener) {
                if (this._state) {
                    this._state.removeListener(this._listener);
                }
                state.addListener(this._listener);
            }
            this._state = state;
        }

    }


    // IMPLEMENT
    __preload () {
        super.__preload();
        // if (EDITOR) {
        //     var Flags = CCObject.Flags;
        //     this._objFlags |= (Flags.IsAnchorLocked | Flags.IsSizeLocked);
        //     this._refreshInspector();
        // }

        var children = this.node.children;
        for (var i = 0, n = children.length; i < n; i++) {
            var child = children[i];
            if (child && child.name === "DEBUG_DRAW_NODE") {
                child.destroy();
            }
        }

        this._updateSkeletonData();
        this._updateDebugDraw();
        this._updateUseTint();
        // this._updateBatch();
    }

    /**
     * !#en
     * It's best to set cache mode before set property 'dragonAsset', or will waste some cpu time.
     * If set the mode in editor, then no need to worry about order problem.
     * !#zh 
     * 若想切换渲染模式，最好在设置'dragonAsset'之前，先设置好渲染模式，否则有运行时开销。
     * 若在编辑中设置渲染模式，则无需担心设置次序的问题。
     * 
     * @example
     * skeleton.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.SHARED_CACHE);
     */
    setAnimationCacheMode (cacheMode: AnimationCacheMode) {
        if (this._preCacheMode !== cacheMode) {
            this._cacheMode = cacheMode;
            this._updateSkeletonData();
            this._updateUseTint();
            this.markForUpdateRenderData();
        }
    }

    /**
     * !#en Whether in cached mode.
     * !#zh 当前是否处于缓存模式。
     */
    isAnimationCached () {
        if (EDITOR) return false;
        return this._cacheMode !== AnimationCacheMode.REALTIME;
    }

    update (dt: number) {
        if (EDITOR) return;
        if (this.paused) return;

        dt *= this.timeScale * timeScale;

        if (this.isAnimationCached()) {

            // Cache mode and has animation queue.
            if (this._isAniComplete) {
                if (this._animationQueue.length === 0 && !this._headAniInfo) {
                    let frameCache = this._frameCache;
                    if (frameCache && frameCache.isInvalid()) {
                        frameCache.updateToFrame();
                        let frames = frameCache.frames;
                        this._curFrame = frames[frames.length - 1];
                    }
                    return;
                }
                if (!this._headAniInfo) {
                    this._headAniInfo = this._animationQueue.shift()!;
                }
                this._accTime += dt;
                if (this._accTime > this._headAniInfo.delay) {
                    let aniInfo = this._headAniInfo;
                    this._headAniInfo = null;
                    this.setAnimation(0, aniInfo.animationName, aniInfo.loop);
                }
                return;
            }

            this._updateCache(dt);
        } else {
            this._updateRealtime(dt);
        }
    }

    _emitCacheCompleteEvent () {
        if (!this._listener) return;
        this._endEntry.animation.name = this._animationName;
        this._listener.complete && this._listener.complete(this._endEntry);
        this._listener.end && this._listener.end(this._endEntry);
    }

    _updateCache (dt: number) {
        let frameCache = this._frameCache!;
        if (!frameCache.isInited()) {
            return;
        }
        let frames = frameCache.frames;
        let frameTime = SkeletonCache.FrameTime;

        // Animation Start, the event diffrent from dragonbones inner event,
        // It has no event object.
        if (this._accTime == 0 && this._playCount == 0) {
            this._startEntry.animation.name = this._animationName;
            this._listener && this._listener.start && this._listener.start(this._startEntry);
        }

        this._accTime += dt;
        let frameIdx = Math.floor(this._accTime / frameTime);
        if (!frameCache.isCompleted) {
            frameCache.updateToFrame(frameIdx);
        }

        if (frameCache.isCompleted && frameIdx >= frames.length) {
            this._playCount++;
            if (this._playTimes > 0 && this._playCount >= this._playTimes) {
                // set frame to end frame.
                this._curFrame = frames[frames.length - 1];
                this._accTime = 0;
                this._playCount = 0;
                this._isAniComplete = true;
                this._emitCacheCompleteEvent();
                return;
            }
            this._accTime = 0;
            frameIdx = 0;
            this._emitCacheCompleteEvent();
        }
        this._curFrame = frames[frameIdx];
    }

    _updateRealtime (dt:number) {
        let skeleton = this._skeleton;
        let state = this._state;
        if (skeleton) {
            skeleton.update(dt);
            if (state) {
                state.update(dt);
                state.apply(skeleton);
            }
        }
    }

    /**
     * !#en Sets vertex effect delegate.
     * !#zh 设置顶点动画代理
     */
    setVertexEffectDelegate (effectDelegate:VertexEffectDelegate) {
        this._effectDelegate = effectDelegate;
    }

    // RENDERER

    /**
     * !#en Computes the world SRT from the local SRT for each bone.
     * !#zh 重新更新所有骨骼的世界 Transform，
     * 当获取 bone 的数值未更新时，即可使用该函数进行更新数值。
     * @method updateWorldTransform
     * @example
     * var bone = spine.findBone('head');
     * cc.log(bone.worldX); // return 0;
     * spine.updateWorldTransform();
     * bone = spine.findBone('head');
     * cc.log(bone.worldX); // return -23.12;
     */
    updateWorldTransform () {
        if (!this.isAnimationCached()) return;

        if (this._skeleton) {
            this._skeleton.updateWorldTransform();
        }
    }

    /**
     * !#en Sets the bones and slots to the setup pose.
     * !#zh 还原到起始动作
     * @method setToSetupPose
     */
    setToSetupPose () {
        if (this._skeleton) {
            this._skeleton.setToSetupPose();
        }
    }

    /**
     * !#en
     * Sets the bones to the setup pose,
     * using the values from the `BoneData` list in the `SkeletonData`.
     * !#zh
     * 设置 bone 到起始动作
     * 使用 SkeletonData 中的 BoneData 列表中的值。
     * @method setBonesToSetupPose
     */
    setBonesToSetupPose () {
        if (this._skeleton) {
            this._skeleton.setBonesToSetupPose();
        }
    }

    /**
     * !#en
     * Sets the slots to the setup pose,
     * using the values from the `SlotData` list in the `SkeletonData`.
     * !#zh
     * 设置 slot 到起始动作。
     * 使用 SkeletonData 中的 SlotData 列表中的值。
     * @method setSlotsToSetupPose
     */
    setSlotsToSetupPose () {
        if (this._skeleton) {
            this._skeleton.setSlotsToSetupPose();
        }
    }

    /**
     * !#en
     * Updating an animation cache to calculate all frame data in the animation is a cost in 
     * performance due to calculating all data in a single frame.
     * To update the cache, use the invalidAnimationCache method with high performance.
     * !#zh
     * 更新某个动画缓存, 预计算动画中所有帧数据，由于在单帧计算所有数据，所以较消耗性能。
     * 若想更新缓存，可使用 invalidAnimationCache 方法，具有较高性能。
     * @method updateAnimationCache
     * @param {String} animName
     */
    updateAnimationCache (animName) {
        if (!this.isAnimationCached()) return;
        let uuid = this._skeletonData!._uuid;
        if (this._skeletonCache) {
            this._skeletonCache.updateAnimationCache(uuid, animName);
        }
    }

    /**
     * !#en
     * Invalidates the animation cache, which is then recomputed on each frame..
     * !#zh
     * 使动画缓存失效，之后会在每帧重新计算。
     * @method invalidAnimationCache
     */
    invalidAnimationCache () {
        if (!this.isAnimationCached()) return;
        if (this._skeletonCache) {
            this._skeletonCache.invalidAnimationCache(this._skeletonData!._uuid);
        }
    }

    /**
     * !#en
     * Finds a bone by name.
     * This does a string comparison for every bone.<br>
     * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Bone object.
     * !#zh
     * 通过名称查找 bone。
     * 这里对每个 bone 的名称进行了对比。<br>
     * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Bone 对象。
     *
     * @method findBone
     * @param {String} boneName
     * @return {sp.spine.Bone}
     */
    findBone (boneName:string) {
        if (this._skeleton) {
            return this._skeleton.findBone(boneName);
        }
        return null;
    }

    /**
     * !#en
     * Finds a slot by name. This does a string comparison for every slot.<br>
     * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Slot object.
     * !#zh
     * 通过名称查找 slot。这里对每个 slot 的名称进行了比较。<br>
     * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Slot 对象。
     *
     * @method findSlot
     * @param {String} slotName
     * @return {sp.spine.Slot}
     */
    findSlot (slotName:string) {
        if (this._skeleton) {
            return this._skeleton.findSlot(slotName);
        }
        return null;
    }

    /**
     * !#en
     * Finds a skin by name and makes it the active skin.
     * This does a string comparison for every skin.<br>
     * Note that setting the skin does not change which attachments are visible.<br>
     * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Skin object.
     * !#zh
     * 按名称查找皮肤，激活该皮肤。这里对每个皮肤的名称进行了比较。<br>
     * 注意：设置皮肤不会改变 attachment 的可见性。<br>
     * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Skin 对象。
     *
     * @method setSkin
     * @param {String} skinName
     */
    setSkin (skinName:string) {
        if (this._skeleton) {
            this._skeleton.setSkinByName(skinName);
            this._skeleton.setSlotsToSetupPose();
        }
        this.invalidAnimationCache();
    }

    /**
     * !#en
     * Returns the attachment for the slot and attachment name.
     * The skeleton looks first in its skin, then in the skeleton data’s default skin.<br>
     * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Attachment object.
     * !#zh
     * 通过 slot 和 attachment 的名称获取 attachment。Skeleton 优先查找它的皮肤，然后才是 Skeleton Data 中默认的皮肤。<br>
     * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Attachment 对象。
     *
     * @method getAttachment
     * @param {String} slotName
     * @param {String} attachmentName
     * @return {sp.spine.Attachment}
     */
    getAttachment (slotName:string, attachmentName:string) {
        if (this._skeleton) {
            return this._skeleton.getAttachmentByName(slotName, attachmentName);
        }
        return null;
    }

    /**
     * !#en
     * Sets the attachment for the slot and attachment name.
     * The skeleton looks first in its skin, then in the skeleton data’s default skin.
     * !#zh
     * 通过 slot 和 attachment 的名字来设置 attachment。
     * Skeleton 优先查找它的皮肤，然后才是 Skeleton Data 中默认的皮肤。
     * @method setAttachment
     * @param {String} slotName
     * @param {String} attachmentName
     */
    setAttachment (slotName:string, attachmentName:string) {
        if (this._skeleton) {
            this._skeleton.setAttachment(slotName, attachmentName);
        }
        this.invalidAnimationCache();
    }

    /**
    * Return the renderer of attachment.
    * @method getTextureAtlas
    * @param {sp.spine.RegionAttachment|spine.BoundingBoxAttachment} regionAttachment
    * @return {sp.spine.TextureAtlasRegion}
    */
    getTextureAtlas (regionAttachment: spine.RegionAttachment | spine.BoundingBoxAttachment) {
        return (regionAttachment as spine.RegionAttachment).region;
    }

    // ANIMATION
    /**
     * !#en
     * Mix applies all keyframe values,
     * interpolated for the specified time and mixed with the current values.
     * !#zh 为所有关键帧设定混合及混合时间（从当前值开始差值）。
     * @method setMix
     * @param {String} fromAnimation
     * @param {String} toAnimation
     * @param {Number} duration
     */
    setMix (fromAnimation: string, toAnimation: string, duration: number): void {
        if (this._state) {
            this._state.data.setMix(fromAnimation, toAnimation, duration);
        }
    }

    /**
     * !#en Set the current animation. Any queued animations are cleared.<br>
     * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry object.
     * !#zh 设置当前动画。队列中的任何的动画将被清除。<br>
     * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry 对象。
     * @method setAnimation
     * @param {Number} trackIndex
     * @param {String} name
     * @param {Boolean} loop
     * @return {sp.spine.TrackEntry}
     */
    setAnimation (trackIndex: number, name: string, loop: boolean) {

        this._playTimes = loop ? 0 : 1;
        this._animationName = name;

        if (this.isAnimationCached()) {
            if (trackIndex !== 0) {
                warn("Track index can not greater than 0 in cached mode.");
            }
            if (!this._skeletonCache) return null;
            let cache = this._skeletonCache.getAnimationCache(this._skeletonData!._uuid, name);
            if (!cache) {
                cache = this._skeletonCache.initAnimationCache(this._skeletonData!._uuid, name);
            }
            if (cache) {
                this._isAniComplete = false;
                this._accTime = 0;
                this._playCount = 0;
                this._frameCache = cache;
                if (this.attachUtil._hasAttachedNode()) {
                    this._frameCache.enableCacheAttachedInfo();
                }
                this._frameCache.updateToFrame(0);
                this._curFrame = this._frameCache.frames[0];
            }
        } else {
            if (this._skeleton) {
                var animation = this._skeleton.data.findAnimation(name);
                if (!animation) {
                    logID(7509, name);
                    return null;
                }
                var res = this._state!.setAnimationWith(trackIndex, animation, loop);
                this._state!.apply(this._skeleton);
                return res;
            }
        }
        return null;
    }

    /**
     * !#en Adds an animation to be played delay seconds after the current or last queued animation.<br>
     * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry object.
     * !#zh 添加一个动画到动画队列尾部，还可以延迟指定的秒数。<br>
     * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry 对象。
     * @method addAnimation
     * @param {Number} trackIndex
     * @param {String} name
     * @param {Boolean} loop
     * @param {Number} [delay=0]
     * @return {sp.spine.TrackEntry}
     */
    addAnimation (trackIndex: number, name: string, loop: boolean, delay?: number) {
        delay = delay || 0;
        if (this.isAnimationCached()) {
            if (trackIndex !== 0) {
                warn("Track index can not greater than 0 in cached mode.");
            }
            this._animationQueue.push({ animationName: name, loop: loop, delay: delay });
        } else {
            if (this._skeleton) {
                var animation = this._skeleton.data.findAnimation(name);
                if (!animation) {
                    logID(7510, name);
                    return null;
                }
                return this._state?.addAnimationWith(trackIndex, animation, loop, delay);
            }
        }
        return null;
    }

    /**
     * !#en Find animation with specified name.
     * !#zh 查找指定名称的动画
     * @method findAnimation
     * @param {String} name
     * @returns {sp.spine.Animation}
     */
    findAnimation (name: string) {
        if (this._skeleton) {
            return this._skeleton.data.findAnimation(name);
        }
        return null;
    }

    /**
     * !#en Returns track entry by trackIndex.<br>
     * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry object.
     * !#zh 通过 track 索引获取 TrackEntry。<br>
     * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry 对象。
     * @method getCurrent
     * @param trackIndex
     * @return {sp.spine.TrackEntry}
     */
    getCurrent (trackIndex: number) {
        if (this.isAnimationCached()) {
            warn("'getCurrent' interface can not be invoked in cached mode.");
        } else {
            if (this._state) {
                return this._state.getCurrent(trackIndex);
            }
        }
        return null;
    }

    /**
     * !#en Clears all tracks of animation state.
     * !#zh 清除所有 track 的动画状态。
     * @method clearTracks
     */
    clearTracks () {
        if (this.isAnimationCached()) {
            warn("'clearTracks' interface can not be invoked in cached mode.");
        } else {
            if (this._state) {
                this._state.clearTracks();
            }
        }
    }

    /**
     * !#en Clears track of animation state by trackIndex.
     * !#zh 清除出指定 track 的动画状态。
     * @method clearTrack
     * @param {number} trackIndex
     */
    clearTrack (trackIndex: number) {
        if (this.isAnimationCached()) {
            warn("'clearTrack' interface can not be invoked in cached mode.");
        } else {
            if (this._state) {
                this._state.clearTrack(trackIndex);
                if (EDITOR/* && !cc.engine.isPlaying*/) {
                    this._state.update(0);
                }
            }
        }
    }

    /**
     * !#en Set the start event listener.
     * !#zh 用来设置开始播放动画的事件监听。
     * @method setStartListener
     * @param {function} listener
     */
    setStartListener (listener: TrackListener) {
        this._ensureListener();
        this._listener!.start = listener;
    }

    /**
     * !#en Set the interrupt event listener.
     * !#zh 用来设置动画被打断的事件监听。
     * @method setInterruptListener
     * @param {function} listener
     */
    setInterruptListener (listener: TrackListener) {
        this._ensureListener();
        this._listener!.interrupt = listener;
    }

    /**
     * !#en Set the end event listener.
     * !#zh 用来设置动画播放完后的事件监听。
     * @method setEndListener
     * @param {function} listener
     */
    setEndListener (listener: TrackListener) {
        this._ensureListener();
        this._listener!.end = listener;
    }

    /**
     * !#en Set the dispose event listener.
     * !#zh 用来设置动画将被销毁的事件监听。
     * @method setDisposeListener
     * @param {function} listener
     */
    setDisposeListener (listener: TrackListener) {
        this._ensureListener();
        this._listener!.dispose = listener;
    }

    /**
     * !#en Set the complete event listener.
     * !#zh 用来设置动画播放一次循环结束后的事件监听。
     * @method setCompleteListener
     * @param {function} listener
     */
    setCompleteListener (listener: TrackListener) {
        this._ensureListener();
        this._listener!.complete = listener;
    }

    /**
     * !#en Set the animation event listener.
     * !#zh 用来设置动画播放过程中帧事件的监听。
     * @method setEventListener
     * @param {function} listener
     */
    setEventListener (listener: TrackListener) {
        this._ensureListener();
        this._listener!.event = listener;
    }

    /**
     * !#en Set the start event listener for specified TrackEntry.
     * !#zh 用来为指定的 TrackEntry 设置动画开始播放的事件监听。
     * @method setTrackStartListener
     * @param {sp.spine.TrackEntry} entry
     * @param {function} listener
     */
    setTrackStartListener (entry: spine.TrackEntry, listener: TrackListener) {
        TrackEntryListeners.getListeners(entry).start = listener;
    }

    /**
     * !#en Set the interrupt event listener for specified TrackEntry.
     * !#zh 用来为指定的 TrackEntry 设置动画被打断的事件监听。
     * @method setTrackInterruptListener
     * @param {sp.spine.TrackEntry} entry
     * @param {function} listener
     */
    setTrackInterruptListener (entry: spine.TrackEntry, listener: TrackListener) {
        TrackEntryListeners.getListeners(entry).interrupt = listener;
    }

    /**
     * !#en Set the end event listener for specified TrackEntry.
     * !#zh 用来为指定的 TrackEntry 设置动画播放结束的事件监听。
     * @method setTrackEndListener
     * @param {sp.spine.TrackEntry} entry
     * @param {function} listener
     */
    setTrackEndListener (entry: spine.TrackEntry, listener: TrackListener) {
        TrackEntryListeners.getListeners(entry).end = listener;
    }

    /**
     * !#en Set the dispose event listener for specified TrackEntry.
     * !#zh 用来为指定的 TrackEntry 设置动画即将被销毁的事件监听。
     * @method setTrackDisposeListener
     * @param {sp.spine.TrackEntry} entry
     * @param {function} listener
     */
    setTrackDisposeListener (entry: spine.TrackEntry, listener: TrackListener) {
        TrackEntryListeners.getListeners(entry).dispose = listener;
    }

    /**
     * !#en Set the complete event listener for specified TrackEntry.
     * !#zh 用来为指定的 TrackEntry 设置动画一次循环播放结束的事件监听。
     * @method setTrackCompleteListener
     * @param {sp.spine.TrackEntry} entry
     * @param {function} listener
     * @param {sp.spine.TrackEntry} listener.entry
     * @param {Number} listener.loopCount
     */
    setTrackCompleteListener (entry: spine.TrackEntry, listener: TrackListener2) {
        TrackEntryListeners.getListeners(entry).complete = function (trackEntry) {
            var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
            listener(trackEntry, loopCount);
        };
    }

    /**
     * !#en Set the event listener for specified TrackEntry.
     * !#zh 用来为指定的 TrackEntry 设置动画帧事件的监听。
     * @method setTrackEventListener
     * @param {sp.spine.TrackEntry} entry
     * @param {function} listener
     */
    setTrackEventListener (entry: spine.TrackEntry, listener: TrackListener) {
        TrackEntryListeners.getListeners(entry).event = listener;
    }

    /**
     * !#en Get the animation state object
     * !#zh 获取动画状态
     * @method getState
     * @return {sp.spine.AnimationState} state
     */
    getState () {
        return this._state;
    }

    // update animation list for editor
    _updateAnimEnum () {
        var animEnum;
        if (this.skeletonData) {
            animEnum = this.skeletonData.getAnimsEnum();
        }
        // change enum
        setEnumAttr(this, '_animationIndex', animEnum || DefaultAnimsEnum);
    }
    // update skin list for editor
    _updateSkinEnum () {
        var skinEnum;
        if (this.skeletonData) {
            skinEnum = this.skeletonData.getSkinsEnum();
        }
        // change enum
        setEnumAttr(this, '_defaultSkinIndex', skinEnum || DefaultSkinsEnum);
    }

    _ensureListener () {
        if (!this._listener) {
            this._listener = (new TrackEntryListeners()) as any;
            if (this._state) {
                this._state!.addListener(this._listener as any);
            }
        }
    }

    _updateSkeletonData () {
        if (!this.skeletonData) {
            this.disableRender();
            return;
        }

        let data = this.skeletonData.getRuntimeData();
        if (!data) {
            this.disableRender();
            return;
        }

        try {
            this.setSkeletonData(data);
            if (!this.isAnimationCached()) {
                this.setAnimationStateData(new spine.AnimationStateData(this._skeleton!.data));
            }
            this.defaultSkin && this.setSkin(this.defaultSkin);
        }
        catch (e) {
            warn(e);
        }

        this.attachUtil.init(this);
        this.attachUtil._associateAttachedNode();
        this._preCacheMode = this._cacheMode;
        this.animation = this.defaultAnimation;
    }


    _refreshInspector () {
        // update inspector
        this._updateAnimEnum();
        this._updateSkinEnum();
        //TODO: refresh inspector
        // Editor.Utils.refreshSelectedInspector('node', this.node.uuid);
    }

    _updateDebugDraw () {
        if (this.debugBones || this.debugSlots) {
            if (!this._debugRenderer) {
                let debugDrawNode = new PrivateNode("DEBUG_DRAW_NODE");
                let debugDraw = debugDrawNode.addComponent(Graphics);
                debugDraw.lineWidth = 1;
                debugDraw.strokeColor = new Color(255, 0, 0, 255);

                this._debugRenderer = debugDraw;
            }

            this._debugRenderer!.node.parent = this.node;
            if (this.isAnimationCached()) {
                warn("Debug bones or slots is invalid in cached mode");
            }
        }
        else if (this._debugRenderer) {
            this._debugRenderer.node.parent = null;
        }
    }

    public onEnable () {
        super.onEnable();
        this._flushAssembler();
    }

    public onDestroy() {
        this.destroyRenderData();
        super.onDestroy();
    }

    public requestMeshRenderData (vertexFloatCnt:number) {

        if(this._meshRenderDataArray.length > 0 && this._meshRenderDataArray[this._meshRenderDataArray.length - 1].renderData.vertexStart == 0) {
            return this._meshRenderDataArray[this._meshRenderDataArray.length - 1];
        }

        const renderData = new MeshRenderData(vertexFloatCnt);
        const comb: SkeletonMeshData = { renderData };
        renderData.material = null;
        this._meshRenderDataArray.push(comb);
        return comb;
    }

    public destroyRenderData () {
        if (this._meshRenderDataArray.length > 0) {
            this._meshRenderDataArray.forEach((rd) => { rd.renderData.reset(); });
            this._meshRenderDataArray.length = 0;
        }
    }

    public resetRenderData () {
        if (this._meshRenderDataArray.length > 0) {
            this._meshRenderDataArray.forEach((rd) => { rd.renderData.reset();});
        }
    }

    protected _flushAssembler () {
        const assembler = Skeleton.Assembler!.getAssembler(this);
        if (this._assembler !== assembler) {
            this._assembler = assembler;
        }
        if (this._meshRenderDataArray.length == 0) {
            if (this._assembler && this._assembler.createData) {
                this._assembler.createData(this);
                this.markForUpdateRenderData();
                this._updateColor();
            }
        }
    }

    // 当前的 _meshRenderDataArray 的索引, 以便 fillBuffers 选取 RenderData
    public _meshRenderDataArrayIdx: number = 0;
    protected _render (ui: UI) {
        if (this._meshRenderDataArray) {
            for (let i = 0; i < this._meshRenderDataArray.length; i++) {
                this._meshRenderDataArrayIdx = i;
                const m = this._meshRenderDataArray[i];
                if (m.texture) {
                    // NOTE: 由于 commitComp 只支持单张纹理, 故分多次提交
                    ui.commitComp(this, m.texture!, this._assembler);
                }
            }
            this.node._static = true;
        }
    }
}