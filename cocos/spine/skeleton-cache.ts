/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

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
import { Color, CubicSplineNumberValue, Texture2D } from '../../cocos/core';
import { number } from 'yargs';
import { NavigationPlugin } from 'typedoc';
// Permit max cache time, unit is second.
const MaxCacheTime = 30;
const FrameTime = 1 / 60;

const _vertices: number[] = [];
const _indices: number[] = [];
let _boneInfoOffset = 0;
let _vertexOffset = 0;
let _indexOffset = 0;
let _vfOffset = 0;
let _preTexUrl: string|null = null;
let _preBlendMode: spine.BlendMode | null = null;
let _segVCount = 0;
let _segICount = 0;
let _segOffset = 0;
let _colorOffset = 0;
let _preFinalColor: number | null = null;
let _preDarkColor: number | null = null;
// x y u v c1 c2
const _perVertexSize = 6;
// x y u v r1 g1 b1 a1 r2 g2 b2 a2
const _perClipVertexSize = 12;
let _vfCount = 0;
let _indexCount = 0;
let _tempr: number;
let _tempg: number;
let _tempb: number;
let _tempa: number;
let _finalColor32: number;
let _darkColor32: number;
const _finalColor = new spine.Color(1, 1, 1, 1);
const _darkColor = new spine.Color(1, 1, 1, 1);
const _quadTriangles = [0, 1, 2, 2, 3, 0];


export interface SkeletonCacheItemInfo {
    skeleton: spine.Skeleton;
    clipper: spine.SkeletonClipping;
    state: spine.AnimationState
    listener: TrackEntryListeners;
    curAnimationCache: AnimationCache | null;
    animationsCache: { [key: string]: AnimationCache };
}

export interface FrameColor {
    fr: number;
    fg: number;
    fb: number;
    fa: number;
    dr: number;
    dg: number;
    db: number;
    da: number;
    vfOffset: number;
}

export interface FrameSegment {
    indexCount: number;
    vfCount: number;
    vertexCount: number;
    tex?:Texture2D;
    blendMode?: spine.BlendMode;
}

export interface FrameBoneInfo {
    a: number;
    b: number;
    c: number;
    d: number;
    worldX: number;
    worldY: number;
}

export interface AnimationFrame {
    segments: FrameSegment[];
    colors: FrameColor[];
    boneInfos: FrameBoneInfo[];
    vertices: Float32Array;
    uintVert: Uint32Array;
    indices: Uint16Array;
}


// Cache all frames in an animation
export class AnimationCache {
    _privateMode = false;
    _inited = false;
    _invalid = true;
    _enableCacheAttachedInfo = false;
    frames: AnimationFrame[] = [];
    totalTime = 0;
    _frameIdx = -1;
    isCompleted = false;

    _skeletonInfo: SkeletonCacheItemInfo | null = null;
    _animationName: string | null = null;
    _tempSegments: FrameSegment[] | null = null;
    _tempColors: FrameColor[] | null = null;
    _tempBoneInfos: FrameBoneInfo[] | null = null;
    constructor () {
        this._privateMode = false;
        this._inited = false;
        this._invalid = true;
        this._enableCacheAttachedInfo = false;
        this.frames = [];
        this.totalTime = 0;
        this._frameIdx = -1;
        this.isCompleted = false;

        this._skeletonInfo = null;
        this._animationName = null;
        this._tempSegments = null;
        this._tempColors = null;
        this._tempBoneInfos = null;
    }

    init (skeletonInfo: SkeletonCacheItemInfo, animationName: string) {
        this._inited = true;
        this._animationName = animationName;
        this._skeletonInfo = skeletonInfo;
    }

    // Clear texture quote.
    clear () {
        this._inited = false;
        for (let i = 0, n = this.frames.length; i < n; i++) {
            const frame = this.frames[i];
            frame.segments.length = 0;
        }
        this.invalidAllFrame();
    }

