/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

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

import { Mat4, Node } from '../../cocos/core';
import {Skeleton} from './skeleton';
import spine from './lib/spine-core.js';
import { JSB } from '../../editor/exports/populate-internal-constants';
import { FrameBoneInfo } from './skeleton-cache';

const EmptyHandle = () => { }
const ATTACHED_ROOT_NAME = 'ATTACHED_NODE_TREE';
const ATTACHED_PRE_NAME = 'ATTACHED_NODE:';
const _tempMat4 = new Mat4();


interface BoneNode extends Node {
    _bone:spine.Bone;
    _boneIndex:number;
    _toRemove:boolean;
    _calculWorldMatrix:()=>void;
    _mulMat: (m1:Mat4, m2:Mat4, m3:Mat4)=>void;
}

const limitNode = (node:BoneNode) =>{
    // attached node's world matrix update per frame
    Object.defineProperty(node, '_worldMatDirty', {
        get () { return true; },
        set (value) {/* do nothing */ }
    });
    // shield world matrix calculate interface
    node._calculWorldMatrix = EmptyHandle;
    node._mulMat = EmptyHandle;
};
/**
 * !#en Attach node tool
 * !#zh 挂点工具类
 * @class sp.AttachUtil
 */
export class AttachUtil {

    protected _inited = false;
    protected _skeleton:spine.Skeleton|null = null;
    protected _skeletonNode:Node|null = null;
    protected _skeletonComp:Skeleton|null = null;

    protected _attachedRootNode:Node|null = null;
    protected _attachedNodeArray:(BoneNode|null)[] = [];
    protected _boneIndexToNode:{[key:number]:BoneNode} = {};

    constructor () {
        this._inited = false;
        this._skeleton = null;
        this._skeletonNode = null;
        this._skeletonComp = null;

        this._attachedRootNode = null;
        this._attachedNodeArray = [];
        this._boneIndexToNode = {};
    }

    init (skeletonComp:Skeleton) {
        this._inited = true;
        this._skeleton = skeletonComp._skeleton;
        this._skeletonNode = skeletonComp.node;
        this._skeletonComp = skeletonComp;
    }

    reset () {
        this._inited = false;
        this._skeleton = null;
        this._skeletonNode = null;
        this._skeletonComp = null;
    }

    _prepareAttachNode () {
        const armature = this._skeleton;
        if (!armature) {
            return;
        }

        let rootNode = this._skeletonNode!.getChildByName(ATTACHED_ROOT_NAME);
        if (!rootNode || !rootNode.isValid) {
            rootNode = new Node(ATTACHED_ROOT_NAME);
            limitNode(rootNode as BoneNode);
            this._skeletonNode!.addChild(rootNode);
        }

        const isCached = this._skeletonComp!.isAnimationCached();
        if (isCached && this._skeletonComp!._frameCache) {
            this._skeletonComp!._frameCache.enableCacheAttachedInfo();
        }

        this._attachedRootNode = rootNode;
        return rootNode;
    }

    _buildBoneAttachedNode (bone:spine.Bone, boneIndex:number) {
        const boneNodeName = ATTACHED_PRE_NAME + bone.data.name;
        const boneNode = new Node(boneNodeName) as BoneNode;
        this._buildBoneRelation(boneNode, bone, boneIndex);
        return boneNode;
    }

    _buildBoneRelation (boneNode:BoneNode, bone:spine.Bone, boneIndex:number) {
        limitNode(boneNode);
        boneNode._bone = bone;
        boneNode._boneIndex = boneIndex;
        this._attachedNodeArray.push(boneNode);
        this._boneIndexToNode[boneIndex] = boneNode;
    }

    /**
     * !#en Gets attached root node.
     * !#zh 获取挂接节点树的根节点
     * @method getAttachedRootNode
     * @return {cc.Node}
     */
    getAttachedRootNode ():Node {
        return this._attachedRootNode!;
    }

    /**
     * !#en Gets attached node which you want.
     * !#zh 获得对应的挂点
     * @method getAttachedNodes
     * @param {String} boneName
     * @return {Node[]}
     */
    getAttachedNodes (boneName:string):Node[] {
        const nodeArray = this._attachedNodeArray;
        const res:Node[] = [];
        if (!this._inited) return res;
        for (let i = 0, n = nodeArray.length; i < n; i++) {
            const boneNode = nodeArray[i];
            if (!boneNode || !boneNode.isValid) continue;
            if (boneNode.name === ATTACHED_PRE_NAME + boneName) {
                res.push(boneNode);
            }
        }
        return res;
    }

