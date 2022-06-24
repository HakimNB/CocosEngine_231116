/*
 Copyright (c) 2019-2020 Xiamen Yaji Software Co., Ltd.

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

import { JSB } from 'internal:constants';
import { director } from '../../core/director';
import { Material } from '../../core/assets/material';
import { TextureBase } from '../../core/assets/texture-base';
import { Color } from '../../core/math';
import { Pool, RecyclePool } from '../../core/memop';
import { murmurhash2_32_gc } from '../../core/utils/murmurhash2_gc';
import { SpriteFrame } from '../assets/sprite-frame';
import { UIRenderer } from '../framework/ui-renderer';
import { StaticVBAccessor, StaticVBChunk } from './static-vb-accessor';
import { getAttributeStride, vfmtPosUvColor } from './vertex-format';
import { Buffer, BufferInfo, BufferUsageBit, Device, InputAssembler, InputAssemblerInfo, MemoryUsageBit } from '../../core/gfx';
import { assertIsTrue } from '../../core/data/utils/asserts';
import { RenderDrawInfo } from './render-draw-info';
import { StencilManager } from './stencil-manager';
import { Batcher2D } from './batcher-2d';
import { RenderEntity, RenderEntityType } from './render-entity';

/**
 * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
 */
export interface IRenderData {
    x: number;
    y: number;
    z: number;
    u: number;
    v: number;
    color: Color;
}

const DEFAULT_STRIDE = getAttributeStride(vfmtPosUvColor) >> 2;

const _dataPool = new Pool(() => ({
    x: 0,
    y: 0,
    z: 0,
    u: 0,
    v: 0,
    color: Color.WHITE.clone(),
}), 128);

const _pool: RecyclePool<RenderData> = null!;

/**
 * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
 */
export class BaseRenderData {
    get vertexCount () {
        return this._vc;
    }
    get indexCount () {
        return this._ic;
    }
    get stride () {
        return this._floatStride << 2;
    }
    get floatStride () {
        return this._floatStride;
    }
    get vertexFormat () {
        return this._vertexFormat;
    }
    get drawType () {
        return this._drawType;
    }

    public chunk: StaticVBChunk = null!;

    // entity for native
    protected _renderDrawInfo: RenderDrawInfo = null!;
    public get renderDrawInfo () {
        return this._renderDrawInfo;
    }

    protected _material: Material | null = null;
    get material () {
        return this._material!;
    }
    set material (val: Material | null) {
        this._material = val;
        if (this._renderDrawInfo) {
            this._renderDrawInfo.setMaterial(val!);
        }
    }

    protected _dataHash = 0;
    get dataHash () {
        return this._dataHash;
    }
    set dataHash (val:number) {
        this._dataHash = val;
        if (this._renderDrawInfo) {
            this._renderDrawInfo.setDataHash(val);
        }
    }

    public isMeshBuffer = false;

    protected _vc = 0;
    protected _ic = 0;
    protected _floatStride = 0;
    protected _vertexFormat = vfmtPosUvColor;
    protected _drawType = 0;

    protected _batcher: Batcher2D | null = null;
    get batcher () {
        if (!this._batcher) {
            this._batcher = director.root!.batcher2D;
        }
        return this._batcher;
    }

    constructor (vertexFormat = vfmtPosUvColor) {
        this._floatStride = vertexFormat === vfmtPosUvColor ? DEFAULT_STRIDE : (getAttributeStride(vertexFormat) >> 2);
        this._vertexFormat = vertexFormat;
    }

    public isValid () {
        return this._ic > 0 && this.chunk.vertexAccessor;
    }

    // it should be invoked at where a render data is allocated.
    public initRenderDrawInfo (comp:UIRenderer) {
        if (JSB) {
            const renderEntity:RenderEntity = comp.renderEntity!;

            if (renderEntity.renderEntityType === RenderEntityType.STATIC) {
                if (!this._renderDrawInfo) {
                    // initialization should be in native
                    const drawInfo = renderEntity.getStaticRenderDrawInfo();
                    if (drawInfo) {
                        this._renderDrawInfo = drawInfo;
                    }
                }
            } else if (renderEntity.renderEntityType === RenderEntityType.DYNAMIC) {
                if (!this._renderDrawInfo) {
                    this._renderDrawInfo = new RenderDrawInfo(this.batcher);
                    // for no resize() invoking components
                    this.setRenderDrawInfoAttributes();
                    renderEntity.addDynamicRenderDrawInfo(this._renderDrawInfo);
                }
            }
        }
    }