    bind (listener: TrackEntryListeners) {
        const self = this;
        const completeHandle = (entry:spine.TrackEntry)=> {
            if (entry && entry.animation.name === self._animationName) {
                self.isCompleted = true;
            }
        };

        listener.complete = completeHandle;
    }

    unbind (listener: TrackEntryListeners) {
        (listener as any).complete = null;
    }

    begin () {
        if (!this._invalid) return;

        const skeletonInfo = this._skeletonInfo;
        const preAnimationCache = skeletonInfo?.curAnimationCache;

        if (preAnimationCache && preAnimationCache !== this) {
            if (this._privateMode) {
                // Private cache mode just invalid pre animation frame.
                preAnimationCache.invalidAllFrame();
            } else {
                // If pre animation not finished, play it to the end.
                preAnimationCache.updateToFrame();
            }
        }

        const skeleton = skeletonInfo?.skeleton;
        const listener = skeletonInfo?.listener;
        const state = skeletonInfo?.state;

        const animation = skeleton?.data.findAnimation(this._animationName!);
        state?.setAnimationWith(0, animation!, false);
        this.bind(listener!);

        // record cur animation cache
        skeletonInfo!.curAnimationCache = this;
        this._frameIdx = -1;
        this.isCompleted = false;
        this.totalTime = 0;
        this._invalid = false;
    }

    end () {
        if (!this._needToUpdate()) {
            // clear cur animation cache
            this._skeletonInfo!.curAnimationCache = null;
            this.frames.length = this._frameIdx + 1;
            this.isCompleted = true;
            this.unbind(this._skeletonInfo!.listener);
        }
    }

    _needToUpdate (toFrameIdx?: number) {
        return !this.isCompleted &&
            this.totalTime < MaxCacheTime &&
            (toFrameIdx === undefined || this._frameIdx < toFrameIdx);
    }

    updateToFrame (toFrameIdx?: number) {
        if (!this._inited) return;

        this.begin();

        if (!this._needToUpdate(toFrameIdx)) return;

        const skeletonInfo = this._skeletonInfo;
        const skeleton = skeletonInfo?.skeleton;
        const clipper = skeletonInfo?.clipper;
        const state = skeletonInfo?.state;

        do {
            // Solid update frame rate 1/60.
            skeleton?.update(FrameTime);
            state?.update(FrameTime);
            state?.apply(skeleton!);
            skeleton?.updateWorldTransform();
            this._frameIdx++;
            this._updateFrame(skeleton!, clipper!, this._frameIdx);
            this.totalTime += FrameTime;
        } while (this._needToUpdate(toFrameIdx));

        this.end();
    }

    isInited () {
        return this._inited;
    }

    isInvalid () {
        return this._invalid;
    }

    invalidAllFrame () {
        this.isCompleted = false;
        this._invalid = true;
    }

    updateAllFrame () {
        this.invalidAllFrame();
        this.updateToFrame();
    }

    enableCacheAttachedInfo () {
        if (!this._enableCacheAttachedInfo) {
            this._enableCacheAttachedInfo = true;
            this.invalidAllFrame();
        }
    }

