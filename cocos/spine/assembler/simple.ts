/*
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
*/

/**
 * @packageDocumentation
 * @module ui-assembler
 */

import { Color, Mat4, Size, Vec3, Node, GFXBlendFactor, Texture2D, GFXAttribute, Material } from '../../core';
import { IAssembler } from '../../core/renderer/ui/base';
import { MeshRenderData } from '../../core/renderer/ui/render-data';
import { UI } from '../../core/renderer/ui/ui';
import { Skeleton, SkeletonMeshData, SpineMaterialType } from '../Skeleton'
import spine from '../lib/spine-core.js';
import { JSB } from '../../../editor/exports/populate-internal-constants';
import { vfmtPosUvColor, vfmtPosUvTwoColor } from '../../core/renderer/ui/ui-vertex-format';
import { VertexEffectDelegate } from '..';
import { FrameColor } from '../skeleton-cache';
import { MaterialInstance } from '../../core/renderer';



const FLAG_BATCH = 0x10;
const FLAG_TWO_COLOR = 0x01;

let _handleVal = 0x00;
const _quadTriangles = [0, 1, 2, 2, 3, 0];
const _slotColor = new Color(0, 0, 255, 255);
const _boneColor = new Color(255, 0, 0, 255);
const _originColor = new Color(0, 255, 0, 255);
const _meshColor = new Color(255, 255, 0, 255);

let _finalColor: spine.Color | null = null;
let _darkColor: spine.Color | null = null;
let _tempPos: spine.Vector2 | null = null;
let _tempUv: spine.Vector2 | null = null;
if (!JSB) {
    _finalColor = new spine.Color(1, 1, 1, 1);
    _darkColor = new spine.Color(1, 1, 1, 1);
    _tempPos = new spine.Vector2();
    _tempUv = new spine.Vector2();
}

let _premultipliedAlpha: boolean;
let _multiplier;
let _slotRangeStart: number;
let _slotRangeEnd: number;
let _useTint: boolean;
let _debugSlots: boolean;
let _debugBones: boolean;
let _debugMesh: boolean;
let _nodeR: number;
let _nodeG: number;
let _nodeB: number;
let _nodeA: number;
let _finalColor32: Float32Array;
let _darkColor32: Float32Array;
let _vertexFormat: GFXAttribute[] = [];
let _perVertexSize: number;
let _perClipVertexSize: number;

let _vertexFloatCount = 0;
let _vertexCount = 0;
let _vertexOffset = 0;
let _vertexFloatOffset = 0;
let _indexCount = 0;
let _indexOffset = 0;
let _vfOffset = 0;
let _tempr: number;
let _tempg: number;
let _tempb: number;
let _inRange: boolean;
let _mustFlush: boolean;
let _x: number;
let _y: number;
let _m00: number;
let _m04: number;
let _m12: number;
let _m01: number;
let _m05: number;
let _m13: number;
let _r: number;
let _g: number;
let _b: number;
let _fr: number;
let _fg: number;
let _fb: number;
let _fa: number;
let _dr: number;
let _dg: number;
let _db: number;
let _da: number;
let _comp: Skeleton | undefined;
let _buffer: SkeletonMeshData | undefined;
let _renderer: UI | undefined;
let _node: Node | undefined;
let _needColor: boolean;
let _vertexEffect: spine.VertexEffect | null = null;
let _currentMaterial: Material | MaterialInstance | null = null;
let _currentTexture: Texture2D | null = null;

function _getSlotMaterial (blendMode: spine.BlendMode) {
    let src: GFXBlendFactor;
    let dst: GFXBlendFactor;
    switch (blendMode) {
        case spine.BlendMode.Additive:
            src = _premultipliedAlpha ? GFXBlendFactor.ONE : GFXBlendFactor.SRC_ALPHA;
            dst = GFXBlendFactor.ONE;
            break;
        case spine.BlendMode.Multiply:
            src = GFXBlendFactor.DST_COLOR;
            dst = GFXBlendFactor.ONE_MINUS_SRC_ALPHA;
            break;
        case spine.BlendMode.Screen:
            src = GFXBlendFactor.ONE;
            dst = GFXBlendFactor.ONE_MINUS_SRC_COLOR;
            break;
        case spine.BlendMode.Normal:
        default:
            src = _premultipliedAlpha ? GFXBlendFactor.ONE : GFXBlendFactor.SRC_ALPHA;
            dst = GFXBlendFactor.ONE_MINUS_SRC_ALPHA;
            break;
    }

    // The key use to find corresponding material

    _comp!.dstBlendFactor = dst;
    _comp!.srcBlendFactor = src;

    // TODO: cache materials
    // FIXME: blend mode differs

    if (_useTint) {
        _comp!.spineMatrialType = SpineMaterialType.TWO_COLORED;
    } else {
        _comp!.spineMatrialType = SpineMaterialType.COLORED_TEXTURED;
    }

    return _comp!.getUIRenderMaterial();
}