    protected setRenderDrawInfoAttributes () {
        if (JSB) {
            if (!this._renderDrawInfo) {
                return;
            }
            this._renderDrawInfo.setBufferId(this.chunk.bufferId);
            this._renderDrawInfo.setVertexOffset(this.chunk.vertexOffset);
            this._renderDrawInfo.setIndexOffset(this.chunk.meshBuffer.indexOffset);
            this._renderDrawInfo.setVB(this.chunk.vb);
            this._renderDrawInfo.setIB(this.chunk.ib);
            this._renderDrawInfo.setVData(this.chunk.meshBuffer.vData.buffer);
            this._renderDrawInfo.setIData(this.chunk.meshBuffer.iData.buffer);
            this._renderDrawInfo.setVBCount(this._vc);
            this._renderDrawInfo.setIBCount(this._ic);

            this._renderDrawInfo.setDataHash(this.dataHash);
            this._renderDrawInfo.setStencilStage(StencilManager.sharedManager!.stage);//这里存疑，应该每一帧都传一次
            this._renderDrawInfo.setIsMeshBuffer(this.isMeshBuffer);
            this._renderDrawInfo.setMaterial(this.material!);
        }
    }
}

/**
 * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
 */
export class RenderData extends BaseRenderData {
    public static add (vertexFormat = vfmtPosUvColor, accessor?: StaticVBAccessor) {
        const rd = new RenderData();
        rd._floatStride = vertexFormat === vfmtPosUvColor ? DEFAULT_STRIDE : (getAttributeStride(vertexFormat) >> 2);
        rd._vertexFormat = vertexFormat;
        if (!accessor) {
            const batcher = director.root!.batcher2D;
            accessor = batcher.switchBufferAccessor(rd._vertexFormat);
        }
        rd._accessor = accessor;
        return rd;
    }

    public static remove (data: RenderData) {
        // const idx = _pool.data.indexOf(data);
        // if (idx === -1) {
        //     return;
        // }

        data.clear();
        data._accessor = null!;
        // _pool.removeAt(idx);
    }

    get dataLength () {
        return this._data.length;
    }

    set dataLength (length: number) {
        const data: IRenderData[] = this._data;
        if (data.length !== length) {
            // // Free extra data
            const value = data.length;
            let i = 0;
            for (i = length; i < value; i++) {
                _dataPool.free(data[i]);
            }

            for (i = value; i < length; i++) {
                data[i] = _dataPool.alloc();
            }

            data.length = length;
        }

        this.syncRender2dBuffer();
    }

    get data () {
        return this._data;
    }

    public _vertDirty = true;
    get vertDirty () {
        return this._vertDirty;
    }
    set vertDirty (val: boolean) {
        this._vertDirty = val;
        if (this._renderDrawInfo) {
            this._renderDrawInfo.setVertDirty(val);
        }
    }

    protected _textureHash = 0;
    get textureHash () {
        return this._textureHash;
    }
    set textureHash (val:number) {
        this._textureHash = val;
        if (this._renderDrawInfo) {
            if (this.frame) {
                this._renderDrawInfo.setTexture(this.frame.getGFXTexture());
            }
            this._renderDrawInfo.setTextureHash(val);
        }
    }

    protected _blendHash = -1;
    get blendHash () {
        return this._blendHash;
    }
    set blendHash (val:number) {
        this._blendHash = val;
        if (this._renderDrawInfo) {
            this._renderDrawInfo.setBlendHash(val);
        }
    }

    public indices: Uint16Array | null = null;

    public frame;
    public layer = 0;

    public nodeDirty = true;
    public passDirty = true;
    public textureDirty = true;
    public hashDirty = true;

    private _data: IRenderData[] = [];
    private _pivotX = 0;
    private _pivotY = 0;
    private _width = 0;
    private _height = 0;
    protected _accessor: StaticVBAccessor = null!;

    public vertexRow = 1;
    public vertexCol = 1;

    public constructor (vertexFormat = vfmtPosUvColor, accessor?: StaticVBAccessor) {
        super(vertexFormat);
        if (!accessor) {
            accessor = this.batcher.switchBufferAccessor(this._vertexFormat);
        }
        this._accessor = accessor;
    }