    _updateFrame (skeleton: spine.Skeleton, clipper: spine.SkeletonClipping, index: number) {
        _vfOffset = 0;
        _boneInfoOffset = 0;
        _indexOffset = 0;
        _vertexOffset = 0;
        _preTexUrl = null;
        _preBlendMode = null;
        _segVCount = 0;
        _segICount = 0;
        _segOffset = 0;
        _colorOffset = 0;
        _preFinalColor = null;
        _preDarkColor = null;

        this.frames[index] = this.frames[index] || {
            segments: [],
            colors: [],
            boneInfos: [],
            vertices: null,
            uintVert: null,
            indices: null,
        };
        const frame = this.frames[index];

        const segments = this._tempSegments = frame.segments;
        const colors = this._tempColors = frame.colors;
        const boneInfos = this._tempBoneInfos = frame.boneInfos;
        this._traverseSkeleton(skeleton, clipper);
        if (_colorOffset > 0) {
            colors[_colorOffset - 1].vfOffset = _vfOffset;
        }
        colors.length = _colorOffset;
        boneInfos.length = _boneInfoOffset;
        // Handle pre segment.
        const preSegOffset = _segOffset - 1;
        if (preSegOffset >= 0) {
            // Judge segment vertex count is not empty.
            if (_segICount > 0) {
                const preSegInfo = segments[preSegOffset];
                preSegInfo.indexCount = _segICount;
                preSegInfo.vfCount = _segVCount * _perVertexSize;
                preSegInfo.vertexCount = _segVCount;
                segments.length = _segOffset;
            } else {
                // Discard pre segment.
                segments.length = _segOffset - 1;
            }
        }

        // Segments is empty,discard all segments.
        if (segments.length === 0) return;

        // Fill vertices
        let vertices = frame.vertices;
        let uintVert = frame.uintVert;
        if (!vertices || vertices.length < _vfOffset) {
            vertices = frame.vertices = new Float32Array(_vfOffset);
            uintVert = frame.uintVert = new Uint32Array(vertices.buffer);
        }
        for (let i = 0, j = 0; i < _vfOffset;) {
            vertices[i++] = _vertices[j++]; // x
            vertices[i++] = _vertices[j++]; // y
            vertices[i++] = _vertices[j++]; // u
            vertices[i++] = _vertices[j++]; // v
            uintVert[i++] = _vertices[j++]; // color1
            uintVert[i++] = _vertices[j++]; // color2
        }

        // Fill indices
        let indices = frame.indices;
        if (!indices || indices.length < _indexOffset) {
            indices = frame.indices = new Uint16Array(_indexOffset);
        }

        for (let i = 0; i < _indexOffset; i++) {
            indices[i] = _indices[i];
        }

        frame.vertices = vertices;
        frame.uintVert = uintVert;
        frame.indices = indices;
    }