function _handleColor (color: FrameColor) {
    // temp rgb has multiply 255, so need divide 255;
    _fa = color.fa * _nodeA;
    _multiplier = _premultipliedAlpha ? _fa / 255 : 1;
    _r = _nodeR * _multiplier;
    _g = _nodeG * _multiplier;
    _b = _nodeB * _multiplier;

    _fr = color.fr * _r;
    _fg = color.fg * _g;
    _fb = color.fb * _b;
    _finalColor32[0] = _fr / 255.0;
    _finalColor32[1] = _fg / 255.0;
    _finalColor32[2] = _fb / 255.0;
    _finalColor32[3] = _fa / 255.0;

    _dr = color.dr * _r;
    _dg = color.dg * _g;
    _db = color.db * _b;
    _da = _premultipliedAlpha ? 255 : 0;
    _darkColor32[0] = _dr / 255.0;
    _darkColor32[1] = _dg / 255.0;
    _darkColor32[2] = _db / 255.0;
    _darkColor32[3] = _da / 255.0;
}

function _spineColorToInt32 (spineColor: spine.Color) {
    return ((spineColor.a << 24) >>> 0) + (spineColor.b << 16) + (spineColor.g << 8) + spineColor.r;
}

const _tmpColor4 = new Float32Array(4);
function _spineColorToFloat32Array4 (spineColor: spine.Color) {
    _tmpColor4[0] = spineColor.r / 255.0;
    _tmpColor4[1] = spineColor.g / 255.0;
    _tmpColor4[2] = spineColor.b / 255.0;
    _tmpColor4[3] = spineColor.a / 255.0;
    return _tmpColor4;
}

function _vfmtFloatSize(useTint:boolean) {
    return useTint ? 3 + 2+ 4 + 4 : 3 + 2 + 4;
}

/**
 * simple 组装器
 * 可通过 `UI.simple` 获取该组装器。
 */
export const simple: IAssembler = {
    createData (comp: Skeleton) {
    },

    updateRenderData (comp: Skeleton, ui: UI) {
        if (comp.isAnimationCached()) return;
        const skeleton = comp._skeleton;
        if (skeleton) {
            skeleton.updateWorldTransform();
            updateComponentRenderData(comp, ui);
        }
    },

    updateColor (comp: Skeleton) {

    },

};


function updateComponentRenderData (comp: Skeleton, ui: UI) {

    const node = comp.node;
    if (!comp._skeleton) return;

    const nodeColor = comp.color;
    _nodeR = nodeColor.r / 255;
    _nodeG = nodeColor.g / 255;
    _nodeB = nodeColor.b / 255;
    _nodeA = nodeColor.a / 255;

    _useTint = comp.useTint || comp.isAnimationCached();
    _vertexFormat = _useTint ? vfmtPosUvTwoColor : vfmtPosUvColor;
    // x y u v color1 color2 or x y u v color
    _perVertexSize = _useTint ? (4 + 4 + 4 + 2) : (3 + 2 + 4);

    _node = comp.node;

    // huge performance impact
    comp.resetRenderData();

    _buffer = comp.requestMeshRenderData(_perVertexSize);
    _renderer = ui;
    _comp = comp;

    _mustFlush = true;
    _premultipliedAlpha = comp.premultipliedAlpha;
    _multiplier = 1.0;
    _handleVal = 0x00;
    _needColor = false;
    _vertexEffect = comp._effectDelegate && comp._effectDelegate._vertexEffect;

    if (nodeColor._val !== 0xffffffff || _premultipliedAlpha) {
        _needColor = true;
    }

    if (_useTint) {
        _handleVal |= FLAG_TWO_COLOR;
    }

    let worldMat: Mat4 | undefined;
    if (_comp!.enableBatch) {
        worldMat = _node.worldMatrix;
        _mustFlush = false;
        _handleVal |= FLAG_BATCH;
    }

    if (comp.isAnimationCached()) {
        // Traverse input assembler.
        cacheTraverse(worldMat);
    } else {
        if (_vertexEffect) _vertexEffect.begin(comp._skeleton);
        realTimeTraverse(worldMat);
        if (_vertexEffect) _vertexEffect.end();
    }

    // sync attached node matrix
    comp.attachUtil._syncAttachedNode();

    // Clear temp var.
    _node = undefined;
    _buffer = undefined;
    _renderer = undefined;
    _comp = undefined;
    _vertexEffect = null;
}