    public setDrawType (type = 0) {
        this._drawType = type;
    }

    public resize (vertexCount: number, indexCount: number) {
        if (vertexCount === this._vc && indexCount === this._ic && this.chunk) return;
        this._vc = vertexCount;
        this._ic = indexCount;
        if (this.chunk) {
            this._accessor.recycleChunk(this.chunk);
            this.chunk = null!;
        }
        // renderData always have chunk
        this.chunk = this._accessor.allocateChunk(vertexCount, indexCount)!;
        this.updateHash();

        if (JSB) {
            // for sync vData and iData address to native
            this.setRenderDrawInfoAttributes();
        }
    }

    protected setRenderDrawInfoAttributes () {
        if (JSB) {
            if (!this._renderDrawInfo) {
                return;
            }
            super.setRenderDrawInfoAttributes();
            this._renderDrawInfo.setTexture(this.frame?.getGFXTexture());
            this._renderDrawInfo.setTextureHash(this.textureHash);
            this._renderDrawInfo.setSampler(this.frame?.getGFXSampler());
            this._renderDrawInfo.setBlendHash(this.blendHash);
        }
    }

    public assignExtraDrawInfoAttrs (comp: UIRenderer) {
        if (JSB) {
            if (!this._renderDrawInfo || !comp) {
                return;
            }
            this._renderDrawInfo.setNode(comp.node);
            this._renderDrawInfo.enabled = comp.enabled;
        }
    }

    // Initial advance render data for native
    protected syncRender2dBuffer () {
        if (JSB) {
            if (!this._renderDrawInfo) {
                return;
            }
            this.renderDrawInfo.initRender2dBuffer(this.dataLength, this.floatStride);
            this.renderDrawInfo.initDrawType(this.drawType);
            this.renderDrawInfo.setRender2dBufferToNative();
        }
    }

    public resizeAndCopy (vertexCount: number, indexCount: number) {
        if (vertexCount === this._vc && indexCount === this._ic && this.chunk) return;
        this._vc = vertexCount;
        this._ic = indexCount;
        const oldChunk = this.chunk;
        // renderData always have chunk
        this.chunk = this._accessor.allocateChunk(vertexCount, indexCount)!;
        // Copy old chunk data
        if (oldChunk) {
            this.chunk.vb.set(oldChunk.vb);
            this._accessor.recycleChunk(oldChunk);
        }
        this.updateHash();
    }

    public getMeshBuffer () {
        if (this.chunk && this._accessor) {
            return this._accessor.getMeshBuffer(this.chunk.bufferId);
        } else {
            return null;
        }
    }

    public updateNode (comp: UIRenderer) {
        this.layer = comp.node.layer;
        this.nodeDirty = false;
        this.hashDirty = true;
    }

    public updatePass (comp: UIRenderer) {
        this.material = comp.getRenderMaterial(0)!;
        this.blendHash = comp.blendHash;
        this.passDirty = false;
        this.hashDirty = true;
    }

    public updateTexture (frame: SpriteFrame | TextureBase) {
        this.frame = frame;
        this.textureHash = frame.getHash();
        this.textureDirty = false;
        this.hashDirty = true;
    }

    public updateHash () {
        const bid = this.chunk ? this.chunk.bufferId : -1;
        const hashString = `${bid}${this.layer} ${this.blendHash} ${this.textureHash}`;
        this.dataHash = murmurhash2_32_gc(hashString, 666);
        this.hashDirty = false;
    }

    public updateRenderData (comp: UIRenderer, frame: SpriteFrame | TextureBase) {
        if (this.passDirty) {
            this.material = comp.getRenderMaterial(0)!;
            this.blendHash = comp.blendHash;
            this.passDirty = false;
            this.hashDirty = true;
        }
        if (this.nodeDirty) {
            const renderScene = comp.node.scene ? comp._getRenderScene() : null;
            this.layer = comp.node.layer;
            // Hack for updateRenderData when node not add to scene
            if (renderScene !== null) {
                this.nodeDirty = false;
            }
            this.hashDirty = true;
        }
        if (this.textureDirty) {
            this.frame = frame;
            this.textureHash = frame.getHash();
            this.textureDirty = false;
            this.hashDirty = true;
        }
        if (this.hashDirty) {
            this.updateHash();
        }

        // Hack Do not update pre frame
        if (JSB) {
            // for sync vData and iData address to native
            this.setRenderDrawInfoAttributes();
            // sync shared buffer to native
            this.copyRenderDataToSharedBuffer();
        }
    }