    fillVertices (skeletonColor: spine.Color, attachmentColor: spine.Color, slotColor: spine.Color, clipper: spine.SkeletonClipping, slot: spine.Slot) {

        _tempa = slotColor.a * attachmentColor.a * skeletonColor.a * 255;
        _tempr = attachmentColor.r * skeletonColor.r * 255;
        _tempg = attachmentColor.g * skeletonColor.g * 255;
        _tempb = attachmentColor.b * skeletonColor.b * 255;

        _finalColor.r = _tempr * slotColor.r;
        _finalColor.g = _tempg * slotColor.g;
        _finalColor.b = _tempb * slotColor.b;
        _finalColor.a = _tempa;

        if (slot.darkColor == null) {
            _darkColor.set(0.0, 0, 0, 1.0);
        } else {
            _darkColor.r = slot.darkColor.r * _tempr;
            _darkColor.g = slot.darkColor.g * _tempg;
            _darkColor.b = slot.darkColor.b * _tempb;
        }
        _darkColor.a = 0;

        _finalColor32 = ((_finalColor.a << 24) >>> 0) + (_finalColor.b << 16) + (_finalColor.g << 8) + _finalColor.r;
        _darkColor32 = ((_darkColor.a << 24) >>> 0) + (_darkColor.b << 16) + (_darkColor.g << 8) + _darkColor.r;

        if (_preFinalColor !== _finalColor32 || _preDarkColor !== _darkColor32) {
            const colors = this._tempColors;
            _preFinalColor = _finalColor32;
            _preDarkColor = _darkColor32;
            if (_colorOffset > 0) {
                colors![_colorOffset - 1].vfOffset = _vfOffset;
            }
            colors![_colorOffset++] = {
                fr: _finalColor.r,
                fg: _finalColor.g,
                fb: _finalColor.b,
                fa: _finalColor.a,
                dr: _darkColor.r,
                dg: _darkColor.g,
                db: _darkColor.b,
                da: _darkColor.a,
                vfOffset: 0
            }
        }

        if (!clipper.isClipping()) {

            for (let v = _vfOffset, n = _vfOffset + _vfCount; v < n; v += _perVertexSize) {
                _vertices[v + 4] = _finalColor32;     // light color
                _vertices[v + 5] = _darkColor32;      // dark color
            }

        } else {
            // FIXME: bad arguments
            // clipper.clipTriangles(_vertices, _vfCount, _indices, _indexCount, _vertices, _finalColor, _darkColor,
            //    true, _perVertexSize, _indexOffset, _vfOffset, _vfOffset + 2);
            clipper.clipTriangles(_vertices, _vfCount, _indices, _indexCount, _vertices, _finalColor, _darkColor, true);
            const clippedVertices = clipper.clippedVertices;
            const clippedTriangles = clipper.clippedTriangles;

            // insure capacity
            _indexCount = clippedTriangles.length;
            _vfCount = clippedVertices.length / _perClipVertexSize * _perVertexSize;

            // fill indices
            for (let ii = 0, jj = _indexOffset, nn = clippedTriangles.length; ii < nn;) {
                _indices[jj++] = clippedTriangles[ii++];
            }

            // fill vertices contain x y u v light color dark color
            for (let v = 0, n = clippedVertices.length, offset = _vfOffset; v < n; v += 12, offset += _perVertexSize) {
                _vertices[offset] = clippedVertices[v];                 // x
                _vertices[offset + 1] = clippedVertices[v + 1];         // y
                _vertices[offset + 2] = clippedVertices[v + 6];         // u
                _vertices[offset + 3] = clippedVertices[v + 7];         // v

                _vertices[offset + 4] = _finalColor32;
                _vertices[offset + 5] = _darkColor32;
            }
        }
    }

