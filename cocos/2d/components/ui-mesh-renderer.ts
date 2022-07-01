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

import { ccclass, help, executionOrder, menu, executeInEditMode } from 'cc.decorator';
import { JSB } from 'internal:constants';
import { ModelRenderer } from '../../core/components/model-renderer';
import { RenderPriority } from '../../core/pipeline/define';
import { IBatcher } from '../renderer/i-batcher';
import { Stage } from '../renderer/stencil-manager';
import { Component } from '../../core/components';
import { legacyCC } from '../../core/global-exports';
import { NativeUIModelProxy } from '../../core/renderer/2d/native-2d';
import { uiRendererManager } from '../framework/ui-renderer-manager';
import { RenderEntity, RenderEntityType } from '../renderer/render-entity';
import { director } from '../../core/director';
import { MeshRenderData, RenderData } from '../renderer/render-data';

/**
 * @en
 * The component of model.
 * When you place particles or models in the UI, you must add this component to render.
 * The component must be placed on a node with the [[MeshRenderer]] or the [[ParticleSystem]].
 *
 * @zh
 * UI 模型基础组件。
 * 当你在 UI 中放置模型或者粒子的时候，必须添加该组件才能渲染。该组件必须放置在带有 [[MeshRenderer]] 或者 [[ParticleSystem]] 组件的节点上。
 */
@ccclass('cc.UIMeshRenderer')
@help('i18n:cc.UIMeshRenderer')
@executionOrder(110)
@menu('UI/UIMeshRenderer')
@executeInEditMode
export class UIMeshRenderer extends Component {
    public get modelComponent () {
        return this._modelComponent;
    }

    private _modelComponent: ModelRenderer | null = null;

    //nativeObj
    private declare _UIModelNativeProxy:NativeUIModelProxy;
    protected _renderEntity : RenderEntity|null = null;
    private modelCount = 0;

    public __preload () {
        this.node._uiProps.uiComp = this;
        if (JSB) {
            this._UIModelNativeProxy = new NativeUIModelProxy();
            this._renderEntity = new RenderEntity(director.root!.batcher2D, RenderEntityType.DYNAMIC);
        }
    }

    public onLoad () {
        if (!this.node._uiProps.uiTransformComp) {
            this.node.addComponent('cc.UITransform');
        }

        this._modelComponent = this.getComponent('cc.ModelRenderer') as ModelRenderer;
        if (!this._modelComponent) {
            console.warn(`node '${this.node && this.node.name}' doesn't have any renderable component`);
            return;
        }
        if (JSB) {
            this._UIModelNativeProxy.attachNode(this.node);
            this.renderEntity!.assignExtraEntityAttrs(this);
        }
    }

    public onDestroy () {
        if (this.node._uiProps.uiComp === this) {
            this.node._uiProps.uiComp = null;
        }
        this._modelComponent = this.getComponent('cc.ModelRenderer') as ModelRenderer;
        if (!this._modelComponent) {
            return;
        }

        this._modelComponent._sceneGetter = null;

        if (JSB) {
            this._UIModelNativeProxy.destroy();
        }
    }

    /**
     * @en Render data submission procedure, it update and assemble the render data to 2D data buffers before all children submission process.
     * Usually called each frame when the ui flow assemble all render data to geometry buffers.
     * Don't call it unless you know what you are doing.
     * @zh 渲染数据组装程序，这个方法会在所有子节点数据组装之前更新并组装当前组件的渲染数据到 UI 的顶点数据缓冲区中。
     * 一般在 UI 渲染流程中调用，用于组装所有的渲染数据到顶点数据缓冲区。
     * 注意：不要手动调用该函数，除非你理解整个流程。
     */
    public updateAssembler (render: IBatcher) {
        if (this._modelComponent) {
            const models = this._modelComponent._collectModels();
            // @ts-expect-error: UIMeshRenderer do not attachToScene
            this._modelComponent._detachFromScene();
            for (let i = 0; i < models.length; i++) {
                if (models[i].enabled) {
                    render.commitModel(this, models[i], this._modelComponent.material);
                }
            }
            return true;
        }

        return false;
    }