    copyRenderDataToSharedBuffer () {
        if (JSB) {
            const entity = this._renderDrawInfo;
            const sharedBuffer = entity.render2dBuffer;

            if (sharedBuffer.length < this.floatStride * this._data.length) {
                console.error('Vertex count doesn\'t match.');
                return;
            }

            entity.fillRender2dBuffer(this._data);
        }
    }

    public updateSizeNPivot (width: number, height: number, pivotX: number, pivotY: number) {
        if (width !== this._width
            || height !== this._height
            || pivotX !== this._pivotX
            || pivotY !== this._pivotY) {
            this._width = width;
            this._height = height;
            this._pivotX = pivotX;
            this._pivotY = pivotY;
            this.vertDirty = true;
        }
    }

    public clear () {
        this.resize(0, 0);
        this._data.length = 0;
        this._pivotX = 0;
        this._pivotY = 0;
        this._width = 0;
        this._height = 0;
        this.indices = null;
        this.vertDirty = true;
        this.material = null;

        this.nodeDirty = true;
        this.passDirty = true;
        this.textureDirty = true;
        this.hashDirty = true;

        this.layer = 0;
        this.blendHash = -1;
        this.frame = null;
        this.textureHash = 0;
        this.dataHash = 0;
        if (JSB) {
            this._renderDrawInfo.clear();
        }
    }
}

/**
 * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
 */
export class MeshRenderData extends BaseRenderData {
    public static add (vertexFormat = vfmtPosUvColor) {
        const rd = _meshDataPool.add();
        rd._floatStride = vertexFormat === vfmtPosUvColor ? DEFAULT_STRIDE : (getAttributeStride(vertexFormat) >> 2);
        rd._vertexFormat = vertexFormat;
        return rd;
    }

    public static remove (data: MeshRenderData) {
        const idx = _meshDataPool.data.indexOf(data);
        if (idx === -1) {
            return;
        }

        _meshDataPool.data[idx].clear();
        _meshDataPool.removeAt(idx);
    }

    /**
     * @deprecated
     */
    set formatByte (value: number) {}
    get formatByte () { return this.stride; }

    get floatStride () { return this._floatStride; }

    /**
     * Index of Float32Array: vData
     */
    get vDataOffset () { return this._byteLength >>> 2; }

    public isMeshBuffer = true;
    public vData: Float32Array;
    public iData: Uint16Array;
    /**
     * First vertex used in the current IA
     */
    public vertexStart = 0;
    /**
     * Vertex count used in the current IA
     */
    public vertexRange = 0;
    /**
     * First index used in the current IA
     */
    public indexStart = 0;
    /**
     * Index count used in the current IA
     */
    public indexRange = 0;
    // only for graphics
    public lastFilledIndex = 0;
    public lastFilledVertex = 0;

    private _byteLength = 0;
    private _vertexBuffers: Buffer[] = [];
    private _indexBuffer: Buffer = null!;

    private _iaPool: RecyclePool<InputAssembler> | null = null;
    private _iaInfo: InputAssemblerInfo = null!;

    constructor (vertexFormat = vfmtPosUvColor) {
        super(vertexFormat);
        this.vData = new Float32Array(256 * this.stride);
        this.iData = new Uint16Array(256 * 6);
    }

    public request (vertexCount: number, indexCount: number) {
        const byteOffset = this._byteLength + vertexCount * this.stride;
        const succeed = this.reserve(vertexCount, indexCount);
        if (!succeed) return false;
        this._vc += vertexCount; // vertexOffset
        this._ic += indexCount; // indicesOffset
        this._byteLength = byteOffset; // byteOffset
        this.vertexRange = this._vc;
        this.indexRange = this._ic;
        return true;
    }

    public reserve (vertexCount: number, indexCount: number) {
        const newVBytes = this._byteLength + vertexCount * this.stride;
        const newICount = this.indexCount + indexCount;

        if (vertexCount + this.vertexCount > 65535) {
            return false;
        }

        let byteLength = this.vData.byteLength;
        let indicesLength = this.iData.length;
        let vCount = this.vData.length;
        let iCount = this.iData.length;
        if (newVBytes > byteLength || newICount > indicesLength) {
            while (byteLength < newVBytes || indicesLength < newICount) {
                vCount *= 2;
                iCount *= 2;

                byteLength = vCount * 4;
                indicesLength = iCount;
            }

            this._reallocBuffer(vCount, iCount);
        }
        return true;
    }