function fillVertices (skeletonColor: spine.Color, attachmentColor: spine.Color, slotColor: spine.Color, clipper: spine.SkeletonClipping, slot: spine.Slot) {

    let vbuf = _buffer!.renderData.vData;
    let ibuf = _buffer!.renderData.iData;

    _finalColor!.a = slotColor.a * attachmentColor.a * skeletonColor.a * _nodeA * 255;
    _multiplier = _premultipliedAlpha ? _finalColor!.a : 255;
    _tempr = _nodeR * attachmentColor.r * skeletonColor.r * _multiplier;
    _tempg = _nodeG * attachmentColor.g * skeletonColor.g * _multiplier;
    _tempb = _nodeB * attachmentColor.b * skeletonColor.b * _multiplier;

    _finalColor!.r = _tempr * slotColor.r;
    _finalColor!.g = _tempg * slotColor.g;
    _finalColor!.b = _tempb * slotColor.b;

    if (slot.darkColor == null) {
        _darkColor!.set(0.0, 0.0, 0.0, 1.0);
    } else {
        _darkColor!.r = slot.darkColor.r * _tempr;
        _darkColor!.g = slot.darkColor.g * _tempg;
        _darkColor!.b = slot.darkColor.b * _tempb;
    }
    _darkColor!.a = _premultipliedAlpha ? 255 : 0;

    if (!clipper.isClipping()) {
        if (_vertexEffect) {
            for (let v = _vertexFloatOffset, n = _vertexFloatOffset + _vertexFloatCount; v < n; v += _perVertexSize) {
                _tempPos!.x = vbuf[v];
                _tempPos!.y = vbuf[v + 1];
                _tempUv!.x = vbuf[v + 3];
                _tempUv!.y = vbuf[v + 4];
                _vertexEffect.transform(_tempPos!, _tempUv!, _finalColor!, _darkColor!);

                vbuf[v] = _tempPos!.x;        // x
                vbuf[v + 1] = _tempPos!.y;        // y
                vbuf[v + 3] = _tempUv!.x;         // u
                vbuf[v + 4] = _tempUv!.y;         // v

                vbuf.set(_spineColorToFloat32Array4(_finalColor!), v + 5)
                if (_useTint) {
                    vbuf.set(_spineColorToFloat32Array4(_darkColor!), v + 9); // dark color
                }
            }
        } else {

            _finalColor32.set(_spineColorToFloat32Array4(_finalColor!));
            _darkColor32.set(_spineColorToFloat32Array4(_darkColor!));

            for (let v = _vertexFloatOffset, n = _vertexFloatOffset + _vertexFloatCount; v < n; v += _perVertexSize) {
                vbuf.set(_finalColor32, v + 5);          // light color
                if (_useTint) {
                    vbuf.set(_darkColor32, v + 9);      // dark color
                }
            }
        }
    } else {
        const uvs = vbuf.subarray(_vertexFloatOffset + 2);

        _perClipVertexSize = _useTint ? 12 : 8;

        clipper.clipTriangles(vbuf.subarray(_vertexFloatOffset), _vertexFloatCount,
            ibuf.subarray(_indexOffset), _indexCount, uvs, _finalColor!, _darkColor!, _useTint);
        const clippedVertices = new Float32Array(clipper.clippedVertices);
        const clippedTriangles = clipper.clippedTriangles;

        // insure capacity
        _indexCount = clippedTriangles.length;
        _vertexFloatCount = clippedVertices.length / _perClipVertexSize * _perVertexSize;

        _buffer?.renderData.reserve(_vertexFloatCount / _perVertexSize, _indexCount);
        _indexOffset = _buffer!.renderData.indicesStart;
        _vertexOffset = _buffer!.renderData.vertexStart;
        _vertexFloatOffset = _buffer!.renderData.byteStart >> 2;
        vbuf = _buffer!.renderData.vData;
        ibuf = _buffer!.renderData.iData;

        // fill indices
        ibuf.set(clippedTriangles, _indexOffset);

        // fill vertices contain x y u v light color dark color
        if (_vertexEffect) {
            for (let v = 0, n = clippedVertices.length, offset = _vertexFloatOffset; v < n; v += _perClipVertexSize, offset += _perVertexSize) {
                _tempPos!.x = clippedVertices[v];
                _tempPos!.y = clippedVertices[v + 1];
                _finalColor!.set(clippedVertices[v + 2], clippedVertices[v + 3], clippedVertices[v + 4], clippedVertices[v + 5]);
                _tempUv!.x = clippedVertices[v + 6];
                _tempUv!.y = clippedVertices[v + 7];
                if (_useTint) {
                    _darkColor!.set(clippedVertices[v + 8], clippedVertices[v + 9], clippedVertices[v + 10], clippedVertices[v + 11]);
                } else {
                    _darkColor!.set(0, 0, 0, 0);
                }
                _vertexEffect.transform(_tempPos!, _tempUv!, _finalColor!, _darkColor!);

                vbuf[offset] = _tempPos!.x;             // x
                vbuf[offset + 1] = _tempPos!.y;         // y
                vbuf[offset + 3] = _tempUv!.x;          // u
                vbuf[offset + 4] = _tempUv!.y;          // v
                vbuf.set(_spineColorToFloat32Array4(_finalColor!), offset + 5);
                if (_useTint) {
                    vbuf.set(_spineColorToFloat32Array4(_darkColor!), offset + 9);
                }
            }
        } else {
            for (let v = 0, n = clippedVertices.length, offset = _vertexFloatOffset; v < n; v += _perClipVertexSize, offset += _perVertexSize) {
                vbuf[offset] = clippedVertices[v];         // x
                vbuf[offset + 1] = clippedVertices[v + 1];     // y
                vbuf[offset + 2] = clippedVertices[v + 6];     // u
                vbuf[offset + 3] = clippedVertices[v + 7];     // v

                _finalColor32 = ((clippedVertices[v + 5] << 24) >>> 0) + (clippedVertices[v + 4] << 16) +
                    (clippedVertices[v + 3] << 8) + clippedVertices[v + 2];
                uintVData[offset + 4] = _finalColor32;

                if (_useTint) {
                    _darkColor32 = ((clippedVertices[v + 11] << 24) >>> 0) + (clippedVertices[v + 10] << 16) +
                        (clippedVertices[v + 9] << 8) + clippedVertices[v + 8];
                    uintVData[offset + 5] = _darkColor32;
                }
            }
        }
    }
}