    _rebuildNodeArray () {
        const findMap = this._boneIndexToNode = {};
        const oldNodeArray = this._attachedNodeArray;
        const nodeArray:BoneNode[] = this._attachedNodeArray = [];
        for (let i = 0, n = oldNodeArray.length; i < n; i++) {
            const boneNode = oldNodeArray[i];
            if (!boneNode || !boneNode.isValid || boneNode._toRemove) continue;
            nodeArray.push(boneNode);
            findMap[boneNode._boneIndex] = boneNode;
        }
    }

    _sortNodeArray () {
        const nodeArray = this._attachedNodeArray;
        nodeArray.sort((a, b) => {
            return a!._boneIndex < b!._boneIndex ? -1 : 1;
        });
    }

    _getNodeByBoneIndex (boneIndex:number) {
        const findMap = this._boneIndexToNode;
        const boneNode = findMap[boneIndex];
        if (!boneNode || !boneNode.isValid) return null;
        return boneNode;
    }

    /**
     * !#en Destroy attached node which you want.
     * !#zh 销毁对应的挂点
     * @method destroyAttachedNodes
     * @param {String} boneName
     */
    destroyAttachedNodes (boneName:string) {
        if (!this._inited) return;

        const nodeArray = this._attachedNodeArray;
        const markTree = (rootNode) => {
            const children = rootNode.children;
            for (let i = 0, n = children.length; i < n; i++) {
                const c = children[i];
                if (c) markTree(c);
            }
            rootNode._toRemove = true;
        }

        for (let i = 0, n = nodeArray.length; i < n; i++) {
            const boneNode = nodeArray[i];
            if (!boneNode || !boneNode.isValid) continue;

            const delName = boneNode.name.split(ATTACHED_PRE_NAME)[1];
            if (delName === boneName) {
                markTree(boneNode);
                boneNode.removeFromParent();
                boneNode.destroy();
                nodeArray[i] = null;
            }
        }

        this._rebuildNodeArray();
    }

    /**
     * !#en Traverse all bones to generate the minimum node tree containing the given bone names,
     * NOTE that make sure the skeleton has initialized before calling this interface.
     * !#zh 遍历所有插槽，生成包含所有给定插槽名称的最小节点树，注意，调用该接口前请确保骨骼动画已经初始化好。
     * @method generateAttachedNodes
     * @param {String} boneName
     * @return {Node[]} attached node array
     */
    generateAttachedNodes (boneName:string) {
        const targetNodes:BoneNode[] = [];
        if (!this._inited) return targetNodes;

        const rootNode = this._prepareAttachNode();
        if (!rootNode) return targetNodes;

        const res:spine.Bone[] = [];
        const bones = this._skeleton!.bones;
        for (let i = 0, n = bones.length; i < n; i++) {
            const bone = bones[i];
            const boneData = bone.data;
            if (boneData.name === boneName) {
                res.push(bone);
            }
        }

        const buildBoneTree = (bone:spine.Bone):BoneNode|undefined => {
            if (!bone) return;
            const boneData = bone.data;
            let boneNode = this._getNodeByBoneIndex(boneData.index);
            if (boneNode) return boneNode;

            boneNode = this._buildBoneAttachedNode(bone, boneData.index);

            const parentBoneNode = buildBoneTree(bone.parent) || rootNode;
            boneNode.parent = parentBoneNode as any;

            return boneNode;
        };

        for (let i = 0, n = res.length; i < n; i++) {
            const targetNode = buildBoneTree(res[i]);
            targetNodes.push(targetNode!);
        }

        this._sortNodeArray();
        return targetNodes;
    }

    /**
     * !#en Destroy all attached node.
     * !#zh 销毁所有挂点
     * @method destroyAllAttachedNodes
     */
    destroyAllAttachedNodes () {
        this._attachedRootNode = null;
        this._attachedNodeArray.length = 0;
        this._boneIndexToNode = {};
        if (!this._inited) return;

        let rootNode = this._skeletonNode!.getChildByName(ATTACHED_ROOT_NAME);
        if (rootNode) {
            rootNode.removeFromParent();
            rootNode.destroy();
            rootNode = null;
        }
    }