    // overload
    // Resize buffer and IA range
    public resize (vertexCount: number, indexCount: number) {
        const byteLength = vertexCount * this.stride;
        assertIsTrue(vertexCount >= 0 && indexCount >= 0 && byteLength <= this.vData.byteLength && indexCount <= this.iData.length);
        this._vc = vertexCount;
        this._ic = indexCount;
        this._byteLength = byteLength;
        this.updateRange(0, vertexCount, 0, indexCount);
    }

    // Only resize IA range
    public updateRange (vertOffset: number, vertexCount: number, indexOffset: number, indexCount: number) {
        assertIsTrue(vertexCount >= 0 && indexCount >= 0 && vertexCount <= this._vc && indexCount <= this._ic);
        this.vertexStart = vertOffset;
        this.indexStart = indexOffset;
        this.vertexRange = vertexCount;
        this.indexRange = indexCount;
    }

    public requestIA (device: Device) {
        this._initIAInfo(device);
        const ia = this._iaPool!.add();
        ia.firstIndex = this.indexStart;
        ia.indexCount = this.indexRange;
        return ia;
    }

    public uploadBuffers () {
        if (this._byteLength === 0 || !this._vertexBuffers[0] || !this._indexBuffer) {
            return;
        }

        const indexCount = this._ic;
        const verticesData = new Float32Array(this.vData.buffer, 0, this._byteLength >> 2);
        const indicesData = new Uint16Array(this.iData.buffer, 0, indexCount);

        const vertexBuffer = this._vertexBuffers[0];
        if (this._byteLength > vertexBuffer.size) {
            vertexBuffer.resize(this._byteLength);
        }
        vertexBuffer.update(verticesData);

        const indexBytes = indexCount << 1;
        if (indexBytes > this._indexBuffer.size) {
            this._indexBuffer.resize(indexBytes);
        }
        this._indexBuffer.update(indicesData);
    }

    public freeIAPool () {
        if (this._iaPool) {
            this._iaPool.reset();
        }
    }

    public reset () {
        this._vc = 0;
        this._ic = 0;
        this._byteLength = 0;
        this.vertexStart = 0;
        this.vertexRange = 0;
        this.indexStart = 0;
        this.indexRange = 0;
        this.lastFilledIndex = 0;
        this.lastFilledVertex = 0;
        this.material = null;
        this.freeIAPool();
    }

    public clear () {
        this.reset();
        if (this._iaPool) {
            this._iaPool.destroy();
        }
        if (this._vertexBuffers[0]) {
            this._vertexBuffers[0].destroy();
            this._vertexBuffers = [];
        }
        this._iaInfo = null!;
        this.vData = new Float32Array(256 * this.stride);
        this.iData = new Uint16Array(256 * 6);
    }

    protected _initIAInfo (device: Device) {
        if (!this._iaInfo) {
            const vbStride = this.stride;
            const vbs = this._vertexBuffers;
            if (!vbs.length) {
                vbs.push(device.createBuffer(new BufferInfo(
                    BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST,
                    MemoryUsageBit.DEVICE,
                    vbStride,
                    vbStride,
                )));
            }
            const ibStride = Uint16Array.BYTES_PER_ELEMENT;
            if (!this._indexBuffer) {
                this._indexBuffer = device.createBuffer(new BufferInfo(
                    BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST,
                    MemoryUsageBit.DEVICE,
                    ibStride,
                    ibStride,
                ));
            }
            this._iaInfo = new InputAssemblerInfo(this._vertexFormat, vbs, this._indexBuffer);
            this._iaPool =  new RecyclePool(() => device.createInputAssembler(this._iaInfo), 1, (ia) => { ia.destroy(); });
        }
    }

    protected _reallocBuffer (vCount, iCount) {
        // copy old data
        const oldVData = this.vData;
        this.vData = new Float32Array(vCount);
        if (oldVData) {
            this.vData.set(oldVData, 0);
        }
        const oldIData = this.iData;
        this.iData = new Uint16Array(iCount);
        if (oldIData) {
            this.iData.set(oldIData, 0);
        }
    }
}

const _meshDataPool: RecyclePool<MeshRenderData> = new RecyclePool(() => new MeshRenderData(), 32);