function realTimeTraverse (worldMat?: Mat4) {
    let vbuf: Float32Array;
    let ibuf: Uint16Array;

    const locSkeleton = _comp!._skeleton!;
    const skeletonColor = locSkeleton.color;
    const graphics = _comp!._debugRenderer!;
    const clipper = _comp!._clipper!;
    let material: Material | MaterialInstance | null = null;
    let attachment: spine.Attachment;
    let attachmentColor: spine.Color;
    let slotColor: spine.Color;
    let uvs: spine.ArrayLike<number>;
    let triangles: number[];
    let isRegion: boolean;
    let isMesh: boolean;
    let isClip: boolean;
    let slot: spine.Slot;

    _slotRangeStart = _comp!._startSlotIndex;
    _slotRangeEnd = _comp!._endSlotIndex;
    _inRange = false;
    if (_slotRangeStart === -1) _inRange = true;

    _debugSlots = _comp!.debugSlots;
    _debugBones = _comp!.debugBones;
    _debugMesh = _comp!.debugMesh;
    if (graphics && (_debugBones || _debugSlots || _debugMesh)) {
        graphics.clear();
        graphics.lineWidth = 2;
    }

    // x y u v r1 g1 b1 a1 r2 g2 b2 a2 or x y u v r g b a 
    _perClipVertexSize = _useTint ? (4 + 4 + 4 + 2) : (3 + 2 + 4);

    _vertexFloatCount = 0;
    _vertexOffset = 0;
    _vertexFloatOffset = 0;
    _indexCount = 0;
    _indexOffset = 0;

    for (let slotIdx = 0, slotCount = locSkeleton.drawOrder.length; slotIdx < slotCount; slotIdx++) {
        slot = locSkeleton.drawOrder[slotIdx];

        if (slot === undefined) {
            continue;
        }

        if (_slotRangeStart >= 0 && _slotRangeStart === slot.data.index) {
            _inRange = true;
        }

        if (!_inRange) {
            clipper.clipEndWithSlot(slot);
            continue;
        }

        if (_slotRangeEnd >= 0 && _slotRangeEnd === slot.data.index) {
            _inRange = false;
        }

        _vertexFloatCount = 0;
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

        const texture = (attachment as any).region.texture._texture;
        material = _getSlotMaterial(slot.data.blendMode);
        if (!material) {
            clipper.clipEndWithSlot(slot);
            continue;
        }

        if (!_currentMaterial) _currentMaterial = material;

        if (_mustFlush || material.hash !== _currentMaterial.hash || (texture && _currentTexture !== texture)) {
            _mustFlush = false;

            _buffer = _comp!.requestMeshRenderData(_perClipVertexSize);

            _currentMaterial = material;
            _currentTexture = texture;
        }

        if (isRegion) {

            triangles = _quadTriangles;

            // insure capacity
            _vertexFloatCount = 4 * _perVertexSize;
            _indexCount = 6;

            _buffer!.renderData.reserve(4, 6);
            _indexOffset = _buffer!.renderData.indicesStart;
            _vertexOffset = _buffer!.renderData.vertexStart;
            _vertexFloatOffset = _buffer!.renderData.byteStart >> 2;
            vbuf = _buffer!.renderData.vData;
            ibuf = _buffer!.renderData.iData;

            // compute vertex and fill x y
            (attachment as spine.RegionAttachment).computeWorldVertices(slot.bone, vbuf, _vertexFloatOffset, _perVertexSize);

            // draw debug slots if enabled graphics
            if (graphics && _debugSlots) {
                graphics.strokeColor = _slotColor;
                graphics.moveTo(vbuf[_vertexFloatOffset], vbuf[_vertexFloatOffset + 1]);
                for (let ii = _vertexFloatOffset + _perVertexSize, nn = _vertexFloatOffset + _vertexFloatCount; ii < nn; ii += _perVertexSize) {
                    graphics.lineTo(vbuf[ii], vbuf[ii + 1]);
                }
                graphics.close();
                graphics.stroke();
            }
        }
        else if (isMesh) {

            const mattachment = attachment as spine.MeshAttachment;
            triangles = mattachment.triangles;

            // insure capacity
            _vertexFloatCount = (mattachment.worldVerticesLength >> 1) * _perVertexSize;
            _indexCount = triangles.length;

            _buffer!.renderData.reserve(mattachment.worldVerticesLength >> 1, _indexCount)

            _indexOffset = _buffer!.renderData.indicesStart;
            _vertexOffset = _buffer!.renderData.vertexStart;
            _vertexFloatOffset = _buffer!.renderData.byteStart >> 2;

            vbuf = _buffer!.renderData.vData;
            ibuf = _buffer!.renderData.iData;

            // compute vertex and fill x y
            mattachment.computeWorldVertices(slot, 0, mattachment.worldVerticesLength, vbuf, _vertexFloatOffset, _perVertexSize);

            // draw debug mesh if enabled graphics
            if (graphics && _debugMesh) {
                graphics.strokeColor = _meshColor;

                for (let ii = 0, nn = triangles.length; ii < nn; ii += 3) {
                    const v1 = triangles[ii] * _perVertexSize + _vertexFloatOffset;
                    const v2 = triangles[ii + 1] * _perVertexSize + _vertexFloatOffset;
                    const v3 = triangles[ii + 2] * _perVertexSize + _vertexFloatOffset;

                    graphics.moveTo(vbuf[v1], vbuf[v1 + 1]);
                    graphics.lineTo(vbuf[v2], vbuf[v2 + 1]);
                    graphics.lineTo(vbuf[v3], vbuf[v3 + 1]);
                    graphics.close();
                    graphics.stroke();
                }
            }
        }

        if (_vertexFloatCount === 0 || _indexCount === 0) {
            clipper.clipEndWithSlot(slot);
            continue;
        }

        const meshAttachment = attachment as spine.MeshAttachment;

        // fill indices
        ibuf!.set(triangles!, _indexOffset);

        // fill u v
        uvs = meshAttachment.uvs;
        for (let v = _vertexFloatOffset, n = _vertexFloatOffset + _vertexFloatCount, u = 0; v < n; v += _perVertexSize, u += 2) {
            vbuf![v + 2] = uvs[u];           // u
            vbuf![v + 3] = uvs[u + 1];       // v
        }

        attachmentColor = meshAttachment.color,
            slotColor = slot.color;

        fillVertices(skeletonColor, attachmentColor, slotColor, clipper, slot);

        // reset buffer pointer, because clipper maybe realloc a new buffer in file Vertices function.

        vbuf = _buffer!.renderData.vData;
        ibuf = _buffer!.renderData.iData;

        if (_indexCount > 0) {
            for (let ii = _indexOffset, nn = _indexOffset + _indexCount; ii < nn; ii++) {
                ibuf[ii] += _vertexOffset;
            }

            if (worldMat) {
                _m00 = worldMat.m00;
                _m04 = worldMat.m04;
                _m12 = worldMat.m12;
                _m01 = worldMat.m01;
                _m05 = worldMat.m05;
                _m13 = worldMat.m13;
                for (let ii = _vertexFloatOffset, nn = _vertexFloatOffset + _vertexFloatCount; ii < nn; ii += _perVertexSize) {
                    _x = vbuf[ii];
                    _y = vbuf[ii + 1];
                    vbuf[ii] = _x * _m00 + _y * _m04 + _m12;
                    vbuf[ii + 1] = _x * _m01 + _y * _m05 + _m13;
                }
            }
            _buffer!.renderData.advance(_vertexFloatCount / _perVertexSize, _indexCount);
        }

        clipper.clipEndWithSlot(slot);
    }

    clipper.clipEnd();

    if (graphics && _debugBones) {
        let bone: spine.Bone;
        graphics.strokeColor = _boneColor;
        graphics.fillColor = _slotColor; // Root bone color is same as slot color.

        for (let i = 0, n = locSkeleton.bones.length; i < n; i++) {
            bone = locSkeleton.bones[i];
            const x = bone.data.length * bone.a + bone.worldX;
            const y = bone.data.length * bone.c + bone.worldY;

            // Bone lengths.
            graphics.moveTo(bone.worldX, bone.worldY);
            graphics.lineTo(x, y);
            graphics.stroke();

            // Bone origins.
            graphics.circle(bone.worldX, bone.worldY, Math.PI * 1.5);
            graphics.fill();
            if (i === 0) {
                graphics.fillColor = _originColor;
            }
        }
    }
}