    // Native updateAssembler
    public updateRenderData () {
        if (JSB) {
            if (this._modelComponent) {
                const models = this._modelComponent._collectModels();
                // @ts-expect-error: UIMeshRenderer do not attachToScene
                this._modelComponent._detachFromScene(); // JSB
                if (models.length !== this.modelCount) {
                    for (let i = this.modelCount; i < models.length; i++) {
                        this._uploadRenderData(i);
                        this._UIModelNativeProxy.updateModels(models[i]);
                    }
                }
                this.modelCount = models.length;
                this._UIModelNativeProxy.attachDrawInfo();
            }
        }
    }

    private _uploadRenderData (index) {
        if (JSB) {
            const renderData = MeshRenderData.add();
            renderData.initRenderDrawInfo(this);
            this._renderData = renderData;
            this.renderData!.assignExtraDrawInfoAttrs(this);
            this._renderData!.material = this._modelComponent.getMaterialInstance(index);
        }
    }

    /**
     * @en Post render data submission procedure, it's executed after assembler updated for all children.
     * It may assemble some extra render data to the geometry buffers, or it may only change some render states.
     * Don't call it unless you know what you are doing.
     * @zh 后置渲染数据组装程序，它会在所有子节点的渲染数据组装完成后被调用。
     * 它可能会组装额外的渲染数据到顶点数据缓冲区，也可能只是重置一些渲染状态。
     * 注意：不要手动调用该函数，除非你理解整个流程。
     */
    public postUpdateAssembler (render: IBatcher) {
    }

    public update () {
        if (JSB) {
            if (this._modelComponent) {
                const models = this._modelComponent._collectModels();
                if (models.length !== this.modelCount) {
                    this._markForUpdateRenderData();
                }
            }
        }
        this._fitUIRenderQueue();
    }

    private _fitUIRenderQueue () {
        if (!this._modelComponent) {
            return;
        }
        const matNum = this._modelComponent.sharedMaterials.length;
        for (let i = 0; i < matNum; i++) {
            const material = this._modelComponent.getMaterialInstance(i);
            if (material == null) {
                continue;
            }
            const passes = material.passes;
            const passNum = passes.length;
            for (let j = 0; j < passNum; j++) {
                const pass = passes[j];
                // @ts-expect-error private property access
                pass._priority = RenderPriority.MAX - 11;
                // Because the deferred pipeline cannot perform lighting processing on the uimodel,
                // it may even cause the uimodel to crash in the metal backend,
                // so force rendering uimodel in forward pipeline
                material.recompileShaders({ CC_FORCE_FORWARD_SHADING: true }, j);
            }
        }
    }

    // interface
    public markForUpdateRenderData (enable = true) {
    }

    public stencilStage : Stage = Stage.DISABLED;

    public setNodeDirty () {
    }

    public setTextureDirty () {
    }

    // For Native
    public _markForUpdateRenderData (enable = true) {
        uiRendererManager.markDirtyRenderer(this);
    }

    get renderEntity () {
        if (!this._renderEntity) {
            this.initRenderEntity();
        }
        return this._renderEntity;
    }

    protected initRenderEntity () {
        this._renderEntity = new RenderEntity(director.root!.batcher2D, RenderEntityType.DYNAMIC);
    }

    protected _renderData:RenderData|null = null;
    get renderData () {
        return this._renderData;
    }

    set renderData (val:RenderData|null) {
        if (val === this._renderData) {
            return;
        }
        this._renderData = val;
        const entity = this.renderEntity;
        if (entity) {
            if (entity.renderDrawInfoArr.length === 0) {
                entity.addDynamicRenderDrawInfo(this._renderData!.renderDrawInfo);
            } else if (entity.renderDrawInfoArr.length > 0) {
                if (entity.renderDrawInfoArr[0] !== this._renderData!.renderDrawInfo) {
                    entity.setDynamicRenderDrawInfo(this._renderData!.renderDrawInfo, 0);
                }
            }
        }
    }
}

legacyCC.UIMeshRenderer = UIMeshRenderer;