    /**
     * !#en Traverse all bones to generate a tree containing all bones nodes, NOTE that make sure the skeleton has initialized before calling this interface.
     * !#zh 遍历所有插槽，生成包含所有插槽的节点树，注意，调用该接口前请确保骨骼动画已经初始化好。
     * @method generateAllAttachedNodes
     * @return {cc.Node} root node
     */
    generateAllAttachedNodes () {
        if (!this._inited) return;

        // clear all records
        this._boneIndexToNode = {};
        this._attachedNodeArray.length = 0;

        const rootNode = this._prepareAttachNode();
        if (!rootNode) return;

        const bones = this._skeleton!.bones;
        for (let i = 0, n = bones.length; i < n; i++) {
            const bone = bones[i];
            const boneData = bone.data;
            let parentNode:BoneNode|null = null;
            if (bone.parent) {
                const parentIndex = bone.parent.data.index;
                parentNode = this._boneIndexToNode[parentIndex];
            } else {
                parentNode = rootNode as BoneNode;
            }

            if (parentNode) {
                let boneNode = parentNode.getChildByName(ATTACHED_PRE_NAME + boneData.name);
                if (!boneNode || !boneNode.isValid) {
                    boneNode = this._buildBoneAttachedNode(bone, boneData.index);
                    parentNode.addChild(boneNode);
                } else {
                    this._buildBoneRelation(boneNode, bone, boneData.index);
                }
            }
        }
        return rootNode;
    }

    _hasAttachedNode () {
        if (!this._inited) return false;

        const attachedRootNode = this._skeletonNode!.getChildByName(ATTACHED_ROOT_NAME);
        return !!attachedRootNode;
    }

    _associateAttachedNode () {
        if (!this._inited) return;

        const rootNode = this._skeletonNode!.getChildByName(ATTACHED_ROOT_NAME);
        if (!rootNode || !rootNode.isValid) return;
        this._attachedRootNode = rootNode;

        // clear all records
        this._boneIndexToNode = {};
        const nodeArray = this._attachedNodeArray;
        nodeArray.length = 0;
        limitNode(rootNode as BoneNode);

        if (!JSB) {
            const isCached = this._skeletonComp!.isAnimationCached();
            if (isCached && this._skeletonComp!._frameCache) {
                this._skeletonComp!._frameCache.enableCacheAttachedInfo();
            }
        }

        const bones = this._skeleton!.bones;
        for (let i = 0, n = bones.length; i < n; i++) {
            const bone = bones[i];
            const boneData = bone.data;
            let parentNode:BoneNode| null= null;
            if (bone.parent) {
                const parentIndex = bone.parent.data.index;
                parentNode = this._boneIndexToNode[parentIndex];
            } else {
                parentNode = rootNode as BoneNode;
            }

            if (parentNode) {
                const boneNode = parentNode.getChildByName(ATTACHED_PRE_NAME + boneData.name);
                if (boneNode && boneNode.isValid) {
                    this._buildBoneRelation(boneNode, bone, boneData.index);
                }
            }
        }
    }

    _syncAttachedNode () {
        if (!this._inited) return;

        const rootNode = this._attachedRootNode;
        const nodeArray = this._attachedNodeArray;
        if (!rootNode || !rootNode.isValid) {
            this._attachedRootNode = null;
            nodeArray.length = 0;
            return;
        }

        const rootMatrix = this._skeletonNode!.worldMatrix;
        Mat4.copy(rootNode.worldMatrix, rootMatrix);

        let boneInfos:FrameBoneInfo[]|null = null;
        const isCached = this._skeletonComp!.isAnimationCached();
        if (isCached) {
            boneInfos = this._skeletonComp!._curFrame && this._skeletonComp!._curFrame.boneInfos;
        } else {
            boneInfos = this._skeleton!.bones;
        }

        if (!boneInfos) return;

        const mulMat = (this._skeletonNode! as BoneNode)._mulMat;
        const matrixHandle = (nodeMat:Mat4, parentMat:Mat4, bone:FrameBoneInfo) =>{
            const tm = _tempMat4;
            tm.m00 = bone.a;
            tm.m01 = bone.c;
            tm.m04 = bone.b;
            tm.m05 = bone.d;
            tm.m12 = bone.worldX;
            tm.m13 = bone.worldY;
            mulMat(nodeMat, parentMat, _tempMat4);
        };

        let nodeArrayDirty = false;
        for (let i = 0, n = nodeArray.length; i < n; i++) {
            const boneNode = nodeArray[i];
            // Node has been destroy
            if (!boneNode || !boneNode.isValid) {
                nodeArray[i] = null;
                nodeArrayDirty = true;
                continue;
            }
            const bone = boneInfos[boneNode._boneIndex];
            // Bone has been destroy
            if (!bone) {
                boneNode.removeFromParent();
                boneNode.destroy();
                nodeArray[i] = null;
                nodeArrayDirty = true;
                continue;
            }
            matrixHandle(boneNode.worldMatrix, rootNode.worldMatrix, bone);
        }
        if (nodeArrayDirty) {
            this._rebuildNodeArray();
        }
    }
}