function cacheTraverse (worldMat?: Mat4) {

    const frame = _comp!._curFrame;
    if (!frame) return;

    const segments = frame.segments;
    if (segments.length === 0) return;

    _perClipVertexSize =  12;

    let vbuf: Float32Array;
    let ibuf: Uint16Array;
    let material: Material | MaterialInstance | null = null;
    const vertices = frame.vertices;
    const indices = frame.indices;

    let frameVFOffset = 0;
    let frameIndexOffset = 0;
    let segVFCount = 0;
    if (worldMat) {
        _m00 = worldMat.m00;
        _m01 = worldMat.m01;
        _m04 = worldMat.m04;
        _m05 = worldMat.m05;
        _m12 = worldMat.m12;
        _m13 = worldMat.m13;
    }

    const justTranslate = _m00 === 1 && _m01 === 0 && _m04 === 0 && _m05 === 1;
    const needBatch = (_handleVal & FLAG_BATCH);
    const calcTranslate = needBatch && justTranslate;

    let colorOffset = 0;
    const colors = frame.colors;
    let nowColor = colors[colorOffset++];
    let maxVFOffset = nowColor.vfOffset;
    _handleColor(nowColor);

    for (let i = 0, n = segments.length; i < n; i++) {
        const segInfo = segments[i];
        material = _getSlotMaterial(segInfo.blendMode!);
        if (!material) continue;
        if (!_currentMaterial) _currentMaterial = material;
        if (!_currentTexture) _currentTexture = segInfo.tex!;

        if (_mustFlush || material.hash !== _currentMaterial.hash || (segInfo.tex && segInfo.tex !== _currentTexture)) {
            _mustFlush = false;
            if (!_buffer!.texture) {
                _buffer!.texture = segInfo.tex!;
            }
            _buffer = _comp!.requestMeshRenderData(_vfmtFloatSize(_useTint));
            _currentMaterial = material;
            _currentTexture = segInfo.tex!;
            _buffer!.texture = segInfo.tex!;
        }

        _vertexCount = segInfo.vertexCount;
        _indexCount = segInfo.indexCount;

        _buffer!.renderData.reserve(_vertexCount, _indexCount);

        _indexOffset = _buffer!.renderData.indicesStart;
        _vertexOffset = _buffer!.renderData.vertexStart;
        _vfOffset = _buffer!.renderData.vDataOffset;
        vbuf = _buffer!.renderData.vData;
        ibuf = _buffer!.renderData.iData;

        for (let ii = _indexOffset, il = _indexOffset + _indexCount; ii < il; ii++) {
            ibuf[ii] = _vertexOffset + indices[frameIndexOffset++];
        }

        segVFCount = segInfo.vfCount;
        // vbuf.set(vertices.subarray(frameVFOffset, frameVFOffset + segVFCount), _vfOffset)
        const subArray = vertices.subarray(frameVFOffset, frameVFOffset + segVFCount);;
        frameVFOffset += segVFCount;
        // x y r g b a u v r g b a
        let floatOffset = _vfOffset;
        _perClipVertexSize = _vfmtFloatSize(_useTint);

        for(let ii = 0; ii < subArray.length; ii+= 12) {
            vbuf[floatOffset + 0] = subArray[ii * 12 + 0];
            vbuf[floatOffset + 1] = subArray[ii * 12 + 1];
            vbuf[floatOffset + 3] = subArray[ii * 12 + 6];
            vbuf[floatOffset + 4] = subArray[ii * 12 + 7];
            vbuf[floatOffset + 5] = subArray[ii * 12 + 2];
            vbuf[floatOffset + 6] = subArray[ii * 12 + 3];
            vbuf[floatOffset + 7] = subArray[ii * 12 + 4];
            vbuf[floatOffset + 8] = subArray[ii * 12 + 5];
            if(_useTint) {
                vbuf[floatOffset + 9] = subArray[ii * 12 + 8];
                vbuf[floatOffset + 10] = subArray[ii * 12 + 9];
                vbuf[floatOffset + 11] = subArray[ii * 12 + 10];
                vbuf[floatOffset + 12] = subArray[ii * 12 + 11];
            }
            floatOffset += _perClipVertexSize
        }

        if (calcTranslate) {
            for (let ii = _vfOffset, il = _vfOffset + segVFCount; ii < il; ii += _perClipVertexSize) {
                vbuf[ii] += _m12;
                vbuf[ii + 1] += _m13;
            }
        } else if (needBatch) {
            for (let ii = _vfOffset, il = _vfOffset + segVFCount; ii < il; ii += _perClipVertexSize) {
                _x = vbuf[ii];
                _y = vbuf[ii + 1];
                vbuf[ii] = _x * _m00 + _y * _m04 + _m12;
                vbuf[ii + 1] = _x * _m01 + _y * _m05 + _m13;
            }
        }

        _buffer!.renderData.advance(_vertexCount, _indexCount);

        if (!_needColor) continue;

        // handle color
        let frameColorOffset = frameVFOffset - segVFCount;
        for (let ii = _vfOffset, iEnd = _vfOffset + segVFCount; ii < iEnd; ii += _perClipVertexSize, frameColorOffset += 6) {
            if (frameColorOffset >= maxVFOffset) {
                nowColor = colors[colorOffset++];
                _handleColor(nowColor);
                maxVFOffset = nowColor.vfOffset;
            }
            vbuf.set(_finalColor32, ii + 5);
            vbuf.set(_darkColor32, ii + 9);
        }
    }
}