    _traverseSkeleton (skeleton: spine.Skeleton, clipper: spine.SkeletonClipping) {
        const segments = this._tempSegments!;
        const boneInfos = this._tempBoneInfos!;
        const skeletonColor = skeleton.color;
        let attachment: spine.Attachment;
        let attachmentColor: spine.Color;
        let slotColor: spine.Color;
        let uvs: spine.ArrayLike<number>;
        let triangles: number[];
        let isRegion: boolean;
        let isMesh: boolean;
        let isClip: boolean;
        let texture: Texture2D;
        let preSegOffset: number;
        let preSegInfo: FrameSegment;
        let blendMode: spine.BlendMode;
        let slot: spine.Slot;

        const bones = skeleton.bones;
        if (this._enableCacheAttachedInfo) {
            for (let i = 0, l = bones.length; i < l; i++, _boneInfoOffset++) {
                const bone = bones[i];
                let boneInfo = boneInfos[_boneInfoOffset];
                if (!boneInfo) {
                    boneInfo = boneInfos[_boneInfoOffset] = {} as any;
                }
                boneInfo.a = bone.a;
                boneInfo.b = bone.b;
                boneInfo.c = bone.c;
                boneInfo.d = bone.d;
                boneInfo.worldX = bone.worldX;
                boneInfo.worldY = bone.worldY;
            }
        }

        for (let slotIdx = 0, slotCount = skeleton.drawOrder.length; slotIdx < slotCount; slotIdx++) {
            slot = skeleton.drawOrder[slotIdx];

            _vfCount = 0;
            _indexCount = 0;

            attachment = slot.getAttachment();
            if (!attachment) {
                clipper.clipEndWithSlot(slot);
                continue;
            }

            isRegion = attachment instanceof spine.RegionAttachment;
            isMesh = attachment instanceof spine.MeshAttachment;
            isClip = attachment instanceof spine.ClippingAttachment;

            if (isClip) {
                clipper.clipStart(slot, attachment as spine.ClippingAttachment);
                continue;
            }

            if (!isRegion && !isMesh) {
                clipper.clipEndWithSlot(slot);
                continue;
            }

            texture = (((attachment as spine.RegionAttachment).region as spine.TextureAtlasRegion).texture as any)._texture;
            if (!texture) {
                clipper.clipEndWithSlot(slot);
                continue;
            }

            blendMode = slot.data.blendMode;
            if (_preTexUrl !== texture.nativeUrl || _preBlendMode !== blendMode) {
                _preTexUrl = texture.nativeUrl;
                _preBlendMode = blendMode;
                // Handle pre segment.
                preSegOffset = _segOffset - 1;
                if (preSegOffset >= 0) {
                    if (_segICount > 0) {
                        preSegInfo = segments[preSegOffset];
                        preSegInfo.indexCount = _segICount;
                        preSegInfo.vertexCount = _segVCount;
                        preSegInfo.vfCount = _segVCount * _perVertexSize;
                    } else {
                        // Discard pre segment.
                        _segOffset--;
                    }
                }
                // Handle now segment.
                segments[_segOffset] = {
                    tex: texture,
                    blendMode,
                    indexCount: 0,
                    vertexCount: 0,
                    vfCount: 0
                };
                _segOffset++;
                _segICount = 0;
                _segVCount = 0;
            }

            if (isRegion) {

                triangles = _quadTriangles;

                // insure capacity
                _vfCount = 4 * _perVertexSize;
                _indexCount = 6;

                // compute vertex and fill x y
                (attachment as spine.RegionAttachment).computeWorldVertices(slot.bone, _vertices, _vfOffset, _perVertexSize);
            }
            else if (isMesh) {
                const meshAttachment = (attachment as spine.MeshAttachment);
                triangles = meshAttachment.triangles;

                // insure capacity
                _vfCount = (meshAttachment.worldVerticesLength >> 1) * _perVertexSize;
                _indexCount = triangles.length;

                // compute vertex and fill x y
                meshAttachment.computeWorldVertices(slot, 0, meshAttachment.worldVerticesLength, _vertices, _vfOffset, _perVertexSize);
            }

            if (_vfCount === 0 || _indexCount === 0) {
                clipper.clipEndWithSlot(slot);
                continue;
            }

            // fill indices
            for (let ii = 0, jj = _indexOffset, nn = triangles!.length; ii < nn;) {
                _indices[jj++] = triangles![ii++];
            }

            // fill u v
            uvs = (attachment as spine.MeshAttachment).uvs;
            for (let v = _vfOffset, n = _vfOffset + _vfCount, u = 0; v < n; v += _perVertexSize, u += 2) {
                _vertices[v + 2] = uvs[u];           // u
                _vertices[v + 3] = uvs[u + 1];       // v
            }

            attachmentColor = (attachment as spine.MeshAttachment).color;
            slotColor = slot.color;

            this.fillVertices(skeletonColor, attachmentColor, slotColor, clipper, slot);

            if (_indexCount > 0) {
                for (let ii = _indexOffset, nn = _indexOffset + _indexCount; ii < nn; ii++) {
                    _indices[ii] += _segVCount;
                }
                _indexOffset += _indexCount;
                _vfOffset += _vfCount;
                _vertexOffset = _vfOffset / _perVertexSize;
                _segICount += _indexCount;
                _segVCount += _vfCount / _perVertexSize;
            }

            clipper.clipEndWithSlot(slot);
        }

        clipper.clipEnd();
    }
}

class SkeletonCache {
    protected _privateMode: boolean;
    protected _skeletonCache: { [key: string]: SkeletonCacheItemInfo };
    protected _animationPool: { [key: string]: AnimationCache };
    constructor () {
        this._privateMode = false;
        this._animationPool = {};
        this._skeletonCache = {};
    }

    enablePrivateMode () {
        this._privateMode = true;
    }

    clear () {
        this._animationPool = {};
        this._skeletonCache = {};
    }

    removeSkeleton (uuid: string) {
        const skeletonInfo = this._skeletonCache[uuid];
        if (!skeletonInfo) return;
        const animationsCache = skeletonInfo.animationsCache;
        for (const aniKey in animationsCache) {
            // Clear cache texture, and put cache into pool.
            // No need to create TypedArray next time.
            const animationCache = animationsCache[aniKey];
            if (!animationCache) continue;
            this._animationPool[uuid + '#' + aniKey] = animationCache;
            animationCache.clear();
        }

        delete this._skeletonCache[uuid];
    }

    getSkeletonCache (uuid: string, skeletonData: spine.SkeletonData) {
        let skeletonInfo = this._skeletonCache[uuid];
        if (!skeletonInfo) {
            const skeleton = new spine.Skeleton(skeletonData);
            const clipper = new spine.SkeletonClipping();
            const stateData = new spine.AnimationStateData(skeleton.data);
            const state = new spine.AnimationState(stateData);
            const listener = new TrackEntryListeners();
            state.addListener(listener as any);

            this._skeletonCache[uuid] = skeletonInfo = {
                skeleton,
                clipper,
                state,
                listener,
                // Cache all kinds of animation frame.
                // When skeleton is dispose, clear all animation cache.
                animationsCache: {} as any,
                curAnimationCache: null
            };
        }
        return skeletonInfo;
    }

    getAnimationCache (uuid: string, animationName: string) {
        const skeletonInfo = this._skeletonCache[uuid];
        if (!skeletonInfo) return null;

        const animationsCache = skeletonInfo.animationsCache;
        return animationsCache[animationName];
    }

    invalidAnimationCache (uuid: string) {
        const skeletonInfo = this._skeletonCache[uuid];
        const skeleton = skeletonInfo && skeletonInfo.skeleton;
        if (!skeleton) return;

        const animationsCache = skeletonInfo.animationsCache;
        for (const aniKey in animationsCache) {
            const animationCache = animationsCache[aniKey];
            animationCache.invalidAllFrame();
        }
    }

    initAnimationCache (uuid: string, animationName: string): null | AnimationCache {
        if (!animationName) return null;
        const skeletonInfo = this._skeletonCache[uuid];
        const skeleton = skeletonInfo && skeletonInfo.skeleton;
        if (!skeleton) return null;

        const animation = skeleton.data.findAnimation(animationName);
        if (!animation) {
            return null;
        }

        const animationsCache = skeletonInfo.animationsCache;
        let animationCache = animationsCache[animationName];
        if (!animationCache) {
            // If cache exist in pool, then just use it.
            const poolKey = uuid + '#' + animationName;
            animationCache = this._animationPool[poolKey];
            if (animationCache) {
                delete this._animationPool[poolKey];
            } else {
                animationCache = new AnimationCache();
                animationCache._privateMode = this._privateMode;
            }
            animationCache.init(skeletonInfo, animationName);
            animationsCache[animationName] = animationCache;
        }
        return animationCache;
    }

    updateAnimationCache (uuid: string, animationName: string): null | void {
        if (animationName) {
            const animationCache = this.initAnimationCache(uuid, animationName);
            if (!animationCache) return null;
            animationCache.updateAllFrame();
        } else {
            const skeletonInfo = this._skeletonCache[uuid];
            const skeleton = skeletonInfo && skeletonInfo.skeleton;
            if (!skeleton) return;

            const animationsCache = skeletonInfo.animationsCache;
            for (const aniKey in animationsCache) {
                const animationCache = animationsCache[aniKey];
                animationCache.updateAllFrame();
            }
        }
    }

    static readonly FrameTime = FrameTime;
    static sharedCache = new SkeletonCache();
}


export default SkeletonCache;