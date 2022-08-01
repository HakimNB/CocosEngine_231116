/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
declare namespace jsb {
    // type Node = any;
    type Event               = any;
    type NodeEventProcessor  = any;
    type Mat4                = any;
    type Mat3                = any;
    // type Vec2                = any;
    type Vec3                = any;
    type Vec4                = any;
    type Quaternion          = any;
    type Rect                = any;
    // type Color               = any;
    type NativeDep           = any;
    type Renderer            = any;
    type ModelRenderer       = any;
    type ResizableBuffer     = any;
    type Size                = any;
    type DataPoolManager     = any;
    // type IProgramInfo        = any;
    type ReflectionComp      = any;
    type SAXDelegator        = any;
    type Data                = any;
    type NodeUiProperties    = any;
    type CallbacksInvoker    = any;

    type AnyFunction = any;

    type Component = any; // should be export latter
}

// namespace cc {
//     type Component = any;
// }

declare namespace ns {
    type RenderWindow            = any;
    type InstancedAttributeBlock = any;
}
declare namespace nr {
    type InstancedAttributeBlock = any;
    // type PipelineSceneData       = any;
    type PipelineUBO             = any;
    type RenderElem              = any;
    type RenderQueue             = any;
    type UIPhase                 = any;
}
declare namespace gfx {
    
    
    // ts : gfx.Size
    // cpp: cc::gfx::Size
    export class Size {
        // public_fields list
        x   : number;   // unsigned int
        y   : number;   // unsigned int
        z   : number;   // unsigned int
        // methods list
        copy(rhs: gfx.Size):gfx.Size; // cc::gfx::Size
    } // endof class Size
    
    
    // ts : gfx.DeviceCaps
    // cpp: cc::gfx::DeviceCaps
    export class DeviceCaps {
        // public_fields list
        maxVertexAttributes             : number;   // unsigned int
        maxVertexUniformVectors         : number;   // unsigned int
        maxFragmentUniformVectors       : number;   // unsigned int
        maxTextureUnits                 : number;   // unsigned int
        maxImageUnits                   : number;   // unsigned int
        maxVertexTextureUnits           : number;   // unsigned int
        maxColorRenderTargets           : number;   // unsigned int
        maxShaderStorageBufferBindings  : number;   // unsigned int
        maxShaderStorageBlockSize       : number;   // unsigned int
        maxUniformBufferBindings        : number;   // unsigned int
        maxUniformBlockSize             : number;   // unsigned int
        maxTextureSize                  : number;   // unsigned int
        maxCubeMapTextureSize           : number;   // unsigned int
        uboOffsetAlignment              : number;   // unsigned int
        maxComputeSharedMemorySize      : number;   // unsigned int
        maxComputeWorkGroupInvocations  : number;   // unsigned int
        maxComputeWorkGroupSize         : gfx.Size; // cc::gfx::Size
        maxComputeWorkGroupCount        : gfx.Size; // cc::gfx::Size
        supportQuery                    : boolean;  // bool
        clipSpaceMinZ                   : number;   // float
        screenSpaceSignY                : number;   // float
        clipSpaceSignY                  : number;   // float
        // methods list
        copy(rhs: gfx.DeviceCaps):gfx.DeviceCaps; // cc::gfx::DeviceCaps
    } // endof class DeviceCaps
    
    
    // ts : gfx.Offset
    // cpp: cc::gfx::Offset
    export class Offset {
        // public_fields list
        x   : number;   // int
        y   : number;   // int
        z   : number;   // int
        // methods list
        copy(rhs: gfx.Offset):gfx.Offset; // cc::gfx::Offset
    } // endof class Offset
    
    
    // ts : gfx.Rect
    // cpp: cc::gfx::Rect
    export class Rect {
        // public_fields list
        x       : number;   // int
        y       : number;   // int
        width   : number;   // unsigned int
        height  : number;   // unsigned int
        // methods list
        copy(rhs: gfx.Rect):gfx.Rect; // cc::gfx::Rect
    } // endof class Rect
    
    
    // ts : gfx.Extent
    // cpp: cc::gfx::Extent
    export class Extent {
        // public_fields list
        width   : number;   // unsigned int
        height  : number;   // unsigned int
        depth   : number;   // unsigned int
        // methods list
        copy(rhs: gfx.Extent):gfx.Extent; // cc::gfx::Extent
    } // endof class Extent
    
    
    // ts : gfx.TextureSubresLayers
    // cpp: cc::gfx::TextureSubresLayers
    export class TextureSubresLayers {
        // public_fields list
        mipLevel        : number;   // unsigned int
        baseArrayLayer  : number;   // unsigned int
        layerCount      : number;   // unsigned int
        // methods list
        copy(rhs: gfx.TextureSubresLayers):gfx.TextureSubresLayers; // cc::gfx::TextureSubresLayers
    } // endof class TextureSubresLayers
    
    
    // ts : gfx.TextureSubresRange
    // cpp: cc::gfx::TextureSubresRange
    export class TextureSubresRange {
        // public_fields list
        baseMipLevel    : number;   // unsigned int
        levelCount      : number;   // unsigned int
        baseArrayLayer  : number;   // unsigned int
        layerCount      : number;   // unsigned int
        // methods list
        copy(rhs: gfx.TextureSubresRange):gfx.TextureSubresRange; // cc::gfx::TextureSubresRange
    } // endof class TextureSubresRange
    
    
    // ts : gfx.TextureCopy
    // cpp: cc::gfx::TextureCopy
    export class TextureCopy {
        // public_fields list
        srcSubres   : gfx.TextureSubresLayers;  // cc::gfx::TextureSubresLayers
        srcOffset   : gfx.Offset;               // cc::gfx::Offset
        dstSubres   : gfx.TextureSubresLayers;  // cc::gfx::TextureSubresLayers
        dstOffset   : gfx.Offset;               // cc::gfx::Offset
        extent      : gfx.Extent;               // cc::gfx::Extent
        // methods list
        copy(rhs: gfx.TextureCopy):gfx.TextureCopy; // cc::gfx::TextureCopy
    } // endof class TextureCopy
    
    
    // ts : gfx.TextureBlit
    // cpp: cc::gfx::TextureBlit
    export class TextureBlit {
        // public_fields list
        srcSubres   : gfx.TextureSubresLayers;  // cc::gfx::TextureSubresLayers
        srcOffset   : gfx.Offset;               // cc::gfx::Offset
        srcExtent   : gfx.Extent;               // cc::gfx::Extent
        dstSubres   : gfx.TextureSubresLayers;  // cc::gfx::TextureSubresLayers
        dstOffset   : gfx.Offset;               // cc::gfx::Offset
        dstExtent   : gfx.Extent;               // cc::gfx::Extent
        // methods list
        copy(rhs: gfx.TextureBlit):gfx.TextureBlit; // cc::gfx::TextureBlit
    } // endof class TextureBlit
    
    
    // ts : gfx.BufferTextureCopy
    // cpp: cc::gfx::BufferTextureCopy
    export class BufferTextureCopy {
        // public_fields list
        buffOffset      : number;                   // unsigned int
        buffStride      : number;                   // unsigned int
        buffTexHeight   : number;                   // unsigned int
        texOffset       : gfx.Offset;               // cc::gfx::Offset
        texExtent       : gfx.Extent;               // cc::gfx::Extent
        texSubres       : gfx.TextureSubresLayers;  // cc::gfx::TextureSubresLayers
        // methods list
        copy(rhs: gfx.BufferTextureCopy):gfx.BufferTextureCopy; // cc::gfx::BufferTextureCopy
    } // endof class BufferTextureCopy
    
    
    // ts : gfx.Viewport
    // cpp: cc::gfx::Viewport
    export class Viewport {
        // public_fields list
        left    : number;   // int
        top     : number;   // int
        width   : number;   // unsigned int
        height  : number;   // unsigned int
        minDepth: number;   // float
        maxDepth: number;   // float
        // methods list
        copy(rhs: gfx.Viewport):gfx.Viewport; // cc::gfx::Viewport
    } // endof class Viewport
    
    
    // ts : gfx.Color
    // cpp: cc::gfx::Color
    export class Color {
        // public_fields list
        x   : number;   // float
        y   : number;   // float
        z   : number;   // float
        w   : number;   // float
        // methods list
        copy(rhs: gfx.Color):gfx.Color; // cc::gfx::Color
    } // endof class Color
    
    
    // ts : gfx.BindingMappingInfo
    // cpp: cc::gfx::BindingMappingInfo
    export class BindingMappingInfo {
        // public_fields list
        maxBlockCounts          : number[]; // std::vector<unsigned int>
        maxSamplerTextureCounts : number[]; // std::vector<unsigned int>
        maxSamplerCounts        : number[]; // std::vector<unsigned int>
        maxTextureCounts        : number[]; // std::vector<unsigned int>
        maxBufferCounts         : number[]; // std::vector<unsigned int>
        maxImageCounts          : number[]; // std::vector<unsigned int>
        maxSubpassInputCounts   : number[]; // std::vector<unsigned int>
        setIndices              : number[]; // std::vector<unsigned int>
        // methods list
        copy(rhs: gfx.BindingMappingInfo):gfx.BindingMappingInfo; // cc::gfx::BindingMappingInfo
    } // endof class BindingMappingInfo
    
    
    // ts : gfx.SwapchainInfo
    // cpp: cc::gfx::SwapchainInfo
    export class SwapchainInfo {
        // public_fields list
        windowHandle: ArrayBuffer;  // void*
        vsyncMode   : number;       // cc::gfx::VsyncMode
        width       : number;       // unsigned int
        height      : number;       // unsigned int
        // methods list
        copy(rhs: gfx.SwapchainInfo):gfx.SwapchainInfo; // cc::gfx::SwapchainInfo
    } // endof class SwapchainInfo
    
    
    // ts : gfx.DeviceInfo
    // cpp: cc::gfx::DeviceInfo
    export class DeviceInfo {
        // public_fields list
        bindingMappingInfo  : gfx.BindingMappingInfo;   // cc::gfx::BindingMappingInfo
        // methods list
        copy(rhs: gfx.DeviceInfo):gfx.DeviceInfo; // cc::gfx::DeviceInfo
    } // endof class DeviceInfo
    
    
    // ts : gfx.BufferInfo
    // cpp: cc::gfx::BufferInfo
    export class BufferInfo {
        // public_fields list
        usage   : number;   // cc::gfx::BufferUsageBit
        memUsage: number;   // cc::gfx::MemoryUsageBit
        size    : number;   // unsigned int
        stride  : number;   // unsigned int
        flags   : number;   // cc::gfx::BufferFlagBit
        // methods list
        copy(rhs: gfx.BufferInfo):gfx.BufferInfo; // cc::gfx::BufferInfo
    } // endof class BufferInfo
    
    
    // ts : gfx.BufferViewInfo
    // cpp: cc::gfx::BufferViewInfo
    export class BufferViewInfo {
        // public_fields list
        buffer  : gfx.Buffer;   // cc::gfx::Buffer*
        offset  : number;       // unsigned int
        range   : number;       // unsigned int
        // methods list
        copy(rhs: gfx.BufferViewInfo):gfx.BufferViewInfo; // cc::gfx::BufferViewInfo
    } // endof class BufferViewInfo
    
    
    // ts : gfx.DrawInfo
    // cpp: cc::gfx::DrawInfo
    export class DrawInfo {
        // public_fields list
        vertexCount     : number;   // unsigned int
        firstVertex     : number;   // unsigned int
        indexCount      : number;   // unsigned int
        firstIndex      : number;   // unsigned int
        vertexOffset    : number;   // int
        instanceCount   : number;   // unsigned int
        firstInstance   : number;   // unsigned int
        // methods list
        copy(rhs: gfx.DrawInfo):gfx.DrawInfo; // cc::gfx::DrawInfo
    } // endof class DrawInfo
    
    
    // ts : gfx.DispatchInfo
    // cpp: cc::gfx::DispatchInfo
    export class DispatchInfo {
        // public_fields list
        groupCountX     : number;       // unsigned int
        groupCountY     : number;       // unsigned int
        groupCountZ     : number;       // unsigned int
        indirectBuffer  : gfx.Buffer;   // cc::gfx::Buffer*
        indirectOffset  : number;       // unsigned int
        // methods list
        copy(rhs: gfx.DispatchInfo):gfx.DispatchInfo; // cc::gfx::DispatchInfo
    } // endof class DispatchInfo
    
    
    // ts : gfx.IndirectBuffer
    // cpp: cc::gfx::IndirectBuffer
    export class IndirectBuffer {
        // public_fields list
        drawInfos   : gfx.DrawInfo[];   // std::vector<cc::gfx::DrawInfo>
        // methods list
        copy(rhs: gfx.IndirectBuffer):gfx.IndirectBuffer; // cc::gfx::IndirectBuffer
    } // endof class IndirectBuffer
    
    
    // ts : gfx.TextureInfo
    // cpp: cc::gfx::TextureInfo
    export class TextureInfo {
        // public_fields list
        type        : number;       // cc::gfx::TextureType
        usage       : number;       // cc::gfx::TextureUsageBit
        format      : number;       // cc::gfx::Format
        width       : number;       // unsigned int
        height      : number;       // unsigned int
        flags       : number;       // cc::gfx::TextureFlagBit
        layerCount  : number;       // unsigned int
        levelCount  : number;       // unsigned int
        samples     : number;       // cc::gfx::SampleCount
        depth       : number;       // unsigned int
        externalRes : ArrayBuffer;  // void*
        // methods list
        copy(rhs: gfx.TextureInfo):gfx.TextureInfo; // cc::gfx::TextureInfo
    } // endof class TextureInfo
    
    
    // ts : gfx.TextureViewInfo
    // cpp: cc::gfx::TextureViewInfo
    export class TextureViewInfo {
        // public_fields list
        texture     : gfx.Texture;  // cc::gfx::Texture*
        type        : number;       // cc::gfx::TextureType
        format      : number;       // cc::gfx::Format
        baseLevel   : number;       // unsigned int
        levelCount  : number;       // unsigned int
        baseLayer   : number;       // unsigned int
        layerCount  : number;       // unsigned int
        // methods list
        copy(rhs: gfx.TextureViewInfo):gfx.TextureViewInfo; // cc::gfx::TextureViewInfo
    } // endof class TextureViewInfo
    
    
    // ts : gfx.SamplerInfo
    // cpp: cc::gfx::SamplerInfo
    export class SamplerInfo {
        // public_fields list
        minFilter       : number;   // cc::gfx::Filter
        magFilter       : number;   // cc::gfx::Filter
        mipFilter       : number;   // cc::gfx::Filter
        addressU        : number;   // cc::gfx::Address
        addressV        : number;   // cc::gfx::Address
        addressW        : number;   // cc::gfx::Address
        maxAnisotropy   : number;   // unsigned int
        cmpFunc         : number;   // cc::gfx::ComparisonFunc
        // methods list
        copy(rhs: gfx.SamplerInfo):gfx.SamplerInfo; // cc::gfx::SamplerInfo
    } // endof class SamplerInfo
    
    
    // ts : gfx.Uniform
    // cpp: cc::gfx::Uniform
    export class Uniform {
        // public_fields list
        name    : string;   // std::string
        type    : number;   // cc::gfx::Type
        count   : number;   // unsigned int
        // methods list
        copy(rhs: gfx.Uniform):gfx.Uniform; // cc::gfx::Uniform
    } // endof class Uniform
    
    
    // ts : gfx.UniformBlock
    // cpp: cc::gfx::UniformBlock
    export class UniformBlock {
        // public_fields list
        set     : number;       // unsigned int
        binding : number;       // unsigned int
        name    : string;       // std::string
        members : gfx.Uniform[];// std::vector<cc::gfx::Uniform>
        count   : number;       // unsigned int
        // methods list
        copy(rhs: gfx.UniformBlock):gfx.UniformBlock; // cc::gfx::UniformBlock
    } // endof class UniformBlock
    
    
    // ts : gfx.UniformSamplerTexture
    // cpp: cc::gfx::UniformSamplerTexture
    export class UniformSamplerTexture {
        // public_fields list
        set     : number;   // unsigned int
        binding : number;   // unsigned int
        name    : string;   // std::string
        type    : number;   // cc::gfx::Type
        count   : number;   // unsigned int
        // methods list
        copy(rhs: gfx.UniformSamplerTexture):gfx.UniformSamplerTexture; // cc::gfx::UniformSamplerTexture
    } // endof class UniformSamplerTexture
    
    
    // ts : gfx.UniformSampler
    // cpp: cc::gfx::UniformSampler
    export class UniformSampler {
        // public_fields list
        set     : number;   // unsigned int
        binding : number;   // unsigned int
        name    : string;   // std::string
        count   : number;   // unsigned int
        // methods list
        copy(rhs: gfx.UniformSampler):gfx.UniformSampler; // cc::gfx::UniformSampler
    } // endof class UniformSampler
    
    
    // ts : gfx.UniformTexture
    // cpp: cc::gfx::UniformTexture
    export class UniformTexture {
        // public_fields list
        set     : number;   // unsigned int
        binding : number;   // unsigned int
        name    : string;   // std::string
        type    : number;   // cc::gfx::Type
        count   : number;   // unsigned int
        // methods list
        copy(rhs: gfx.UniformTexture):gfx.UniformTexture; // cc::gfx::UniformTexture
    } // endof class UniformTexture
    
    
    // ts : gfx.UniformStorageImage
    // cpp: cc::gfx::UniformStorageImage
    export class UniformStorageImage {
        // public_fields list
        set         : number;   // unsigned int
        binding     : number;   // unsigned int
        name        : string;   // std::string
        type        : number;   // cc::gfx::Type
        count       : number;   // unsigned int
        memoryAccess: number;   // cc::gfx::MemoryAccessBit
        // methods list
        copy(rhs: gfx.UniformStorageImage):gfx.UniformStorageImage; // cc::gfx::UniformStorageImage
    } // endof class UniformStorageImage
    
    
    // ts : gfx.UniformStorageBuffer
    // cpp: cc::gfx::UniformStorageBuffer
    export class UniformStorageBuffer {
        // public_fields list
        set         : number;   // unsigned int
        binding     : number;   // unsigned int
        name        : string;   // std::string
        count       : number;   // unsigned int
        memoryAccess: number;   // cc::gfx::MemoryAccessBit
        // methods list
        copy(rhs: gfx.UniformStorageBuffer):gfx.UniformStorageBuffer; // cc::gfx::UniformStorageBuffer
    } // endof class UniformStorageBuffer
    
    
    // ts : gfx.UniformInputAttachment
    // cpp: cc::gfx::UniformInputAttachment
    export class UniformInputAttachment {
        // public_fields list
        set     : number;   // unsigned int
        binding : number;   // unsigned int
        name    : string;   // std::string
        count   : number;   // unsigned int
        // methods list
        copy(rhs: gfx.UniformInputAttachment):gfx.UniformInputAttachment; // cc::gfx::UniformInputAttachment
    } // endof class UniformInputAttachment
    
    
    // ts : gfx.ShaderStage
    // cpp: cc::gfx::ShaderStage
    export class ShaderStage {
        // public_fields list
        stage   : number;   // cc::gfx::ShaderStageFlagBit
        source  : string;   // std::string
        // methods list
        copy(rhs: gfx.ShaderStage):gfx.ShaderStage; // cc::gfx::ShaderStage
    } // endof class ShaderStage
    
    
    // ts : gfx.Attribute
    // cpp: cc::gfx::Attribute
    export class Attribute {
        // public_fields list
        name        : string;   // std::string
        format      : number;   // cc::gfx::Format
        isNormalized: boolean;  // bool
        stream      : number;   // unsigned int
        isInstanced : boolean;  // bool
        location    : number;   // unsigned int
        // methods list
        copy(rhs: gfx.Attribute):gfx.Attribute; // cc::gfx::Attribute
    } // endof class Attribute
    
    
    // ts : gfx.ShaderInfo
    // cpp: cc::gfx::ShaderInfo
    export class ShaderInfo {
        // public_fields list
        name            : string;                       // std::string
        stages          : gfx.ShaderStage[];            // std::vector<cc::gfx::ShaderStage>
        attributes      : gfx.Attribute[];              // std::vector<cc::gfx::Attribute>
        blocks          : gfx.UniformBlock[];           // std::vector<cc::gfx::UniformBlock>
        buffers         : gfx.UniformStorageBuffer[];   // std::vector<cc::gfx::UniformStorageBuffer>
        samplerTextures : gfx.UniformSamplerTexture[];  // std::vector<cc::gfx::UniformSamplerTexture>
        samplers        : gfx.UniformSampler[];         // std::vector<cc::gfx::UniformSampler>
        textures        : gfx.UniformTexture[];         // std::vector<cc::gfx::UniformTexture>
        images          : gfx.UniformStorageImage[];    // std::vector<cc::gfx::UniformStorageImage>
        subpassInputs   : gfx.UniformInputAttachment[]; // std::vector<cc::gfx::UniformInputAttachment>
        // methods list
        copy(rhs: gfx.ShaderInfo):gfx.ShaderInfo; // cc::gfx::ShaderInfo
    } // endof class ShaderInfo
    
    
    // ts : gfx.InputAssemblerInfo
    // cpp: cc::gfx::InputAssemblerInfo
    export class InputAssemblerInfo {
        // public_fields list
        attributes      : gfx.Attribute[];  // std::vector<cc::gfx::Attribute>
        vertexBuffers   : gfx.Buffer[];     // std::vector<cc::gfx::Buffer *>
        indexBuffer     : gfx.Buffer;       // cc::gfx::Buffer*
        indirectBuffer  : gfx.Buffer;       // cc::gfx::Buffer*
        // methods list
        copy(rhs: gfx.InputAssemblerInfo):gfx.InputAssemblerInfo; // cc::gfx::InputAssemblerInfo
    } // endof class InputAssemblerInfo
    
    
    // ts : gfx.ColorAttachment
    // cpp: cc::gfx::ColorAttachment
    export class ColorAttachment {
        // public_fields list
        format          : number;               // cc::gfx::Format
        sampleCount     : number;               // cc::gfx::SampleCount
        loadOp          : number;               // cc::gfx::LoadOp
        storeOp         : number;               // cc::gfx::StoreOp
        barrier         : gfx.GeneralBarrier;   // cc::gfx::GeneralBarrier*
        isGeneralLayout : number;               // unsigned int
        // methods list
        copy(rhs: gfx.ColorAttachment):gfx.ColorAttachment; // cc::gfx::ColorAttachment
    } // endof class ColorAttachment
    
    
    // ts : gfx.DepthStencilAttachment
    // cpp: cc::gfx::DepthStencilAttachment
    export class DepthStencilAttachment {
        // public_fields list
        format          : number;               // cc::gfx::Format
        sampleCount     : number;               // cc::gfx::SampleCount
        depthLoadOp     : number;               // cc::gfx::LoadOp
        depthStoreOp    : number;               // cc::gfx::StoreOp
        stencilLoadOp   : number;               // cc::gfx::LoadOp
        stencilStoreOp  : number;               // cc::gfx::StoreOp
        barrier         : gfx.GeneralBarrier;   // cc::gfx::GeneralBarrier*
        isGeneralLayout : number;               // unsigned int
        // methods list
        copy(rhs: gfx.DepthStencilAttachment):gfx.DepthStencilAttachment; // cc::gfx::DepthStencilAttachment
    } // endof class DepthStencilAttachment
    
    
    // ts : gfx.SubpassInfo
    // cpp: cc::gfx::SubpassInfo
    export class SubpassInfo {
        // public_fields list
        inputs              : number[]; // std::vector<unsigned int>
        colors              : number[]; // std::vector<unsigned int>
        resolves            : number[]; // std::vector<unsigned int>
        preserves           : number[]; // std::vector<unsigned int>
        depthStencil        : number;   // unsigned int
        depthStencilResolve : number;   // unsigned int
        depthResolveMode    : number;   // cc::gfx::ResolveMode
        stencilResolveMode  : number;   // cc::gfx::ResolveMode
        // methods list
        copy(rhs: gfx.SubpassInfo):gfx.SubpassInfo; // cc::gfx::SubpassInfo
    } // endof class SubpassInfo
    
    
    // ts : gfx.SubpassDependency
    // cpp: cc::gfx::SubpassDependency
    export class SubpassDependency {
        // public_fields list
        srcSubpass          : number;               // unsigned int
        dstSubpass          : number;               // unsigned int
        generalBarrier      : gfx.GeneralBarrier;   // cc::gfx::GeneralBarrier*
        bufferBarriers      : gfx.BufferBarrier;    // cc::gfx::BufferBarrier**
        buffers             : gfx.Buffer;           // cc::gfx::Buffer**
        bufferBarrierCount  : number;               // unsigned int
        textureBarriers     : gfx.TextureBarrier;   // cc::gfx::TextureBarrier**
        textures            : gfx.Texture;          // cc::gfx::Texture**
        textureBarrierCount : number;               // unsigned int
        // methods list
        copy(rhs: gfx.SubpassDependency):gfx.SubpassDependency; // cc::gfx::SubpassDependency
    } // endof class SubpassDependency
    
    
    // ts : gfx.RenderPassInfo
    // cpp: cc::gfx::RenderPassInfo
    export class RenderPassInfo {
        // public_fields list
        colorAttachments        : gfx.ColorAttachment[];        // std::vector<cc::gfx::ColorAttachment>
        depthStencilAttachment  : gfx.DepthStencilAttachment;   // cc::gfx::DepthStencilAttachment
        subpasses               : gfx.SubpassInfo[];            // std::vector<cc::gfx::SubpassInfo>
        dependencies            : gfx.SubpassDependency[];      // std::vector<cc::gfx::SubpassDependency>
        // methods list
        copy(rhs: gfx.RenderPassInfo):gfx.RenderPassInfo; // cc::gfx::RenderPassInfo
    } // endof class RenderPassInfo
    
    
    // ts : gfx.GeneralBarrierInfo
    // cpp: cc::gfx::GeneralBarrierInfo
    export class GeneralBarrierInfo {
        // public_fields list
        prevAccesses: number;   // cc::gfx::AccessFlagBit
        nextAccesses: number;   // cc::gfx::AccessFlagBit
        type        : number;   // cc::gfx::BarrierType
        // methods list
        copy(rhs: gfx.GeneralBarrierInfo):gfx.GeneralBarrierInfo; // cc::gfx::GeneralBarrierInfo
    } // endof class GeneralBarrierInfo
    
    
    // ts : gfx.TextureBarrierInfo
    // cpp: cc::gfx::TextureBarrierInfo
    export class TextureBarrierInfo {
        // public_fields list
        prevAccesses    : number;   // cc::gfx::AccessFlagBit
        nextAccesses    : number;   // cc::gfx::AccessFlagBit
        type            : number;   // cc::gfx::BarrierType
        baseMipLevel    : number;   // unsigned int
        levelCount      : number;   // unsigned int
        baseSlice       : number;   // unsigned int
        sliceCount      : number;   // unsigned int
        discardContents : number;   // uint64_t
        srcQueue        : gfx.Queue;// cc::gfx::Queue*
        dstQueue        : gfx.Queue;// cc::gfx::Queue*
        // methods list
        copy(rhs: gfx.TextureBarrierInfo):gfx.TextureBarrierInfo; // cc::gfx::TextureBarrierInfo
    } // endof class TextureBarrierInfo
    
    
    // ts : gfx.BufferBarrierInfo
    // cpp: cc::gfx::BufferBarrierInfo
    export class BufferBarrierInfo {
        // public_fields list
        prevAccesses    : number;   // cc::gfx::AccessFlagBit
        nextAccesses    : number;   // cc::gfx::AccessFlagBit
        type            : number;   // cc::gfx::BarrierType
        offset          : number;   // unsigned int
        size            : number;   // unsigned int
        discardContents : number;   // uint64_t
        srcQueue        : gfx.Queue;// cc::gfx::Queue*
        dstQueue        : gfx.Queue;// cc::gfx::Queue*
        // methods list
        copy(rhs: gfx.BufferBarrierInfo):gfx.BufferBarrierInfo; // cc::gfx::BufferBarrierInfo
    } // endof class BufferBarrierInfo
    
    
    // ts : gfx.FramebufferInfo
    // cpp: cc::gfx::FramebufferInfo
    export class FramebufferInfo {
        // public_fields list
        renderPass          : gfx.RenderPass;   // cc::gfx::RenderPass*
        colorTextures       : gfx.Texture[];    // std::vector<cc::gfx::Texture *>
        depthStencilTexture : gfx.Texture;      // cc::gfx::Texture*
        // methods list
        copy(rhs: gfx.FramebufferInfo):gfx.FramebufferInfo; // cc::gfx::FramebufferInfo
    } // endof class FramebufferInfo
    
    
    // ts : gfx.DescriptorSetLayoutBinding
    // cpp: cc::gfx::DescriptorSetLayoutBinding
    export class DescriptorSetLayoutBinding {
        // public_fields list
        binding             : number;       // unsigned int
        descriptorType      : number;       // cc::gfx::DescriptorType
        count               : number;       // unsigned int
        stageFlags          : number;       // cc::gfx::ShaderStageFlagBit
        immutableSamplers   : gfx.Sampler[];// std::vector<cc::gfx::Sampler *>
        // methods list
        copy(rhs: gfx.DescriptorSetLayoutBinding):gfx.DescriptorSetLayoutBinding; // cc::gfx::DescriptorSetLayoutBinding
    } // endof class DescriptorSetLayoutBinding
    
    
    // ts : gfx.DescriptorSetLayoutInfo
    // cpp: cc::gfx::DescriptorSetLayoutInfo
    export class DescriptorSetLayoutInfo {
        // public_fields list
        bindings: gfx.DescriptorSetLayoutBinding[]; // std::vector<cc::gfx::DescriptorSetLayoutBinding>
        // methods list
        copy(rhs: gfx.DescriptorSetLayoutInfo):gfx.DescriptorSetLayoutInfo; // cc::gfx::DescriptorSetLayoutInfo
    } // endof class DescriptorSetLayoutInfo
    
    
    // ts : gfx.DescriptorSetInfo
    // cpp: cc::gfx::DescriptorSetInfo
    export class DescriptorSetInfo {
        // public_fields list
        layout  : gfx.DescriptorSetLayout;  // cc::gfx::DescriptorSetLayout*
        // methods list
        copy(rhs: gfx.DescriptorSetInfo):gfx.DescriptorSetInfo; // cc::gfx::DescriptorSetInfo
    } // endof class DescriptorSetInfo
    
    
    // ts : gfx.PipelineLayoutInfo
    // cpp: cc::gfx::PipelineLayoutInfo
    export class PipelineLayoutInfo {
        // public_fields list
        setLayouts  : gfx.DescriptorSetLayout[];// std::vector<cc::gfx::DescriptorSetLayout *>
        // methods list
        copy(rhs: gfx.PipelineLayoutInfo):gfx.PipelineLayoutInfo; // cc::gfx::PipelineLayoutInfo
    } // endof class PipelineLayoutInfo
    
    
    // ts : gfx.InputState
    // cpp: cc::gfx::InputState
    export class InputState {
        // public_fields list
        attributes  : gfx.Attribute[];  // std::vector<cc::gfx::Attribute>
        // methods list
        copy(rhs: gfx.InputState):gfx.InputState; // cc::gfx::InputState
    } // endof class InputState
    
    
    // ts : gfx.RasterizerState
    // cpp: cc::gfx::RasterizerState
    export class RasterizerState {
        // public_fields list
        isDiscard       : number;   // unsigned int
        polygonMode     : number;   // cc::gfx::PolygonMode
        shadeModel      : number;   // cc::gfx::ShadeModel
        cullMode        : number;   // cc::gfx::CullMode
        isFrontFaceCCW  : number;   // unsigned int
        depthBiasEnabled: number;   // unsigned int
        depthBias       : number;   // float
        depthBiasClamp  : number;   // float
        depthBiasSlop   : number;   // float
        isDepthClip     : number;   // unsigned int
        isMultisample   : number;   // unsigned int
        lineWidth       : number;   // float
        // methods list
        reset():void; // void
        copy(rhs: gfx.RasterizerState):gfx.RasterizerState; // cc::gfx::RasterizerState
    } // endof class RasterizerState
    
    
    // ts : gfx.DepthStencilState
    // cpp: cc::gfx::DepthStencilState
    export class DepthStencilState {
        // public_fields list
        depthTest               : number;   // unsigned int
        depthWrite              : number;   // unsigned int
        depthFunc               : number;   // cc::gfx::ComparisonFunc
        stencilTestFront        : number;   // unsigned int
        stencilFuncFront        : number;   // cc::gfx::ComparisonFunc
        stencilReadMaskFront    : number;   // unsigned int
        stencilWriteMaskFront   : number;   // unsigned int
        stencilFailOpFront      : number;   // cc::gfx::StencilOp
        stencilZFailOpFront     : number;   // cc::gfx::StencilOp
        stencilPassOpFront      : number;   // cc::gfx::StencilOp
        stencilRefFront         : number;   // unsigned int
        stencilTestBack         : number;   // unsigned int
        stencilFuncBack         : number;   // cc::gfx::ComparisonFunc
        stencilReadMaskBack     : number;   // unsigned int
        stencilWriteMaskBack    : number;   // unsigned int
        stencilFailOpBack       : number;   // cc::gfx::StencilOp
        stencilZFailOpBack      : number;   // cc::gfx::StencilOp
        stencilPassOpBack       : number;   // cc::gfx::StencilOp
        stencilRefBack          : number;   // unsigned int
        // methods list
        reset():void; // void
        copy(rhs: gfx.DepthStencilState):gfx.DepthStencilState; // cc::gfx::DepthStencilState
    } // endof class DepthStencilState
    
    
    // ts : gfx.BlendTarget
    // cpp: cc::gfx::BlendTarget
    export class BlendTarget {
        // public_fields list
        blend           : number;   // unsigned int
        blendSrc        : number;   // cc::gfx::BlendFactor
        blendDst        : number;   // cc::gfx::BlendFactor
        blendEq         : number;   // cc::gfx::BlendOp
        blendSrcAlpha   : number;   // cc::gfx::BlendFactor
        blendDstAlpha   : number;   // cc::gfx::BlendFactor
        blendAlphaEq    : number;   // cc::gfx::BlendOp
        blendColorMask  : number;   // cc::gfx::ColorMask
        // methods list
        reset():void; // void
        copy(rhs: gfx.BlendTarget):gfx.BlendTarget; // cc::gfx::BlendTarget
    } // endof class BlendTarget
    
    
    // ts : gfx.BlendState
    // cpp: cc::gfx::BlendState
    export class BlendState {
        // public_fields list
        isA2C       : number;           // unsigned int
        isIndepend  : number;           // unsigned int
        blendColor  : gfx.Color;        // cc::gfx::Color
        targets     : gfx.BlendTarget[];// std::vector<cc::gfx::BlendTarget>
        // methods list
        setTarget(index: number, target: gfx.BlendTarget):void; // void
        reset():void; // void
        destroy():void; // void
        copy(rhs: gfx.BlendState):gfx.BlendState; // cc::gfx::BlendState
    } // endof class BlendState
    
    
    // ts : gfx.PipelineStateInfo
    // cpp: cc::gfx::PipelineStateInfo
    export class PipelineStateInfo {
        // public_fields list
        shader              : gfx.Shader;           // cc::gfx::Shader*
        pipelineLayout      : gfx.PipelineLayout;   // cc::gfx::PipelineLayout*
        renderPass          : gfx.RenderPass;       // cc::gfx::RenderPass*
        inputState          : gfx.InputState;       // cc::gfx::InputState
        rasterizerState     : gfx.RasterizerState;  // cc::gfx::RasterizerState
        depthStencilState   : gfx.DepthStencilState;// cc::gfx::DepthStencilState
        blendState          : gfx.BlendState;       // cc::gfx::BlendState
        primitive           : number;               // cc::gfx::PrimitiveMode
        dynamicStates       : number;               // cc::gfx::DynamicStateFlagBit
        bindPoint           : number;               // cc::gfx::PipelineBindPoint
        subpass             : number;               // unsigned int
        // methods list
        copy(rhs: gfx.PipelineStateInfo):gfx.PipelineStateInfo; // cc::gfx::PipelineStateInfo
    } // endof class PipelineStateInfo
    
    
    // ts : gfx.CommandBufferInfo
    // cpp: cc::gfx::CommandBufferInfo
    export class CommandBufferInfo {
        // public_fields list
        queue   : gfx.Queue;// cc::gfx::Queue*
        type    : number;   // cc::gfx::CommandBufferType
        // methods list
        copy(rhs: gfx.CommandBufferInfo):gfx.CommandBufferInfo; // cc::gfx::CommandBufferInfo
    } // endof class CommandBufferInfo
    
    
    // ts : gfx.QueueInfo
    // cpp: cc::gfx::QueueInfo
    export class QueueInfo {
        // public_fields list
        type: number;   // cc::gfx::QueueType
        // methods list
        copy(rhs: gfx.QueueInfo):gfx.QueueInfo; // cc::gfx::QueueInfo
    } // endof class QueueInfo
    
    
    // ts : gfx.QueryPoolInfo
    // cpp: cc::gfx::QueryPoolInfo
    export class QueryPoolInfo {
        // public_fields list
        type            : number;   // cc::gfx::QueryType
        maxQueryObjects : number;   // unsigned int
        forceWait       : boolean;  // bool
        // methods list
        copy(rhs: gfx.QueryPoolInfo):gfx.QueryPoolInfo; // cc::gfx::QueryPoolInfo
    } // endof class QueryPoolInfo
    
    
    // ts : gfx.MemoryStatus
    // cpp: cc::gfx::MemoryStatus
    export class MemoryStatus {
        // public_fields list
        bufferSize  : number;   // unsigned int
        textureSize : number;   // unsigned int
        // methods list
        copy(rhs: gfx.MemoryStatus):gfx.MemoryStatus; // cc::gfx::MemoryStatus
    } // endof class MemoryStatus
    
    
    // ts : gfx.GFXObject
    // cpp: cc::gfx::GFXObject
    export class GFXObject {
        // attributes list
        objectType  : number;   // cc::gfx::ObjectType
        objectID    : number;   // unsigned int
        typedID     : number;   // unsigned int
        // methods list
        constructor(type: number);
    } // endof class GFXObject
    
    
    // ts : gfx.Buffer
    // cpp: cc::gfx::Buffer
    export class Buffer extends gfx.GFXObject {
        // attributes list
        usage   : number;   // cc::gfx::BufferUsageBit
        memUsage: number;   // cc::gfx::MemoryUsageBit
        stride  : number;   // unsigned int
        count   : number;   // unsigned int
        size    : number;   // unsigned int
        flags   : number;   // cc::gfx::BufferFlagBit
        // static methods list
        static computeHash(info: gfx.BufferInfo):number; // unsigned int
        // methods list
        constructor();
        initialize(info: gfx.BufferViewInfo):void; // void
        initialize(info: gfx.BufferInfo):void; // void
        resize(size: number):void; // void
        destroy():void; // void
        update(buffer: ArrayBuffer):void; // void
        update(buffer: ArrayBuffer, size: number):void; // void
        isBufferView():boolean; // bool
    } // endof class Buffer
    
    
    // ts : gfx.InputAssembler
    // cpp: cc::gfx::InputAssembler
    export class InputAssembler extends gfx.GFXObject {
        // attributes list
        vertexBuffers   : gfx.Buffer[];     // std::vector<cc::gfx::Buffer *>
        attributes      : gfx.Attribute[];  // std::vector<cc::gfx::Attribute>
        indexBuffer     : gfx.Buffer;       // cc::gfx::Buffer*
        indirectBuffer  : gfx.Buffer;       // cc::gfx::Buffer*
        attributesHash  : number;           // unsigned int
        drawInfo        : gfx.DrawInfo;     // cc::gfx::DrawInfo
        vertexCount     : number;           // unsigned int
        firstVertex     : number;           // unsigned int
        indexCount      : number;           // unsigned int
        firstIndex      : number;           // unsigned int
        vertexOffset    : number;           // unsigned int
        instanceCount   : number;           // unsigned int
        firstInstance   : number;           // unsigned int
        // methods list
        constructor();
        initialize(info: gfx.InputAssemblerInfo):void; // void
        destroy():void; // void
    } // endof class InputAssembler
    
    
    // ts : gfx.CommandBuffer
    // cpp: cc::gfx::CommandBuffer
    export class CommandBuffer extends gfx.GFXObject {
        // attributes list
        type        : number;   // cc::gfx::CommandBufferType
        queue       : gfx.Queue;// cc::gfx::Queue*
        numDrawCalls: number;   // unsigned int
        numInstances: number;   // unsigned int
        numTris     : number;   // unsigned int
        // methods list
        constructor();
        initialize(info: gfx.CommandBufferInfo):void; // void
        destroy():void; // void
        begin():void; // void
        begin(renderPass: gfx.RenderPass, subpass: number, frameBuffer: gfx.Framebuffer):void; // void
        begin(renderPass: gfx.RenderPass):void; // void
        begin(renderPass: gfx.RenderPass, subpass: number):void; // void
        end():void; // void
        beginRenderPass(renderPass: gfx.RenderPass, fbo: gfx.Framebuffer, renderArea: gfx.Rect, colors: gfx.Color[], depth: number, stencil: number, secondaryCBs: gfx.CommandBuffer[]):void; // void
        beginRenderPass(renderPass: gfx.RenderPass, fbo: gfx.Framebuffer, renderArea: gfx.Rect, colors: gfx.Color, depth: number, stencil: number, secondaryCBs: gfx.CommandBuffer, secondaryCBCount: number):void; // void
        beginRenderPass(renderPass: gfx.RenderPass, fbo: gfx.Framebuffer, renderArea: gfx.Rect, colors: gfx.Color[], depth: number, stencil: number):void; // void
        beginRenderPass(renderPass: gfx.RenderPass, fbo: gfx.Framebuffer, renderArea: gfx.Rect, colors: gfx.Color, depth: number, stencil: number):void; // void
        endRenderPass():void; // void
        bindPipelineState(pso: gfx.PipelineState):void; // void
        bindDescriptorSet(set: number, descriptorSet: gfx.DescriptorSet):void; // void
        bindDescriptorSet(set: number, descriptorSet: gfx.DescriptorSet, dynamicOffsetCount: number, dynamicOffsets: number):void; // void
        bindDescriptorSet(set: number, descriptorSet: gfx.DescriptorSet, dynamicOffsets: number[]):void; // void
        bindInputAssembler(ia: gfx.InputAssembler):void; // void
        setViewport(vp: gfx.Viewport):void; // void
        setScissor(rect: gfx.Rect):void; // void
        setLineWidth(width: number):void; // void
        setDepthBias(constant: number, clamp: number, slope: number):void; // void
        setBlendConstants(constants: gfx.Color):void; // void
        setDepthBound(minBounds: number, maxBounds: number):void; // void
        setStencilWriteMask(face: number, mask: number):void; // void
        setStencilCompareMask(face: number, ref: number, mask: number):void; // void
        nextSubpass():void; // void
        draw(ia: gfx.InputAssembler):void; // void
        draw(info: gfx.DrawInfo):void; // void
        updateBuffer(buff: gfx.Buffer, data: ArrayBuffer):void; // void
        updateBuffer(buff: gfx.Buffer, data: ArrayBuffer, size: number):void; // void
        copyBuffersToTexture(buffers: string[], texture: gfx.Texture, regions: gfx.BufferTextureCopy[]):void; // void
        copyBuffersToTexture(buffers: string, texture: gfx.Texture, regions: gfx.BufferTextureCopy, count: number):void; // void
        blitTexture(srcTexture: gfx.Texture, dstTexture: gfx.Texture, regions: gfx.TextureBlit[], filter: number):void; // void
        blitTexture(srcTexture: gfx.Texture, dstTexture: gfx.Texture, regions: gfx.TextureBlit, count: number, filter: number):void; // void
        execute(cmdBuffs: gfx.CommandBuffer[], count: number):void; // void
        execute(cmdBuffs: gfx.CommandBuffer, count: number):void; // void
        dispatch(info: gfx.DispatchInfo):void; // void
        beginQuery(queryPool: gfx.QueryPool, id: number):void; // void
        endQuery(queryPool: gfx.QueryPool, id: number):void; // void
        resetQueryPool(queryPool: gfx.QueryPool):void; // void
        completeQueryPool(queryPool: gfx.QueryPool):void; // void
        pipelineBarrier(barrier: gfx.GeneralBarrier):void; // void
        pipelineBarrier(barrier: gfx.GeneralBarrier, bufferBarriers: gfx.BufferBarrier, buffers: gfx.Buffer, bufferBarrierCount: number, textureBarriers: gfx.TextureBarrier, textures: gfx.Texture, textureBarrierCount: number):void; // void
        pipelineBarrier(barrier: gfx.GeneralBarrier, bufferBarriers: gfx.BufferBarrier[], buffers: gfx.Buffer[], textureBarriers: gfx.TextureBarrier[], textures: gfx.Texture[]):void; // void
    } // endof class CommandBuffer
    
    
    // ts : gfx.DescriptorSet
    // cpp: cc::gfx::DescriptorSet
    export class DescriptorSet extends gfx.GFXObject {
        // attributes list
        layout  : gfx.DescriptorSetLayout;  // cc::gfx::DescriptorSetLayout*
        // methods list
        constructor();
        initialize(info: gfx.DescriptorSetInfo):void; // void
        destroy():void; // void
        update():void; // void
        forceUpdate():void; // void
        bindBuffer(binding: number, buffer: gfx.Buffer):void; // void
        bindBuffer(binding: number, buffer: gfx.Buffer, index: number):void; // void
        bindTexture(binding: number, texture: gfx.Texture):void; // void
        bindTexture(binding: number, texture: gfx.Texture, index: number):void; // void
        bindSampler(binding: number, sampler: gfx.Sampler):void; // void
        bindSampler(binding: number, sampler: gfx.Sampler, index: number):void; // void
        bindBufferJSB(binding: number, buffer: gfx.Buffer, index: number):boolean; // bool
        bindTextureJSB(binding: number, texture: gfx.Texture, index: number):boolean; // bool
        bindSamplerJSB(binding: number, sampler: gfx.Sampler, index: number):boolean; // bool
        getBuffer(binding: number):gfx.Buffer; // cc::gfx::Buffer*
        getBuffer(binding: number, index: number):gfx.Buffer; // cc::gfx::Buffer*
        getTexture(binding: number):gfx.Texture; // cc::gfx::Texture*
        getTexture(binding: number, index: number):gfx.Texture; // cc::gfx::Texture*
        getSampler(binding: number):gfx.Sampler; // cc::gfx::Sampler*
        getSampler(binding: number, index: number):gfx.Sampler; // cc::gfx::Sampler*
    } // endof class DescriptorSet
    
    
    // ts : gfx.DescriptorSetLayout
    // cpp: cc::gfx::DescriptorSetLayout
    export class DescriptorSetLayout extends gfx.GFXObject {
        // methods list
        constructor();
        initialize(info: gfx.DescriptorSetLayoutInfo):void; // void
        destroy():void; // void
        getBindings():gfx.DescriptorSetLayoutBinding[]; // std::vector<cc::gfx::DescriptorSetLayoutBinding>
        getDynamicBindings():number[]; // std::vector<unsigned int>
        getBindingIndices():number[]; // std::vector<unsigned int>
        getDescriptorIndices():number[]; // std::vector<unsigned int>
        getDescriptorCount():number; // unsigned int
    } // endof class DescriptorSetLayout
    
    
    // ts : gfx.Framebuffer
    // cpp: cc::gfx::Framebuffer
    export class Framebuffer extends gfx.GFXObject {
        // attributes list
        renderPass          : gfx.RenderPass;   // cc::gfx::RenderPass*
        colorTextures       : gfx.Texture[];    // std::vector<cc::gfx::Texture *>
        depthStencilTexture : gfx.Texture;      // cc::gfx::Texture*
        // static methods list
        static computeHash(info: gfx.FramebufferInfo):number; // unsigned int
        // methods list
        constructor();
        initialize(info: gfx.FramebufferInfo):void; // void
        destroy():void; // void
    } // endof class Framebuffer
    
    
    // ts : gfx.PipelineLayout
    // cpp: cc::gfx::PipelineLayout
    export class PipelineLayout extends gfx.GFXObject {
        // methods list
        constructor();
        initialize(info: gfx.PipelineLayoutInfo):void; // void
        destroy():void; // void
        getSetLayouts():gfx.DescriptorSetLayout[]; // std::vector<cc::gfx::DescriptorSetLayout *>
    } // endof class PipelineLayout
    
    
    // ts : gfx.PipelineState
    // cpp: cc::gfx::PipelineState
    export class PipelineState extends gfx.GFXObject {
        // attributes list
        shader              : gfx.Shader;           // cc::gfx::Shader*
        primitive           : number;               // cc::gfx::PrimitiveMode
        bindPoint           : number;               // cc::gfx::PipelineBindPoint
        inputState          : gfx.InputState;       // cc::gfx::InputState
        rasterizerState     : gfx.RasterizerState;  // cc::gfx::RasterizerState
        depthStencilState   : gfx.DepthStencilState;// cc::gfx::DepthStencilState
        blendState          : gfx.BlendState;       // cc::gfx::BlendState
        renderPass          : gfx.RenderPass;       // cc::gfx::RenderPass*
        // methods list
        constructor();
        initialize(info: gfx.PipelineStateInfo):void; // void
        destroy():void; // void
        getDynamicStates():number; // cc::gfx::DynamicStateFlagBit
        getPipelineLayout():gfx.PipelineLayout; // cc::gfx::PipelineLayout*
    } // endof class PipelineState
    
    
    // ts : gfx.QueryPool
    // cpp: cc::gfx::QueryPool
    export class QueryPool extends gfx.GFXObject {
        // methods list
        constructor();
        initialize(info: gfx.QueryPoolInfo):void; // void
        destroy():void; // void
        hasResult(id: number):boolean; // bool
        getResult(id: number):number; // uint64_t
        getType():number; // cc::gfx::QueryType
        getMaxQueryObjects():number; // unsigned int
        getForceWait():boolean; // bool
    } // endof class QueryPool
    
    
    // ts : gfx.Queue
    // cpp: cc::gfx::Queue
    export class Queue extends gfx.GFXObject {
        // attributes list
        type: number;   // cc::gfx::QueueType
        // methods list
        constructor();
        initialize(info: gfx.QueueInfo):void; // void
        destroy():void; // void
        submit(cmdBuffs: gfx.CommandBuffer[]):void; // void
        submit(cmdBuffs: gfx.CommandBuffer, count: number):void; // void
    } // endof class Queue
    
    
    // ts : gfx.RenderPass
    // cpp: cc::gfx::RenderPass
    export class RenderPass extends gfx.GFXObject {
        // attributes list
        hash: number;   // unsigned int
        // static methods list
        static computeHash(info: gfx.RenderPassInfo):number; // unsigned int
        // methods list
        constructor();
        initialize(info: gfx.RenderPassInfo):void; // void
        destroy():void; // void
        getColorAttachments():gfx.ColorAttachment[]; // std::vector<cc::gfx::ColorAttachment>
        getDepthStencilAttachment():gfx.DepthStencilAttachment; // cc::gfx::DepthStencilAttachment
        getSubpasses():gfx.SubpassInfo[]; // std::vector<cc::gfx::SubpassInfo>
        getDependencies():gfx.SubpassDependency[]; // std::vector<cc::gfx::SubpassDependency>
    } // endof class RenderPass
    
    
    // ts : gfx.Shader
    // cpp: cc::gfx::Shader
    export class Shader extends gfx.GFXObject {
        // attributes list
        name        : string;               // std::string
        stages      : gfx.ShaderStage[];    // std::vector<cc::gfx::ShaderStage>
        attributes  : gfx.Attribute[];      // std::vector<cc::gfx::Attribute>
        blocks      : gfx.UniformBlock[];   // std::vector<cc::gfx::UniformBlock>
        samplers    : gfx.UniformSampler[]; // std::vector<cc::gfx::UniformSampler>
        // methods list
        constructor();
        initialize(info: gfx.ShaderInfo):void; // void
        destroy():void; // void
        getBuffers():gfx.UniformStorageBuffer[]; // std::vector<cc::gfx::UniformStorageBuffer>
        getSamplerTextures():gfx.UniformSamplerTexture[]; // std::vector<cc::gfx::UniformSamplerTexture>
        getTextures():gfx.UniformTexture[]; // std::vector<cc::gfx::UniformTexture>
        getImages():gfx.UniformStorageImage[]; // std::vector<cc::gfx::UniformStorageImage>
        getSubpassInputs():gfx.UniformInputAttachment[]; // std::vector<cc::gfx::UniformInputAttachment>
    } // endof class Shader
    
    
    // ts : gfx.Texture
    // cpp: cc::gfx::Texture
    export class Texture extends gfx.GFXObject {
        // attributes list
        info    : gfx.TextureInfo;      // cc::gfx::TextureInfo
        viewInfo: gfx.TextureViewInfo;  // cc::gfx::TextureViewInfo
        width   : number;               // unsigned int
        height  : number;               // unsigned int
        format  : number;               // cc::gfx::Format
        size    : number;               // unsigned int
        hash    : number;               // unsigned int
        // static methods list
        static computeHash(info: gfx.TextureViewInfo):number; // unsigned int
        static computeHash(info: gfx.TextureInfo):number; // unsigned int
        // methods list
        constructor();
        initialize(info: gfx.TextureViewInfo):void; // void
        initialize(info: gfx.TextureInfo):void; // void
        resize(width: number, height: number):void; // void
        destroy():void; // void
        isTextureView():boolean; // bool
        getRaw():gfx.Texture; // cc::gfx::Texture*
    } // endof class Texture
    
    
    // ts : gfx.Swapchain
    // cpp: cc::gfx::Swapchain
    export class Swapchain extends gfx.GFXObject {
        // attributes list
        width               : number;       // unsigned int
        height              : number;       // unsigned int
        surfaceTransform    : number;       // cc::gfx::SurfaceTransform
        colorTexture        : gfx.Texture;  // cc::gfx::Texture*
        depthStencilTexture : gfx.Texture;  // cc::gfx::Texture*
        // methods list
        constructor();
        initialize(info: gfx.SwapchainInfo):void; // void
        destroy():void; // void
        /**
         * Resize the swapchain with the given metric.
         * 
         * Note that you should invoke this function iff when there is actual
         * 
         * size or orientation changes, with the up-to-date information about
         * 
         * the underlying surface.
         * 
         * param width The width of the surface in oriented screen space
         * 
         * param height The height of the surface in oriented screen space
         * 
         * param transform The orientation of the surface
         */
        resize(width: number, height: number, transform: number):void; // void
        /**
         * /
         */
        destroySurface():void; // void
        createSurface(windowHandle: ArrayBuffer):void; // void
        getWindowHandle():ArrayBuffer; // void*
        getVSyncMode():number; // cc::gfx::VsyncMode
    } // endof class Swapchain
    
    
    // ts : gfx.BufferBarrier
    // cpp: cc::gfx::BufferBarrier
    export class BufferBarrier extends gfx.GFXObject {
        // static methods list
        static computeHash(info: gfx.BufferBarrierInfo):number; // unsigned int
        // methods list
        constructor(info: gfx.BufferBarrierInfo);
        getInfo():gfx.BufferBarrierInfo; // cc::gfx::BufferBarrierInfo
        getHash():number; // unsigned int
    } // endof class BufferBarrier
    
    
    // ts : gfx.GeneralBarrier
    // cpp: cc::gfx::GeneralBarrier
    export class GeneralBarrier extends gfx.GFXObject {
        // static methods list
        static computeHash(info: gfx.GeneralBarrierInfo):number; // unsigned int
        // methods list
        constructor(info: gfx.GeneralBarrierInfo);
        getInfo():gfx.GeneralBarrierInfo; // cc::gfx::GeneralBarrierInfo
        getHash():number; // unsigned int
    } // endof class GeneralBarrier
    
    
    // ts : gfx.Sampler
    // cpp: cc::gfx::Sampler
    export class Sampler extends gfx.GFXObject {
        // attributes list
        info: gfx.SamplerInfo;  // cc::gfx::SamplerInfo
        // static methods list
        static computeHash(info: gfx.SamplerInfo):number; // unsigned int
        static unpackFromHash(hash: number):gfx.SamplerInfo; // cc::gfx::SamplerInfo
        // methods list
        constructor(info: gfx.SamplerInfo);
        getHash():number; // unsigned int
    } // endof class Sampler
    
    
    // ts : gfx.TextureBarrier
    // cpp: cc::gfx::TextureBarrier
    export class TextureBarrier extends gfx.GFXObject {
        // static methods list
        static computeHash(info: gfx.TextureBarrierInfo):number; // unsigned int
        // methods list
        constructor(info: gfx.TextureBarrierInfo);
        getInfo():gfx.TextureBarrierInfo; // cc::gfx::TextureBarrierInfo
        getHash():number; // unsigned int
    } // endof class TextureBarrier
    
    
    // ts : gfx.Device
    // cpp: cc::gfx::Device
    export class Device {
        // attributes list
        gfxAPI          : number;           // cc::gfx::API
        deviceName      : string;           // std::string
        memoryStatus    : gfx.MemoryStatus; // cc::gfx::MemoryStatus
        queue           : gfx.Queue;        // cc::gfx::Queue*
        commandBuffer   : gfx.CommandBuffer;// cc::gfx::CommandBuffer*
        renderer        : string;           // std::string
        vendor          : string;           // std::string
        numDrawCalls    : number;           // unsigned int
        numInstances    : number;           // unsigned int
        numTris         : number;           // unsigned int
        capabilities    : gfx.DeviceCaps;   // cc::gfx::DeviceCaps
        // methods list
        initialize(info: gfx.DeviceInfo):boolean; // bool
        destroy():void; // void
        acquire(swapchains: gfx.Swapchain[]):void; // void
        acquire(swapchains: gfx.Swapchain, count: number):void; // void
        present():void; // void
        flushCommands(cmdBuffs: gfx.CommandBuffer[]):void; // void
        flushCommands(cmdBuffs: gfx.CommandBuffer, count: number):void; // void
        createCommandBuffer(info: gfx.CommandBufferInfo):gfx.CommandBuffer; // cc::gfx::CommandBuffer*
        createQueue(info: gfx.QueueInfo):gfx.Queue; // cc::gfx::Queue*
        createQueryPool(info: gfx.QueryPoolInfo):gfx.QueryPool; // cc::gfx::QueryPool*
        createSwapchain(info: gfx.SwapchainInfo):gfx.Swapchain; // cc::gfx::Swapchain*
        createBuffer(info: gfx.BufferViewInfo):gfx.Buffer; // cc::gfx::Buffer*
        createBuffer(info: gfx.BufferInfo):gfx.Buffer; // cc::gfx::Buffer*
        createTexture(info: gfx.TextureViewInfo):gfx.Texture; // cc::gfx::Texture*
        createTexture(info: gfx.TextureInfo):gfx.Texture; // cc::gfx::Texture*
        createShader(info: gfx.ShaderInfo):gfx.Shader; // cc::gfx::Shader*
        createInputAssembler(info: gfx.InputAssemblerInfo):gfx.InputAssembler; // cc::gfx::InputAssembler*
        createRenderPass(info: gfx.RenderPassInfo):gfx.RenderPass; // cc::gfx::RenderPass*
        createFramebuffer(info: gfx.FramebufferInfo):gfx.Framebuffer; // cc::gfx::Framebuffer*
        createDescriptorSet(info: gfx.DescriptorSetInfo):gfx.DescriptorSet; // cc::gfx::DescriptorSet*
        createDescriptorSetLayout(info: gfx.DescriptorSetLayoutInfo):gfx.DescriptorSetLayout; // cc::gfx::DescriptorSetLayout*
        createPipelineLayout(info: gfx.PipelineLayoutInfo):gfx.PipelineLayout; // cc::gfx::PipelineLayout*
        createPipelineState(info: gfx.PipelineStateInfo):gfx.PipelineState; // cc::gfx::PipelineState*
        getSampler(info: gfx.SamplerInfo):gfx.Sampler; // cc::gfx::Sampler*
        getGeneralBarrier(info: gfx.GeneralBarrierInfo):gfx.GeneralBarrier; // cc::gfx::GeneralBarrier*
        getTextureBarrier(info: gfx.TextureBarrierInfo):gfx.TextureBarrier; // cc::gfx::TextureBarrier*
        getBufferBarrier(info: gfx.BufferBarrierInfo):gfx.BufferBarrier; // cc::gfx::BufferBarrier*
        copyBuffersToTexture(buffers: string[], dst: gfx.Texture, regions: gfx.BufferTextureCopy[]):void; // void
        copyBuffersToTexture(buffers: string, dst: gfx.Texture, regions: gfx.BufferTextureCopy, count: number):void; // void
        copyTextureToBuffers(src: gfx.Texture, buffers: string[], regions: gfx.BufferTextureCopy[]):void; // void
        copyTextureToBuffers(src: gfx.Texture, buffers: string, region: gfx.BufferTextureCopy, count: number):void; // void
        getQueryPoolResults(queryPool: gfx.QueryPool):void; // void
        getQueryPool():gfx.QueryPool; // cc::gfx::QueryPool*
        hasFeature(feature: number):boolean; // bool
        getFormatFeatures(format: number):number; // cc::gfx::FormatFeatureBit
        bindingMappingInfo():gfx.BindingMappingInfo; // cc::gfx::BindingMappingInfo
        setOptions(opts: gfx.DeviceOptions):void; // void
        getOptions():gfx.DeviceOptions; // cc::gfx::DeviceOptions
    } // endof class Device
    
    
    // ts : gfx.DeviceManager
    // cpp: cc::gfx::DeviceManager
    export class DeviceManager {
        // static methods list
        static create(info: gfx.DeviceInfo):gfx.Device; // cc::gfx::Device*
        static create():gfx.Device; // cc::gfx::Device*
    } // endof class DeviceManager
} // endof namespace gfx

declare namespace cc {
    
    
    // ts : cc.Texture2D
    // cpp: cc::middleware::Texture2D
    export class Texture2D {
        // methods list
        constructor();
        /**
         * Sets the min filter, mag filter, wrap s and wrap t texture parameters.
         * 
         * If the texture size is NPOT (non power of 2), then in can only use GL_CLAMP_TO_EDGE in GL_TEXTURE_WRAP_{S,T}.
         * 
         * warning Calling this method could allocate additional texture memory.
         * 
         * since v0.8
         * 
         * code
         * 
         * When this function bound into js or lua,the input parameter will be changed
         * 
         * In js: var setBlendFunc(var arg1, var arg2, var arg3, var arg4)
         * 
         * In lua: local setBlendFunc(local arg1, local arg2, local arg3, local arg4)
         * 
         * endcode
         */
        setTexParameters(texParams: cc.Texture2D._TexParams):void; // void
        /**
         * Gets the width of the texture in pixels.
         */
        getPixelsWide():number; // int
        /**
         * Gets the height of the texture in pixels.
         */
        getPixelsHigh():number; // int
        /**
         * Gets real texture index
         */
        getRealTextureIndex():number; // int
        /**
         * Sets the width of the texture in pixels.
         */
        setPixelsWide(wide: number):void; // void
        /**
         * Sets the height of the texture in pixels.
         */
        setPixelsHigh(high: number):void; // void
        /**
         * Sets real texture index.
         */
        setRealTextureIndex(textureIndex: number):void; // void
        /**
         * Sets texture param callback
         */
        setTexParamCallback(callback: AnyFunction):void; // void
    } // endof class Texture2D
    
    
    // ts : cc.SharedBufferManager
    // cpp: cc::middleware::SharedBufferManager
    export class SharedBufferManager {
        // methods list
        constructor(arrayType: number);
        reset():void; // void
        getBuffer():cc.IOTypedArray; // cc::middleware::IOTypedArray*
        setResizeCallback(callback: AnyFunction):void; // void
        getSharedBuffer():jsb.Object; // se::Object*
    } // endof class SharedBufferManager
    
    
    // ts : cc.MiddlewareManager
    // cpp: cc::middleware::MiddlewareManager
    export class MiddlewareManager {
        // static methods list
        static getInstance():cc.MiddlewareManager; // cc::middleware::MiddlewareManager*
        static destroyInstance():void; // void
        static generateModuleID():number; // unsigned char
        // methods list
        /**
         * brief update all elements
         * 
         * param[in] dt Delta time.
         */
        update(dt: number):void; // void
        /**
         * brief render all elements
         */
        render(dt: number):void; // void
        /**
         * brief Third party module add in _updateMap,it will update perframe.
         * 
         * param[in] editor Module must implement IMiddleware interface.
         */
        addTimer(editor: cc.IMiddleware):void; // void
        /**
         * brief Third party module remove from _updateMap,it will stop update.
         * 
         * param[in] editor Module must implement IMiddleware interface.
         */
        removeTimer(editor: cc.IMiddleware):void; // void
        getMeshBuffer(format: number):cc.MeshBuffer; // cc::middleware::MeshBuffer*
        getVBTypedArray(format: number, bufferPos: number):jsb.Object; // se::Object*
        getIBTypedArray(format: number, bufferPos: number):jsb.Object; // se::Object*
        getBufferCount(format: number):number; // unsigned int
        getVBTypedArrayLength(format: number, bufferPos: number):number; // unsigned int
        getIBTypedArrayLength(format: number, bufferPos: number):number; // unsigned int
        getRenderInfoMgr():cc.SharedBufferManager; // cc::middleware::SharedBufferManager*
        getAttachInfoMgr():cc.SharedBufferManager; // cc::middleware::SharedBufferManager*
        constructor();
    } // endof class MiddlewareManager
    
    
    // ts : cc.EventAssetsManagerEx
    // cpp: cc::extension::EventAssetsManagerEx
    export class EventAssetsManagerEx {
        // methods list
        getEventCode():number; // cc::extension::EventAssetsManagerEx::EventCode
        getCURLECode():number; // int
        getCURLMCode():number; // int
        getMessage():string; // std::string
        getAssetId():string; // std::string
        getAssetsManagerEx():cc.AssetsManagerEx; // cc::extension::AssetsManagerEx*
        isResuming():boolean; // bool
        getPercent():number; // float
        getPercentByFile():number; // float
        getDownloadedBytes():number; // double
        getTotalBytes():number; // double
        getDownloadedFiles():number; // int
        getTotalFiles():number; // int
        constructor(eventName: string, manager: cc.AssetsManagerEx, code: number, assetId: string, message: string, curleCode: number, curlmCode: number);
    } // endof class EventAssetsManagerEx
    
    
    // ts : cc.Manifest
    // cpp: cc::extension::Manifest
    export class Manifest {
        // methods list
        /**
         * @brief Check whether the version informations have been fully loaded
         */
        isVersionLoaded():boolean; // bool
        /**
         * @brief Check whether the manifest have been fully loaded
         */
        isLoaded():boolean; // bool
        /**
         * @brief Gets remote package url.
         */
        getPackageUrl():string; // std::string
        /**
         * @brief Gets remote manifest file url.
         */
        getManifestFileUrl():string; // std::string
        /**
         * @brief Gets remote version file url.
         */
        getVersionFileUrl():string; // std::string
        /**
         * @brief Gets manifest version.
         */
        getVersion():string; // std::string
        /**
         * @brief Get the search paths list related to the Manifest.
         */
        getSearchPaths():string[]; // std::vector<std::string>
        /**
         * @brief Get the manifest root path, normally it should also be the local storage path.
         */
        getManifestRoot():string; // std::string
        constructor(content: string, manifestRoot: string);
        constructor(manifestUrl: string);
        /**
         * @brief Parse the manifest file information into this manifest
         * 
         * param manifestUrl Url of the local manifest
         */
        parseFile(manifestUrl: string):void; // void
        /**
         * @brief Parse the manifest from json string into this manifest
         * 
         * param content Json string content
         * 
         * param manifestRoot The root path of the manifest file (It should be local path, so that we can find assets path relative to the root path)
         */
        parseJSONString(content: string, manifestRoot: string):void; // void
        /**
         * @brief Get whether the manifest is being updating
         * 
         * return Updating or not
         */
        isUpdating():boolean; // bool
        /**
         * @brief Set whether the manifest is being updating
         * 
         * param updating Updating or not
         */
        setUpdating(updating: boolean):void; // void
    } // endof class Manifest
    
    
    // ts : cc.AssetsManagerEx
    // cpp: cc::extension::AssetsManagerEx
    export class AssetsManagerEx {
        // static methods list
        /**
         * @brief Create function for creating a new AssetsManagerEx
         * 
         * param manifestUrl   The url for the local manifest file
         * 
         * param storagePath   The storage path for downloaded assets
         * 
         * warning   The cached manifest in your storage path have higher priority and will be searched first,
         * 
         * only if it doesn't exist, AssetsManagerEx will use the given manifestUrl.
         */
        static create(manifestUrl: string, storagePath: string):cc.AssetsManagerEx; // cc::extension::AssetsManagerEx*
        // methods list
        constructor(manifestUrl: string, storagePath: string, handle: AnyFunction);
        constructor(manifestUrl: string, storagePath: string);
        /**
         * @brief  Check out if there is a new version of manifest.
         * 
         * You may use this method before updating, then let user determine whether
         * 
         * he wants to update resources.
         */
        checkUpdate():void; // void
        /**
         * @brief Prepare the update process, this will cleanup download process flags, fill up download units with temporary manifest or remote manifest
         */
        prepareUpdate():void; // void
        /**
         * @brief Update with the current local manifest.
         */
        update():void; // void
        /**
         * @brief Reupdate all failed assets under the current AssetsManagerEx context
         */
        downloadFailedAssets():void; // void
        /**
         * @brief Gets the current update state.
         */
        getState():number; // cc::extension::AssetsManagerEx::State
        /**
         * @brief Gets storage path.
         */
        getStoragePath():string; // std::string
        /**
         * @brief Function for retrieving the local manifest object
         */
        getLocalManifest():cc.Manifest; // cc::extension::Manifest*
        /**
         * @brief Load a local manifest from url.
         * 
         * You can only manually load local manifest when the update state is UNCHECKED, it will fail once the update process is began.
         * 
         * This API will do the following things:
         * 
         * 1. Reset storage path
         * 
         * 2. Set local storage
         * 
         * 3. Search for cached manifest and compare with the local manifest
         * 
         * 4. Init temporary manifest and remote manifest
         * 
         * If successfully load the given local manifest and inited other manifests, it will return true, otherwise it will return false
         * 
         * param manifestUrl    The local manifest url
         */
        loadLocalManifest(manifestUrl: string):boolean; // bool
        /**
         * @brief Load a custom local manifest object, the local manifest must be loaded already.
         * 
         * You can only manually load local manifest when the update state is UNCHECKED, it will fail once the update process is began.
         * 
         * This API will do the following things:
         * 
         * 1. Reset storage path
         * 
         * 2. Set local storage
         * 
         * 3. Search for cached manifest and compare with the local manifest
         * 
         * 4. Init temporary manifest and remote manifest
         * 
         * If successfully load the given local manifest and inited other manifests, it will return true, otherwise it will return false
         * 
         * param localManifest    The local manifest object to be set
         * 
         * param storagePath    The local storage path
         */
        loadLocalManifest(localManifest: cc.Manifest, storagePath: string):boolean; // bool
        /**
         * @brief Function for retrieving the remote manifest object
         */
        getRemoteManifest():cc.Manifest; // cc::extension::Manifest*
        /**
         * @brief Load a custom remote manifest object, the manifest must be loaded already.
         * 
         * You can only manually load remote manifest when the update state is UNCHECKED and local manifest is already inited, it will fail once the update process is began.
         * 
         * param remoteManifest    The remote manifest object to be set
         */
        loadRemoteManifest(remoteManifest: cc.Manifest):boolean; // bool
        /**
         * @brief Gets whether the current download is resuming previous unfinished job, this will only be available after READY_TO_UPDATE state, under unknown states it will return false by default.
         */
        isResuming():boolean; // bool
        /**
         * @brief Gets the total byte size to be downloaded of the update, this will only be available after READY_TO_UPDATE state, under unknown states it will return 0 by default.
         */
        getTotalBytes():number; // double
        /**
         * @brief Gets the current downloaded byte size of the update, this will only be available after READY_TO_UPDATE state, under unknown states it will return 0 by default.
         */
        getDownloadedBytes():number; // double
        /**
         * @brief Gets the total files count to be downloaded of the update, this will only be available after READY_TO_UPDATE state, under unknown states it will return 0 by default.
         */
        getTotalFiles():number; // int
        /**
         * @brief Gets the current downloaded files count of the update, this will only be available after READY_TO_UPDATE state, under unknown states it will return 0 by default.
         */
        getDownloadedFiles():number; // int
        /**
         * @brief Function for retrieving the max concurrent task count
         */
        getMaxConcurrentTask():number; // int
        /**
         * @brief Function for setting the max concurrent task count
         */
        setMaxConcurrentTask(max: number):void; // void
        /**
         * @brief Set the handle function for comparing manifests versions
         * 
         * param handle    The compare function
         */
        setVersionCompareHandle(handle: AnyFunction):void; // void
        /**
         * @brief Set the verification function for checking whether downloaded asset is correct, e.g. using md5 verification
         * 
         * param callback  The verify callback function
         */
        setVerifyCallback(callback: AnyFunction):void; // void
        /**
         * @brief Set the event callback for receiving update process events
         * 
         * param callback  The event callback function
         */
        setEventCallback(callback: AnyFunction):void; // void
    } // endof class AssetsManagerEx
    
    
    // ts : cc.DownloaderHints
    // cpp: cc::network::DownloaderHints
    export class DownloaderHints {
        // public_fields list
        countOfMaxProcessingTasks   : number;   // unsigned int
        timeoutInSeconds            : number;   // unsigned int
        tempFileNameSuffix          : string;   // std::string
    } // endof class DownloaderHints
    
    
    // ts : cc.Downloader
    // cpp: cc::network::Downloader
    export class Downloader {
        // attributes list
        onProgress  : AnyFunction;  // std::function<void (const cc::network::DownloadTask &, unsigned int, unsigned int, unsigned int)>
        // methods list
        constructor(hints: number);
        constructor();
        setOnSuccess(callback: AnyFunction):void; // void
        setOnError(callback: AnyFunction):void; // void
        setOnTaskProgress(callback: AnyFunction):void; // void
        createDataTask(srcUrl: string):cc.network.DownloadTask; // std::shared_ptr<const cc::network::DownloadTask>
        createDataTask(srcUrl: string, identifier: string):cc.network.DownloadTask; // std::shared_ptr<const cc::network::DownloadTask>
        createDownloadTask(srcUrl: string, storagePath: string, header: {[key:string]:string}):cc.network.DownloadTask; // std::shared_ptr<const cc::network::DownloadTask>
        createDownloadTask(srcUrl: string, storagePath: string, header: {[key:string]:string}, identifier: string):cc.network.DownloadTask; // std::shared_ptr<const cc::network::DownloadTask>
        createDownloadTask(srcUrl: string, storagePath: string):cc.network.DownloadTask; // std::shared_ptr<const cc::network::DownloadTask>
        createDownloadTask(srcUrl: string, storagePath: string, identifier: string):cc.network.DownloadTask; // std::shared_ptr<const cc::network::DownloadTask>
        abort(task: cc.DownloadTask):void; // void
    } // endof class Downloader
} // endof namespace cc

declare namespace jsb {
    
    
    // ts : jsb.UIMeshBuffer
    // cpp: cc::UIMeshBuffer
    export class UIMeshBuffer {
        // attributes list
        vData   : number;   // float*
        iData   : number;   // unsigned short*
        // methods list
        constructor();
        initialize(device: gfx.Device, attrs: gfx.Attribute[], vFloatCount: number, iCount: number):void; // void
        reset():void; // void
        destroy():void; // void
        setDirty(dirty: boolean):void; // void
        setDirty():void; // void
        uploadBuffers():void; // void
        syncSharedBufferToNative(buffer: number):void; // void
        resetIA():void; // void
        recycleIA(ia: gfx.InputAssembler):void; // void
        parseLayout():void; // void
        requireFreeIA(device: gfx.Device):gfx.InputAssembler; // cc::gfx::InputAssembler*
        createNewIA(device: gfx.Device):gfx.InputAssembler; // cc::gfx::InputAssembler*
        getByteOffset():number; // unsigned int
        setByteOffset(byteOffset: number):void; // void
        getVertexOffset():number; // unsigned int
        setVertexOffset(vertexOffset: number):void; // void
        getIndexOffset():number; // unsigned int
        setIndexOffset(indexOffset: number):void; // void
        getDirty():boolean; // bool
        getFloatsPerVertex():number; // unsigned int
        setFloatsPerVertex(floatsPerVertex: number):void; // void
    } // endof class UIMeshBuffer
    
    
    // ts : jsb.RenderDrawInfo
    // cpp: cc::RenderDrawInfo
    export class RenderDrawInfo {
        // attributes list
        bufferId    : number;       // unsigned short
        accId       : number;       // unsigned short
        vertexOffset: number;       // unsigned int
        indexOffset : number;       // unsigned int
        vbBuffer    : number;       // float*
        ibBuffer    : number;       // unsigned short*
        vDataBuffer : number;       // float*
        iDataBuffer : number;       // unsigned short*
        vbCount     : number;       // unsigned int
        ibCount     : number;       // unsigned int
        vertDirty   : boolean;      // bool
        dataHash    : number;       // unsigned int
        isMeshBuffer: boolean;      // bool
        material    : jsb.Material; // cc::Material*
        texture     : gfx.Texture;  // cc::gfx::Texture*
        sampler     : gfx.Sampler;  // cc::gfx::Sampler*
        model       : jsb.Model;    // cc::scene::Model*
        drawInfoType: number;       // unsigned int
        subNode     : jsb.Node;     // cc::Node*
        stride      : number;       // unsigned char
        // methods list
        constructor();
        getMeshBuffer():jsb.UIMeshBuffer; // cc::UIMeshBuffer*
        changeMeshBuffer():void; // void
        getEnumDrawInfoType():number; // cc::RenderDrawInfoType
        setRender2dBufferToNative(buffer: string):void; // void
        getRender2dLayout(dataOffset: number):jsb.Render2dLayout; // cc::Render2dLayout*
        getAttrSharedBufferForJS():jsb.Object; // se::Object*
        requestIA(device: gfx.Device):gfx.InputAssembler; // cc::gfx::InputAssembler*
        uploadBuffers():void; // void
        resetMeshIA():void; // void
        getLocalDes():gfx.DescriptorSet; // cc::gfx::DescriptorSet*
        updateLocalDescriptorSet(transform: jsb.Node, dsLayout: gfx.DescriptorSetLayout):void; // void
    } // endof class RenderDrawInfo
    
    
    // ts : jsb.RenderEntity
    // cpp: cc::RenderEntity
    export class RenderEntity {
        // attributes list
        node                : jsb.Node; // cc::Node*
        staticDrawInfoSize  : number;   // unsigned int
        stencilStage        : number;   // unsigned int
        // methods list
        constructor(type: number);
        addDynamicRenderDrawInfo(drawInfo: jsb.RenderDrawInfo):void; // void
        setDynamicRenderDrawInfo(drawInfo: jsb.RenderDrawInfo, index: number):void; // void
        removeDynamicRenderDrawInfo():void; // void
        clearDynamicRenderDrawInfos():void; // void
        getIsMask():boolean; // bool
        getIsSubMask():boolean; // bool
        getIsMaskInverted():boolean; // bool
        getUseLocal():boolean; // bool
        setUseLocal(useLocal: boolean):void; // void
        getEnumStencilStage():number; // cc::StencilStage
        setEnumStencilStage(stage: number):void; // void
        getRenderEntityType():number; // cc::RenderEntityType
        getStaticRenderDrawInfo(index: number):jsb.RenderDrawInfo; // cc::RenderDrawInfo*
        getStaticRenderDrawInfos():jsb.RenderDrawInfo[]; // std::array<cc::RenderDrawInfo, 4>
        getDynamicRenderDrawInfo(index: number):jsb.RenderDrawInfo; // cc::RenderDrawInfo*
        getDynamicRenderDrawInfos():jsb.RenderDrawInfo[]; // std::vector<cc::RenderDrawInfo *>
        getEntitySharedBufferForJS():jsb.Object; // se::Object*
        getColorDirty():boolean; // bool
        setColorDirty(dirty: boolean):void; // void
        getVBColorDirty():boolean; // bool
        setVBColorDirty(vbColorDirty: boolean):void; // void
        getColor():jsb.Color; // cc::Color
        getColorAlpha():number; // float
        getLocalOpacity():number; // float
        getOpacity():number; // float
        setOpacity(opacity: number):void; // void
        isEnabled():boolean; // bool
        getRenderDrawInfosSize():number; // unsigned int
        getRenderDrawInfoAt(index: number):jsb.RenderDrawInfo; // cc::RenderDrawInfo*
    } // endof class RenderEntity
    
    
    // ts : jsb.Batcher2d
    // cpp: cc::Batcher2d
    export class Batcher2d {
        // methods list
        constructor(root: jsb.Root);
        constructor();
        syncMeshBuffersToNative(accId: number, buffers: jsb.UIMeshBuffer[]):void; // void
        initialize():boolean; // bool
        update():void; // void
        uploadBuffers():void; // void
        reset():void; // void
        syncRootNodesToNative(rootNodes: jsb.Node[]):void; // void
        releaseDescriptorSetCache(texture: gfx.Texture, sampler: gfx.Sampler):void; // void
        getMeshBuffer(accId: number, bufferId: number):jsb.UIMeshBuffer; // cc::UIMeshBuffer*
        getDevice():gfx.Device; // cc::gfx::Device*
        getDefaultAttribute():gfx.Attribute[]; // std::vector<cc::gfx::Attribute>*
        updateDescriptorSet():void; // void
        fillBuffersAndMergeBatches():void; // void
        walk(node: jsb.Node, parentOpacity: number):void; // void
        handlePostRender(entity: jsb.RenderEntity):void; // void
        handleDrawInfo(entity: jsb.RenderEntity, drawInfo: jsb.RenderDrawInfo, node: jsb.Node):void; // void
        generateBatch(entity: jsb.RenderEntity, drawInfo: jsb.RenderDrawInfo):void; // void
        resetRenderStates():void; // void
    } // endof class Batcher2d
    
    
    // ts : jsb.UIModelProxy
    // cpp: cc::UIModelProxy
    export class UIModelProxy {
        // methods list
        constructor();
        initModel(node: jsb.Node):void; // void
        activeSubModels():void; // void
        uploadData():void; // void
        destroy():void; // void
        clear():void; // void
        getModel():jsb.Model; // cc::scene::Model*
        updateModels(models: jsb.Model):void; // void
        attachDrawInfo():void; // void
        attachNode(node: jsb.Node):void; // void
    } // endof class UIModelProxy
    
    
    // ts : jsb.Error
    // cpp: cc::Error
    export class Error {
        // public_fields list
        msg ?: string;  // boost::optional<std::string>
    } // endof class Error
    
    
    // ts : jsb.BoundingBox
    // cpp: cc::BoundingBox
    export class BoundingBox {
        // public_fields list
        min : jsb.Vec3; // cc::Vec3
        max : jsb.Vec3; // cc::Vec3
    } // endof class BoundingBox
    
    
    // ts : jsb.VertexIdChannel
    // cpp: cc::VertexIdChannel
    export class VertexIdChannel {
        // public_fields list
        stream  : number;   // unsigned int
        index   : number;   // unsigned int
    } // endof class VertexIdChannel
    
    
    // ts : jsb.Asset
    // cpp: cc::Asset
    export class Asset extends jsb.CCObject,cc.EventTarget {
        // attributes list
        _uuid       : string;       // std::string
        nativeUrl   : string;       // std::string
        _nativeDep  : jsb.NativeDep;// cc::NativeDep
        isDefault   : boolean;      // bool
        // public_fields list
        _native     : string;   // std::string
        _nativeUrl  : string;   // std::string
        // methods list
        constructor();
        /**
         * en
         * 
         * The underlying native asset of this asset if one is available.
         * 
         * 
         * This property can be used to access additional details or functionality related to the asset.
         * 
         * 
         * This property will be initialized by the loader if `_native` is available.
         * 
         * zh
         * 
         * 此资源的基础资源（如果有）。 此属性可用于访问与资源相关的其他详细信息或功能。
         * 
         * 
         * 如果`_native`可用，则此属性将由加载器初始化。
         * 
         * default null
         * 
         * private
         */
        getNativeAsset():jsb.any; // ccstd::any
        setNativeAsset(obj: jsb.any):void; // void
        /**
         * en
         * 
         * Create a new node using this asset in the scene.
         * 
         * 
         * If this type of asset don't have its corresponding node type, this method should be null.
         * 
         * zh
         * 
         * 使用该资源在场景中创建一个新节点。
         * 
         * 
         * 如果这类资源没有相应的节点类型，该方法应该是空的。
         */
        createNode(cb: AnyFunction):void; // void
        addAssetRef():void; // void
        decAssetRef():void; // void
        decAssetRef(autoRelease: boolean):void; // void
        getAssetRefCount():number; // unsigned int
        onLoaded():void; // void
        initDefault(uuid?: string):void; // void
        initDefault():void; // void
        validate():boolean; // bool
        /**
         * return
         */
        serialize(arg0: jsb.any):jsb.any; // ccstd::any
        /**
         * param data
         */
        deserialize(serializedData: jsb.any, handle: jsb.any):void; // void
    } // endof class Asset
    
    
    // ts : jsb.BufferAsset
    // cpp: cc::BufferAsset
    export class BufferAsset extends jsb.Asset {
        // attributes list
        _nativeAsset: ArrayBuffer;  // cc::ArrayBuffer*
        // methods list
        constructor();
        getBuffer():ArrayBuffer; // cc::ArrayBuffer*
    } // endof class BufferAsset
    
    
    // ts : jsb.IPropertyInfo
    // cpp: cc::IPropertyInfo
    export class IPropertyInfo {
        // public_fields list
        type        : number;                   // int
        handleInfo  ?: [string, number, number];// boost::optional<std::tuple<std::string, unsigned int, cc::gfx::Type>>
        samplerHash ?: number;                  // boost::optional<unsigned int>
        value       ?: (number[]|string);       // boost::optional<boost::variant2::variant<std::vector<float>, std::string>>
        linear      ?: boolean;                 // boost::optional<bool>
    } // endof class IPropertyInfo
    
    
    // ts : jsb.RasterizerStateInfo
    // cpp: cc::RasterizerStateInfo
    export class RasterizerStateInfo {
        // public_fields list
        isDiscard       ?: boolean;             // boost::optional<bool>
        isFrontFaceCCW  ?: boolean;             // boost::optional<bool>
        depthBiasEnabled?: boolean;             // boost::optional<bool>
        isDepthClip     ?: boolean;             // boost::optional<bool>
        isMultisample   ?: boolean;             // boost::optional<bool>
        polygonMode     ?: cc.gfx.PolygonMode;  // boost::optional<cc::gfx::PolygonMode>
        shadeModel      ?: cc.gfx.ShadeModel;   // boost::optional<cc::gfx::ShadeModel>
        cullMode        ?: cc.gfx.CullMode;     // boost::optional<cc::gfx::CullMode>
        depthBias       ?: number;              // boost::optional<float>
        depthBiasClamp  ?: number;              // boost::optional<float>
        depthBiasSlop   ?: number;              // boost::optional<float>
        lineWidth       ?: number;              // boost::optional<float>
        // methods list
        fromGFXRasterizerState(rs: gfx.RasterizerState):void; // void
        assignToGFXRasterizerState(rs: gfx.RasterizerState):void; // void
    } // endof class RasterizerStateInfo
    
    
    // ts : jsb.DepthStencilStateInfo
    // cpp: cc::DepthStencilStateInfo
    export class DepthStencilStateInfo {
        // public_fields list
        depthTest               ?: boolean;                 // boost::optional<bool>
        depthWrite              ?: boolean;                 // boost::optional<bool>
        stencilTestFront        ?: boolean;                 // boost::optional<bool>
        stencilTestBack         ?: boolean;                 // boost::optional<bool>
        depthFunc               ?: cc.gfx.ComparisonFunc;   // boost::optional<cc::gfx::ComparisonFunc>
        stencilFuncFront        ?: cc.gfx.ComparisonFunc;   // boost::optional<cc::gfx::ComparisonFunc>
        stencilReadMaskFront    ?: number;                  // boost::optional<unsigned int>
        stencilWriteMaskFront   ?: number;                  // boost::optional<unsigned int>
        stencilFailOpFront      ?: cc.gfx.StencilOp;        // boost::optional<cc::gfx::StencilOp>
        stencilZFailOpFront     ?: cc.gfx.StencilOp;        // boost::optional<cc::gfx::StencilOp>
        stencilPassOpFront      ?: cc.gfx.StencilOp;        // boost::optional<cc::gfx::StencilOp>
        stencilRefFront         ?: number;                  // boost::optional<unsigned int>
        stencilFuncBack         ?: cc.gfx.ComparisonFunc;   // boost::optional<cc::gfx::ComparisonFunc>
        stencilReadMaskBack     ?: number;                  // boost::optional<unsigned int>
        stencilWriteMaskBack    ?: number;                  // boost::optional<unsigned int>
        stencilFailOpBack       ?: cc.gfx.StencilOp;        // boost::optional<cc::gfx::StencilOp>
        stencilZFailOpBack      ?: cc.gfx.StencilOp;        // boost::optional<cc::gfx::StencilOp>
        stencilPassOpBack       ?: cc.gfx.StencilOp;        // boost::optional<cc::gfx::StencilOp>
        stencilRefBack          ?: number;                  // boost::optional<unsigned int>
        // methods list
        fromGFXDepthStencilState(ds: gfx.DepthStencilState):void; // void
        assignToGFXDepthStencilState(ds: gfx.DepthStencilState):void; // void
    } // endof class DepthStencilStateInfo
    
    
    // ts : jsb.BlendTargetInfo
    // cpp: cc::BlendTargetInfo
    export class BlendTargetInfo {
        // public_fields list
        blend           ?: boolean;             // boost::optional<bool>
        blendSrc        ?: cc.gfx.BlendFactor;  // boost::optional<cc::gfx::BlendFactor>
        blendDst        ?: cc.gfx.BlendFactor;  // boost::optional<cc::gfx::BlendFactor>
        blendEq         ?: cc.gfx.BlendOp;      // boost::optional<cc::gfx::BlendOp>
        blendSrcAlpha   ?: cc.gfx.BlendFactor;  // boost::optional<cc::gfx::BlendFactor>
        blendDstAlpha   ?: cc.gfx.BlendFactor;  // boost::optional<cc::gfx::BlendFactor>
        blendAlphaEq    ?: cc.gfx.BlendOp;      // boost::optional<cc::gfx::BlendOp>
        blendColorMask  ?: cc.gfx.ColorMask;    // boost::optional<cc::gfx::ColorMask>
        // methods list
        fromGFXBlendTarget(target: gfx.BlendTarget):void; // void
        assignToGFXBlendTarget(target: gfx.BlendTarget):void; // void
    } // endof class BlendTargetInfo
    
    
    // ts : jsb.BlendStateInfo
    // cpp: cc::BlendStateInfo
    export class BlendStateInfo {
        // public_fields list
        isA2C       ?: boolean;                 // boost::optional<bool>
        isIndepend  ?: boolean;                 // boost::optional<bool>
        blendColor  ?: gfx.Color;               // boost::optional<cc::gfx::Color>
        targets     ?: jsb.BlendTargetInfo[];   // boost::optional<std::vector<cc::BlendTargetInfo>>
        // methods list
        fromGFXBlendState(bs: gfx.BlendState):void; // void
        assignToGFXBlendState(bs: gfx.BlendState):void; // void
    } // endof class BlendStateInfo
    
    
    // ts : jsb.IPassStates
    // cpp: cc::IPassStates
    export class IPassStates {
        // public_fields list
        priority            ?: number;                      // boost::optional<int>
        primitive           ?: cc.gfx.PrimitiveMode;        // boost::optional<cc::gfx::PrimitiveMode>
        stage               ?: cc.pipeline.RenderPassStage; // boost::optional<cc::pipeline::RenderPassStage>
        rasterizerState     ?: jsb.RasterizerStateInfo;     // boost::optional<cc::RasterizerStateInfo>
        depthStencilState   ?: jsb.DepthStencilStateInfo;   // boost::optional<cc::DepthStencilStateInfo>
        blendState          ?: jsb.BlendStateInfo;          // boost::optional<cc::BlendStateInfo>
        dynamicStates       ?: number;                      // boost::optional<cc::gfx::DynamicStateFlagBit>
        phase               ?: string;                      // boost::optional<std::string>
        // methods list
        constructor(o: jsb.IPassInfoFull);
        constructor();
        overrides(o: jsb.IPassInfoFull):void; // void
    } // endof class IPassStates
    
    
    // ts : jsb.IPassInfoFull
    // cpp: cc::IPassInfoFull
    export class IPassInfoFull {
        // public_fields list
        priority            ?: number;                                  // boost::optional<int>
        primitive           ?: cc.gfx.PrimitiveMode;                    // boost::optional<cc::gfx::PrimitiveMode>
        stage               ?: cc.pipeline.RenderPassStage;             // boost::optional<cc::pipeline::RenderPassStage>
        rasterizerState     ?: jsb.RasterizerStateInfo;                 // boost::optional<cc::RasterizerStateInfo>
        depthStencilState   ?: jsb.DepthStencilStateInfo;               // boost::optional<cc::DepthStencilStateInfo>
        blendState          ?: jsb.BlendStateInfo;                      // boost::optional<cc::BlendStateInfo>
        dynamicStates       ?: number;                                  // boost::optional<cc::gfx::DynamicStateFlagBit>
        phase               ?: string;                                  // boost::optional<std::string>
        program             : string;                                   // std::string
        embeddedMacros      ?: {[key:string]:(number|boolean|string)};  // boost::optional<std::unordered_map<std::string, boost::variant2::variant<int, bool, std::string>>>
        propertyIndex       : number;                                   // int
        switch              ?: string;                                  // boost::optional<std::string>
        properties          ?: {[key:string]:jsb.IPropertyInfo};        // boost::optional<std::unordered_map<std::string, cc::IPropertyInfo>>
        passIndex           : number;                                   // int
        defines             : {[key:string]:(number|boolean|string)};   // std::unordered_map<std::string, boost::variant2::variant<int, bool, std::string>>
        stateOverrides      ?: jsb.IPassStates;                         // boost::optional<cc::IPassStates>
        // methods list
        constructor(o: jsb.IPassStates);
        constructor();
    } // endof class IPassInfoFull
    
    
    // ts : jsb.ITechniqueInfo
    // cpp: cc::ITechniqueInfo
    export class ITechniqueInfo {
        // public_fields list
        passes  : jsb.IPassInfoFull[];  // std::vector<cc::IPassInfoFull>
        name    ?: string;              // boost::optional<std::string>
    } // endof class ITechniqueInfo
    
    
    // ts : jsb.IBlockInfo
    // cpp: cc::IBlockInfo
    export class IBlockInfo {
        // public_fields list
        binding     : number;       // unsigned int
        name        : string;       // std::string
        members     : gfx.Uniform[];// std::vector<cc::gfx::Uniform>
        stageFlags  : number;       // cc::gfx::ShaderStageFlagBit
    } // endof class IBlockInfo
    
    
    // ts : jsb.ISamplerTextureInfo
    // cpp: cc::ISamplerTextureInfo
    export class ISamplerTextureInfo {
        // public_fields list
        binding     : number;   // unsigned int
        name        : string;   // std::string
        type        : number;   // cc::gfx::Type
        count       : number;   // unsigned int
        stageFlags  : number;   // cc::gfx::ShaderStageFlagBit
    } // endof class ISamplerTextureInfo
    
    
    // ts : jsb.ITextureInfo
    // cpp: cc::ITextureInfo
    export class ITextureInfo {
        // public_fields list
        set         : number;   // unsigned int
        binding     : number;   // unsigned int
        name        : string;   // std::string
        type        : number;   // cc::gfx::Type
        count       : number;   // unsigned int
        stageFlags  : number;   // cc::gfx::ShaderStageFlagBit
    } // endof class ITextureInfo
    
    
    // ts : jsb.ISamplerInfo
    // cpp: cc::ISamplerInfo
    export class ISamplerInfo {
        // public_fields list
        set         : number;   // unsigned int
        binding     : number;   // unsigned int
        name        : string;   // std::string
        count       : number;   // unsigned int
        stageFlags  : number;   // cc::gfx::ShaderStageFlagBit
    } // endof class ISamplerInfo
    
    
    // ts : jsb.IBufferInfo
    // cpp: cc::IBufferInfo
    export class IBufferInfo {
        // public_fields list
        binding     : number;   // unsigned int
        name        : string;   // std::string
        memoryAccess: number;   // cc::gfx::MemoryAccessBit
        stageFlags  : number;   // cc::gfx::ShaderStageFlagBit
    } // endof class IBufferInfo
    
    
    // ts : jsb.IImageInfo
    // cpp: cc::IImageInfo
    export class IImageInfo {
        // public_fields list
        binding     : number;   // unsigned int
        name        : string;   // std::string
        type        : number;   // cc::gfx::Type
        count       : number;   // unsigned int
        memoryAccess: number;   // cc::gfx::MemoryAccessBit
        stageFlags  : number;   // cc::gfx::ShaderStageFlagBit
    } // endof class IImageInfo
    
    
    // ts : jsb.IInputAttachmentInfo
    // cpp: cc::IInputAttachmentInfo
    export class IInputAttachmentInfo {
        // public_fields list
        set         : number;   // unsigned int
        binding     : number;   // unsigned int
        name        : string;   // std::string
        count       : number;   // unsigned int
        stageFlags  : number;   // cc::gfx::ShaderStageFlagBit
    } // endof class IInputAttachmentInfo
    
    
    // ts : jsb.IAttributeInfo
    // cpp: cc::IAttributeInfo
    export class IAttributeInfo {
        // public_fields list
        name        : string;   // std::string
        format      : number;   // cc::gfx::Format
        isNormalized: boolean;  // bool
        stream      : number;   // unsigned int
        isInstanced : boolean;  // bool
        location    : number;   // unsigned int
        defines     : string[]; // std::vector<std::string>
    } // endof class IAttributeInfo
    
    
    // ts : jsb.IDefineInfo
    // cpp: cc::IDefineInfo
    export class IDefineInfo {
        // public_fields list
        name        : string;   // std::string
        type        : string;   // std::string
        range       ?: number[];// boost::optional<std::vector<int>>
        options     ?: string[];// boost::optional<std::vector<std::string>>
        defaultVal  ?: string;  // boost::optional<std::string>
    } // endof class IDefineInfo
    
    
    // ts : jsb.IBuiltin
    // cpp: cc::IBuiltin
    export class IBuiltin {
        // public_fields list
        name    : string;   // std::string
        defines : string[]; // std::vector<std::string>
    } // endof class IBuiltin
    
    
    // ts : jsb.IBuiltinInfo
    // cpp: cc::IBuiltinInfo
    export class IBuiltinInfo {
        // public_fields list
        buffers         : jsb.IBuiltin[];   // std::vector<cc::IBuiltin>
        blocks          : jsb.IBuiltin[];   // std::vector<cc::IBuiltin>
        samplerTextures : jsb.IBuiltin[];   // std::vector<cc::IBuiltin>
        images          : jsb.IBuiltin[];   // std::vector<cc::IBuiltin>
    } // endof class IBuiltinInfo
    
    
    // ts : jsb.IBuiltins
    // cpp: cc::IBuiltins
    export class IBuiltins {
        // public_fields list
        globals     : jsb.IBuiltinInfo;     // cc::IBuiltinInfo
        locals      : jsb.IBuiltinInfo;     // cc::IBuiltinInfo
        statistics  : {[key:string]:number};// std::unordered_map<std::string, int>
    } // endof class IBuiltins
    
    
    // ts : jsb.IShaderSource
    // cpp: cc::IShaderSource
    export class IShaderSource {
        // public_fields list
        vert: string;   // std::string
        frag: string;   // std::string
    } // endof class IShaderSource
    
    
    // ts : jsb.IShaderInfo
    // cpp: cc::IShaderInfo
    export class IShaderInfo {
        // public_fields list
        name            : string;                       // std::string
        hash            : number;                       // unsigned int
        glsl4           : jsb.IShaderSource;            // cc::IShaderSource
        glsl3           : jsb.IShaderSource;            // cc::IShaderSource
        glsl1           : jsb.IShaderSource;            // cc::IShaderSource
        builtins        : jsb.IBuiltins;                // cc::IBuiltins
        defines         : jsb.IDefineInfo[];            // std::vector<cc::IDefineInfo>
        attributes      : jsb.IAttributeInfo[];         // std::vector<cc::IAttributeInfo>
        blocks          : jsb.IBlockInfo[];             // std::vector<cc::IBlockInfo>
        samplerTextures : jsb.ISamplerTextureInfo[];    // std::vector<cc::ISamplerTextureInfo>
        samplers        : jsb.ISamplerInfo[];           // std::vector<cc::ISamplerInfo>
        textures        : jsb.ITextureInfo[];           // std::vector<cc::ITextureInfo>
        buffers         : jsb.IBufferInfo[];            // std::vector<cc::IBufferInfo>
        images          : jsb.IImageInfo[];             // std::vector<cc::IImageInfo>
        subpassInputs   : jsb.IInputAttachmentInfo[];   // std::vector<cc::IInputAttachmentInfo>
        // methods list
        getSource(version: string):jsb.IShaderSource; // cc::IShaderSource*
    } // endof class IShaderInfo
    
    
    // ts : jsb.EffectAsset
    // cpp: cc::EffectAsset
    export class EffectAsset extends jsb.Asset {
        // attributes list
        techniques  : jsb.ITechniqueInfo[];                             // std::vector<cc::ITechniqueInfo>
        shaders     : jsb.IShaderInfo[];                                // std::vector<cc::IShaderInfo>
        combinations: {[key:string]:(boolean[]|number[]|string[])}[];   // std::vector<std::unordered_map<std::string, boost::variant2::variant<std::vector<bool>, std::vector<int>, std::vector<std::string>>>>
        // static methods list
        /**
         * en Register the effect asset to the static map
         * 
         * zh 将指定 effect 注册到全局管理器。
         */
        static registerAsset(asset: jsb.EffectAsset):void; // void
        static remove(asset: jsb.EffectAsset):void; // void
        /**
         * en Unregister the effect asset from the static map
         * 
         * zh 将指定 effect 从全局管理器移除。
         */
        static remove(name: string):void; // void
        /**
         * en Get the effect asset by the given name.
         * 
         * zh 获取指定名字的 effect 资源。
         */
        static get(name: string):jsb.EffectAsset; // cc::EffectAsset*
        /**
         * en Get all registered effect assets.
         * 
         * zh 获取所有已注册的 effect 资源。
         */
        static getAll():{[key:string]:jsb.EffectAsset}; // std::unordered_map<std::string, cc::IntrusivePtr<cc::EffectAsset>>
        static isLayoutValid():boolean; // bool
        static setLayoutValid():void; // void
        // methods list
        constructor();
    } // endof class EffectAsset
    
    
    // ts : jsb.IMemoryImageSource
    // cpp: cc::IMemoryImageSource
    export class IMemoryImageSource {
        // public_fields list
        data        : ArrayBuffer;  // cc::IntrusivePtr<cc::ArrayBuffer>
        compressed  : boolean;      // bool
        width       : number;       // unsigned int
        height      : number;       // unsigned int
        format      : number;       // cc::PixelFormat
    } // endof class IMemoryImageSource
    
    
    // ts : jsb.ImageAsset
    // cpp: cc::ImageAsset
    export class ImageAsset extends jsb.Asset {
        // attributes list
        format  : number;   // cc::PixelFormat
        url     : string;   // std::string
        // methods list
        constructor();
        /**
         * en Image data.
         * 
         * zh 此图像资源的图像数据。
         */
        getData():string; // unsigned char*
        /**
         * en The pixel width of the image.
         * 
         * zh 此图像资源的像素宽度。
         */
        getWidth():number; // unsigned int
        /**
         * en The pixel height of the image.
         * 
         * zh 此图像资源的像素高度。
         */
        getHeight():number; // unsigned int
        /**
         * en Whether the image is in compressed texture format.
         * 
         * zh 此图像资源是否为压缩像素格式。
         */
        isCompressed():boolean; // bool
        /**
         * en The original source image URL, it could be empty.
         * 
         * zh 此图像资源的原始图像源的 URL。当原始图像元不是 HTML 文件时可能为空。
         * 
         * deprecated Please use [[nativeUrl]]
         */
        getUrl():string; // std::string
        setWidth(width: number):void; // void
        setHeight(height: number):void; // void
        setData(data: string):void; // void
        setUrl(url: string):void; // void
    } // endof class ImageAsset
    
    
    // ts : jsb.IMaterialInfo
    // cpp: cc::IMaterialInfo
    export class IMaterialInfo {
        // public_fields list
        effectAsset : jsb.EffectAsset;                                                                      // cc::EffectAsset*
        effectName  ?: string;                                                                              // boost::optional<std::string>
        technique   ?: number;                                                                              // boost::optional<unsigned int>
        defines     ?: ({[key:string]:(number|boolean|string)}|{[key:string]:(number|boolean|string)}[]);   // boost::optional<boost::variant2::variant<std::unordered_map<std::string, boost::variant2::variant<int, bool, std::string>>, std::vector<std::unordered_map<std::string, boost::variant2::variant<int, bool, std::string>>>>>
        states      ?: (jsb.IPassStates|jsb.IPassStates[]);                                                 // boost::optional<boost::variant2::variant<cc::IPassStates, std::vector<cc::IPassStates>>>
    } // endof class IMaterialInfo
    
    
    // ts : jsb.Material
    // cpp: cc::Material
    export class Material extends jsb.Asset {
        // attributes list
        effectAsset : jsb.EffectAsset;  // cc::EffectAsset*
        effectName  : string;           // std::string
        technique   : number;           // unsigned int
        hash        : number;           // unsigned int
        parent      : jsb.Material;     // cc::Material*
        // public_fields list
        _effectAsset    : jsb.EffectAsset;                                                                                                                                                                                                                                                          // cc::IntrusivePtr<cc::EffectAsset>
        _techIdx        : number;                                                                                                                                                                                                                                                                   // unsigned int
        _defines        : {[key:string]:(number|boolean|string)}[];                                                                                                                                                                                                                                 // std::vector<std::unordered_map<std::string, boost::variant2::variant<int, bool, std::string>>>
        _states         : jsb.IPassStates[];                                                                                                                                                                                                                                                        // std::vector<cc::IPassStates>
        _propsInternal  : {[key:string]:(undefined|(undefined|number|jsb.Vec2|jsb.Vec3|jsb.Vec4|jsb.Color|jsb.Mat3|jsb.Mat4|jsb.Quaternion|jsb.TextureBase|gfx.Texture)|(undefined|number|jsb.Vec2|jsb.Vec3|jsb.Vec4|jsb.Color|jsb.Mat3|jsb.Mat4|jsb.Quaternion|jsb.TextureBase|gfx.Texture)[])}[]; // std::vector<std::unordered_map<std::string, boost::variant2::variant<boost::variant2::monostate, boost::variant2::variant<boost::variant2::monostate, float, int, cc::Vec2, cc::Vec3, cc::Vec4, cc::Color, cc::Mat3, cc::Mat4, cc::Quaternion, cc::IntrusivePtr<cc::TextureBase>, cc::IntrusivePtr<cc::gfx::Texture>>, std::vector<boost::variant2::variant<boost::variant2::monostate, float, int, cc::Vec2, cc::Vec3, cc::Vec4, cc::Color, cc::Mat3, cc::Mat4, cc::Quaternion, cc::IntrusivePtr<cc::TextureBase>, cc::IntrusivePtr<cc::gfx::Texture>>>>>>
        // static methods list
        /**
         * en Get hash for a material
         * 
         * zh 获取一个材质的哈希值
         * 
         * param material
         */
        static getHashForMaterial(material: jsb.Material):number; // unsigned int
        // methods list
        constructor();
        /**
         * en Initialize this material with the given information.
         * 
         * zh 根据所给信息初始化这个材质，初始化正常结束后材质即可立即用于渲染。
         * 
         * param info Material description info.
         */
        initialize(info: jsb.IMaterialInfo):void; // void
        reset(info: jsb.IMaterialInfo):void; // void
        recompileShaders(overrides: {[key:string]:(number|boolean|string)}, passIdx: number):void; // void
        /**
         * en Recompile the shader with the specified macro overrides. Allowed only on material instances.
         * 
         * zh 使用指定预处理宏重新编译当前 pass（数组）中的 shader。只允许对材质实例执行。
         * 
         * param overrides The shader macro override values.
         * 
         * param passIdx The pass to apply to. Will apply to all passes if not specified.
         */
        recompileShaders(overrides: {[key:string]:(number|boolean|string)}):void; // void
        overridePipelineStates(overrides: jsb.IPassStates, passIdx: number):void; // void
        /**
         * en Override the passes with the specified pipeline states. Allowed only on material instances.
         * 
         * zh 使用指定管线状态重载当前的 pass（数组）。只允许对材质实例执行。
         * 
         * param overrides The pipeline state override values.
         * 
         * param passIdx The pass to apply to. Will apply to all passes if not specified.
         */
        overridePipelineStates(overrides: jsb.IPassStates):void; // void
        /**
         * en Reset all the uniforms to the default value specified in [[EffectAsset]].
         * 
         * zh 重置材质的所有 uniform 参数数据为 [[EffectAsset]] 中的默认初始值。
         * 
         * param clearPasses Will the rendering data be cleared too?
         */
        resetUniforms():void; // void
        resetUniforms(clearPasses: boolean):void; // void
        /**
         * en
         * 
         * Convenient property setter provided for quick material setup.
         * 
         * 
         * [[Pass.setUniform]] should be used instead if you need to do per-frame uniform update.
         * 
         * zh
         * 
         * 设置材质 uniform 参数的统一入口。
         * 
         * 
         * 注意如果需要每帧更新 uniform，建议使用 [[Pass.setUniform]] 以获得更好的性能。
         * 
         * param name The target uniform name.
         * 
         * param val The target value.
         * 
         * param passIdx The pass to apply to. Will apply to all passes if not specified.
         */
        setProperty(name: string, val: (undefined|(undefined|number|jsb.Vec2|jsb.Vec3|jsb.Vec4|jsb.Color|jsb.Mat3|jsb.Mat4|jsb.Quaternion|jsb.TextureBase|gfx.Texture)|(undefined|number|jsb.Vec2|jsb.Vec3|jsb.Vec4|jsb.Color|jsb.Mat3|jsb.Mat4|jsb.Quaternion|jsb.TextureBase|gfx.Texture)[])):void; // void
        setProperty(name: string, val: (undefined|(undefined|number|jsb.Vec2|jsb.Vec3|jsb.Vec4|jsb.Color|jsb.Mat3|jsb.Mat4|jsb.Quaternion|jsb.TextureBase|gfx.Texture)|(undefined|number|jsb.Vec2|jsb.Vec3|jsb.Vec4|jsb.Color|jsb.Mat3|jsb.Mat4|jsb.Quaternion|jsb.TextureBase|gfx.Texture)[]), passIdx: number):void; // void
        setPropertyNull(name: string):void; // void
        setPropertyNull(name: string, passIdx: number):void; // void
        setPropertyFloat32(name: string, val: number):void; // void
        setPropertyFloat32(name: string, val: number, passIdx: number):void; // void
        setPropertyInt32(name: string, val: number):void; // void
        setPropertyInt32(name: string, val: number, passIdx: number):void; // void
        setPropertyVec2(name: string, val: jsb.Vec2):void; // void
        setPropertyVec2(name: string, val: jsb.Vec2, passIdx: number):void; // void
        setPropertyVec3(name: string, val: jsb.Vec3):void; // void
        setPropertyVec3(name: string, val: jsb.Vec3, passIdx: number):void; // void
        setPropertyVec4(name: string, val: jsb.Vec4):void; // void
        setPropertyVec4(name: string, val: jsb.Vec4, passIdx: number):void; // void
        setPropertyColor(name: string, val: jsb.Color):void; // void
        setPropertyColor(name: string, val: jsb.Color, passIdx: number):void; // void
        setPropertyMat3(name: string, val: jsb.Mat3):void; // void
        setPropertyMat3(name: string, val: jsb.Mat3, passIdx: number):void; // void
        setPropertyMat4(name: string, val: jsb.Mat4):void; // void
        setPropertyMat4(name: string, val: jsb.Mat4, passIdx: number):void; // void
        setPropertyQuaternion(name: string, val: jsb.Quaternion):void; // void
        setPropertyQuaternion(name: string, val: jsb.Quaternion, passIdx: number):void; // void
        setPropertyTextureBase(name: string, val: jsb.TextureBase):void; // void
        setPropertyTextureBase(name: string, val: jsb.TextureBase, passIdx: number):void; // void
        setPropertyGFXTexture(name: string, val: gfx.Texture):void; // void
        setPropertyGFXTexture(name: string, val: gfx.Texture, passIdx: number):void; // void
        setPropertyFloat32Array(name: string, val: number[]):void; // void
        setPropertyFloat32Array(name: string, val: number[], passIdx: number):void; // void
        setPropertyInt32Array(name: string, val: number[]):void; // void
        setPropertyInt32Array(name: string, val: number[], passIdx: number):void; // void
        setPropertyVec2Array(name: string, val: jsb.Vec2[]):void; // void
        setPropertyVec2Array(name: string, val: jsb.Vec2[], passIdx: number):void; // void
        setPropertyVec3Array(name: string, val: jsb.Vec3[]):void; // void
        setPropertyVec3Array(name: string, val: jsb.Vec3[], passIdx: number):void; // void
        setPropertyVec4Array(name: string, val: jsb.Vec4[]):void; // void
        setPropertyVec4Array(name: string, val: jsb.Vec4[], passIdx: number):void; // void
        setPropertyColorArray(name: string, val: jsb.Color[]):void; // void
        setPropertyColorArray(name: string, val: jsb.Color[], passIdx: number):void; // void
        setPropertyMat3Array(name: string, val: jsb.Mat3[]):void; // void
        setPropertyMat3Array(name: string, val: jsb.Mat3[], passIdx: number):void; // void
        setPropertyMat4Array(name: string, val: jsb.Mat4[]):void; // void
        setPropertyMat4Array(name: string, val: jsb.Mat4[], passIdx: number):void; // void
        setPropertyQuaternionArray(name: string, val: jsb.Quaternion[]):void; // void
        setPropertyQuaternionArray(name: string, val: jsb.Quaternion[], passIdx: number):void; // void
        setPropertyTextureBaseArray(name: string, val: jsb.TextureBase[]):void; // void
        setPropertyTextureBaseArray(name: string, val: jsb.TextureBase[], passIdx: number):void; // void
        setPropertyGFXTextureArray(name: string, val: gfx.Texture[]):void; // void
        setPropertyGFXTextureArray(name: string, val: gfx.Texture[], passIdx: number):void; // void
        /**
         * en
         * 
         * Get the specified uniform value for this material.
         * 
         * 
         * Note that only uniforms set through [[Material.setProperty]] can be acquired here.
         * 
         * 
         * For the complete rendering data, use [[Pass.getUniform]] instead.
         * 
         * zh
         * 
         * 获取当前材质的指定 uniform 参数的值。
         * 
         * 
         * 注意只有通过 [[Material.setProperty]] 函数设置的参数才能从此函数取出，
         * 
         * 
         * 如需取出完整的渲染数据，请使用 [[Pass.getUniform]]。
         * 
         * param name The property or uniform name.
         * 
         * param passIdx The target pass index. If not specified, return the first found value in all passes.
         */
        getProperty(name: string):(undefined|(undefined|number|jsb.Vec2|jsb.Vec3|jsb.Vec4|jsb.Color|jsb.Mat3|jsb.Mat4|jsb.Quaternion|jsb.TextureBase|gfx.Texture)|(undefined|number|jsb.Vec2|jsb.Vec3|jsb.Vec4|jsb.Color|jsb.Mat3|jsb.Mat4|jsb.Quaternion|jsb.TextureBase|gfx.Texture)[]); // boost::variant2::variant<boost::variant2::monostate, boost::variant2::variant<boost::variant2::monostate, float, int, cc::Vec2, cc::Vec3, cc::Vec4, cc::Color, cc::Mat3, cc::Mat4, cc::Quaternion, cc::IntrusivePtr<cc::TextureBase>, cc::IntrusivePtr<cc::gfx::Texture>>, std::vector<boost::variant2::variant<boost::variant2::monostate, float, int, cc::Vec2, cc::Vec3, cc::Vec4, cc::Color, cc::Mat3, cc::Mat4, cc::Quaternion, cc::IntrusivePtr<cc::TextureBase>, cc::IntrusivePtr<cc::gfx::Texture>>>>*
        getProperty(name: string, passIdx: number):(undefined|(undefined|number|jsb.Vec2|jsb.Vec3|jsb.Vec4|jsb.Color|jsb.Mat3|jsb.Mat4|jsb.Quaternion|jsb.TextureBase|gfx.Texture)|(undefined|number|jsb.Vec2|jsb.Vec3|jsb.Vec4|jsb.Color|jsb.Mat3|jsb.Mat4|jsb.Quaternion|jsb.TextureBase|gfx.Texture)[]); // boost::variant2::variant<boost::variant2::monostate, boost::variant2::variant<boost::variant2::monostate, float, int, cc::Vec2, cc::Vec3, cc::Vec4, cc::Color, cc::Mat3, cc::Mat4, cc::Quaternion, cc::IntrusivePtr<cc::TextureBase>, cc::IntrusivePtr<cc::gfx::Texture>>, std::vector<boost::variant2::variant<boost::variant2::monostate, float, int, cc::Vec2, cc::Vec3, cc::Vec4, cc::Color, cc::Mat3, cc::Mat4, cc::Quaternion, cc::IntrusivePtr<cc::TextureBase>, cc::IntrusivePtr<cc::gfx::Texture>>>>*
        /**
         * en Copy the target material, with optional overrides.
         * 
         * zh 复制目标材质到当前实例，允许提供重载信息。。
         * 
         * param mat The material to be copied.
         * 
         * param overrides The overriding states on top of the original material.
         */
        copy(mat: jsb.Material):void; // void
        copy(mat: jsb.Material, overrides: jsb.IMaterialInfo):void; // void
        fillInfo(info: jsb.IMaterialInfo):void; // void
        /**
         * en The passes defined in this material.
         * 
         * zh 当前正在使用的 pass 数组。
         */
        getPasses():jsb.Pass[]; // std::shared_ptr<std::vector<cc::IntrusivePtr<cc::scene::Pass>>>
    } // endof class Material
    
    
    // ts : jsb.TextureBase
    // cpp: cc::TextureBase
    export class TextureBase extends jsb.Asset {
        // attributes list
        isCompressed: boolean;  // bool
        _width      : number;   // unsigned int
        width       : number;   // unsigned int
        _height     : number;   // unsigned int
        height      : number;   // unsigned int
        // public_fields list
        _format     : number;   // cc::PixelFormat
        _minFilter  : number;   // cc::Filter
        _magFilter  : number;   // cc::Filter
        _mipFilter  : number;   // cc::Filter
        _wrapS      : number;   // cc::WrapMode
        _wrapT      : number;   // cc::WrapMode
        _wrapR      : number;   // cc::WrapMode
        _anisotropy : number;   // unsigned int
        _width      : number;   // unsigned int
        _height     : number;   // unsigned int
        // methods list
        constructor();
        /**
         * en Gets the id of the texture
         * 
         * zh 获取标识符。
         * 
         * returns The id
         */
        getId():string; // std::string
        /**
         * en Gets the pixel format
         * 
         * zh 获取像素格式。
         * 
         * returns The pixel format
         */
        getPixelFormat():number; // cc::PixelFormat
        /**
         * en Gets the anisotropy
         * 
         * zh 获取各向异性。
         * 
         * returns The anisotropy
         */
        getAnisotropy():number; // unsigned int
        setWrapMode(wrapS: number, wrapT: number):void; // void
        /**
         * en Sets the wrap mode of the texture.
         * 
         * Be noted, if the size of the texture is not power of two, only [[WrapMode.CLAMP_TO_EDGE]] is allowed.
         * 
         * zh 设置此贴图的缠绕模式。
         * 
         * 注意，若贴图尺寸不是 2 的整数幂，缠绕模式仅允许 [[WrapMode.CLAMP_TO_EDGE]]。
         * 
         * param wrapS S(U) coordinate wrap mode
         * 
         * param wrapT T(V) coordinate wrap mode
         * 
         * param wrapR R(W) coordinate wrap mode
         */
        setWrapMode(wrapS: number, wrapT: number, wrapR: number):void; // void
        /**
         * en Sets the texture's filter mode
         * 
         * zh 设置此贴图的过滤算法。
         * 
         * param minFilter Filter mode for scale down
         * 
         * param magFilter Filter mode for scale up
         */
        setFilters(minFilter: number, magFilter: number):void; // void
        /**
         * en Sets the texture's mip filter
         * 
         * zh 设置此贴图的缩小过滤算法。
         * 
         * param mipFilter Filter mode for scale down
         */
        setMipFilter(mipFilter: number):void; // void
        /**
         * en Sets the texture's anisotropy
         * 
         * zh 设置此贴图的各向异性。
         * 
         * param anisotropy
         */
        setAnisotropy(anisotropy: number):void; // void
        /**
         * en Gets the texture hash.
         * 
         * zh 获取此贴图的哈希值。
         */
        getHash():number; // unsigned int
        /**
         * en Gets the GFX Texture resource
         * 
         * zh 获取此贴图底层的 GFX 贴图对象。
         */
        getGFXTexture():gfx.Texture; // cc::gfx::Texture*
        /**
         * en Gets the internal GFX sampler information.
         * 
         * zh 获取此贴图内部使用的 GFX 采样器信息。
         * 
         * private
         */
        getSamplerInfo():gfx.SamplerInfo; // cc::gfx::SamplerInfo
        /**
         * en Gets the sampler resource for the texture
         * 
         * zh 获取此贴图底层的 GFX 采样信息。
         */
        getGFXSampler():gfx.Sampler; // cc::gfx::Sampler*
    } // endof class TextureBase
    
    
    // ts : jsb.IRenderTextureCreateInfo
    // cpp: cc::IRenderTextureCreateInfo
    export class IRenderTextureCreateInfo {
        // public_fields list
        name    ?: string;              // boost::optional<std::string>
        width   : number;               // unsigned int
        height  : number;               // unsigned int
        passInfo?: gfx.RenderPassInfo;  // boost::optional<cc::gfx::RenderPassInfo>
    } // endof class IRenderTextureCreateInfo
    
    
    // ts : jsb.RenderTexture
    // cpp: cc::RenderTexture
    export class RenderTexture extends jsb.TextureBase {
        // attributes list
        window  : jsb.RenderWindow; // cc::scene::RenderWindow*
        // methods list
        constructor();
        initialize(info: jsb.IRenderTextureCreateInfo):void; // void
        reset(info: jsb.IRenderTextureCreateInfo):void; // void
        /**
         * en Resize the render texture
         * 
         * zh 修改渲染贴图的尺寸
         * 
         * param width The pixel width, the range is from 1 to 2048
         * 
         * param height The pixel height, the range is from 1 to 2048
         */
        resize(width: number, height: number):void; // void
        initWindow(info: jsb.IRenderTextureCreateInfo):void; // void
        initWindow():void; // void
        /**
         * en Read pixel buffer from render texture
         * 
         * param x The location on x axis
         * 
         * param y The location on y axis
         * 
         * param width The pixel width
         * 
         * param height The pixel height
         * 
         * zh 从 render texture 读取像素数据
         * 
         * param x 起始位置X轴坐标
         * 
         * param y 起始位置Y轴坐标
         * 
         * param width 像素宽度
         * 
         * param height 像素高度
         */
        readPixels(x: number, y: number, width: number, height: number):number[]; // std::vector<unsigned char>
    } // endof class RenderTexture
    
    
    // ts : jsb.IGeometricInfo
    // cpp: cc::IGeometricInfo
    export class IGeometricInfo {
        // public_fields list
        positions   : Float32Array;                         // cc::TypedArrayTemp<float>
        indices     ?: (Uint8Array|Uint16Array|Uint32Array);// boost::optional<boost::variant2::variant<cc::TypedArrayTemp<unsigned char>, cc::TypedArrayTemp<unsigned short>, cc::TypedArrayTemp<unsigned int>>>
        doubleSided ?: boolean;                             // boost::optional<bool>
        boundingBox : jsb.BoundingBox;                      // cc::BoundingBox
    } // endof class IGeometricInfo
    
    
    // ts : jsb.IFlatBuffer
    // cpp: cc::IFlatBuffer
    export class IFlatBuffer {
        // public_fields list
        stride  : number;       // unsigned int
        count   : number;       // unsigned int
        buffer  : Uint8Array;   // cc::TypedArrayTemp<unsigned char>
    } // endof class IFlatBuffer
    
    
    // ts : jsb.RenderingSubMesh
    // cpp: cc::RenderingSubMesh
    export class RenderingSubMesh {
        // attributes list
        mesh                : jsb.Mesh;                 // cc::Mesh*
        subMeshIdx          ?: number;                  // boost::optional<unsigned int>
        flatBuffers         : jsb.IFlatBuffer[];        // std::vector<cc::IFlatBuffer>
        _flatBuffers        : jsb.IFlatBuffer[];        // std::vector<cc::IFlatBuffer>
        jointMappedBuffers  : gfx.Buffer[];             // std::vector<cc::gfx::Buffer *>
        iaInfo              : gfx.InputAssemblerInfo;   // cc::gfx::InputAssemblerInfo
        _iaInfo             : gfx.InputAssemblerInfo;   // cc::gfx::InputAssemblerInfo
        primitiveMode       : number;                   // cc::gfx::PrimitiveMode
        // methods list
        constructor(vertexBuffers: gfx.Buffer[], attributes: gfx.Attribute[], primitiveMode: number, indexBuffer: gfx.Buffer);
        constructor(vertexBuffers: gfx.Buffer[], attributes: gfx.Attribute[], primitiveMode: number);
        constructor(vertexBuffers: gfx.Buffer[], attributes: gfx.Attribute[], primitiveMode: number, indexBuffer: gfx.Buffer, indirectBuffer: gfx.Buffer);
        constructor(vertexBuffers: gfx.Buffer[], attributes: gfx.Attribute[], primitiveMode: number, indexBuffer: gfx.Buffer, indirectBuffer: gfx.Buffer, isOwnerOfIndexBuffer: boolean);
        /**
         * en All vertex attributes used by the sub mesh
         * 
         * zh 所有顶点属性。
         */
        getAttributes():gfx.Attribute[]; // std::vector<cc::gfx::Attribute>
        /**
         * en All vertex buffers used by the sub mesh
         * 
         * zh 使用的所有顶点缓冲区。
         */
        getVertexBuffers():gfx.Buffer[]; // std::vector<cc::gfx::Buffer *>
        /**
         * en Index buffer used by the sub mesh
         * 
         * zh 使用的索引缓冲区，若未使用则无需指定。
         */
        getIndexBuffer():gfx.Buffer; // cc::gfx::Buffer*
        /**
         * en Indirect buffer used by the sub mesh
         * 
         * zh 间接绘制缓冲区。
         */
        indirectBuffer():gfx.Buffer; // cc::gfx::Buffer*
        /**
         * en The geometric info of the sub mesh, used for raycast.
         * 
         * zh （用于射线检测的）几何信息。
         */
        getGeometricInfo():jsb.IGeometricInfo; // cc::IGeometricInfo
        /**
         * en Invalidate the geometric info of the sub mesh after geometry changed.
         * 
         * zh 网格更新后，设置（用于射线检测的）几何信息为无效，需要重新计算。
         */
        invalidateGeometricInfo():void; // void
        genFlatBuffers():void; // void
        setDrawInfo(info: gfx.DrawInfo):void; // void
        getDrawInfo():undefined|gfx.DrawInfo; // boost::optional<cc::gfx::DrawInfo>
        destroy():boolean; // bool
        /**
         * en Adds a vertex attribute input called 'a_vertexId' into this sub-mesh.
         * 
         * This is useful if you want to simulate `gl_VertexId` in WebGL context prior to 2.0.
         * 
         * Once you call this function, the vertex attribute is permanently added.
         * 
         * Subsequent calls to this function take no effect.
         * 
         * param device Device used to create related rendering resources.
         */
        enableVertexIdChannel(device: gfx.Device):void; // void
    } // endof class RenderingSubMesh
    
    
    // ts : jsb.SceneAsset
    // cpp: cc::SceneAsset
    export class SceneAsset extends jsb.Asset {
        // methods list
        constructor();
        getScene():jsb.Scene; // cc::Scene*
        setScene(scene: jsb.Scene):void; // void
    } // endof class SceneAsset
    
    
    // ts : jsb.TextAsset
    // cpp: cc::TextAsset
    export class TextAsset extends jsb.Asset {
        // public_fields list
        text: string;   // std::string
        // methods list
        constructor();
    } // endof class TextAsset
    
    
    // ts : jsb.SimpleTexture
    // cpp: cc::SimpleTexture
    export class SimpleTexture extends jsb.TextureBase {
        // attributes list
        mipmapLevel : number;   // unsigned int
        // methods list
        /**
         * en Update the level 0 mipmap image.
         * 
         * zh 更新 0 级 Mipmap。
         */
        updateImage():void; // void
        /**
         * en Update the given level mipmap image.
         * 
         * zh 更新指定层级范围内的 Mipmap。当 Mipmap 数据发生了改变时应调用此方法提交更改。
         * 
         * 若指定的层级范围超出了实际已有的层级范围，只有覆盖的那些层级范围会被更新。
         * 
         * param firstLevel First level to be updated
         * 
         * param count Mipmap level count to be updated
         */
        updateMipmaps(firstLevel: number, count: number):void; // void
        /**
         * en Upload data to the given mipmap level.
         * 
         * The size of the image will affect how the mipmap is updated.
         * 
         * - When the image is an ArrayBuffer, the size of the image must match the mipmap size.
         * 
         * - If the image size matches the mipmap size, the mipmap data will be updated entirely.
         * 
         * - If the image size is smaller than the mipmap size, the mipmap will be updated from top left corner.
         * 
         * - If the image size is larger, an error will be raised
         * 
         * zh 上传图像数据到指定层级的 Mipmap 中。
         * 
         * 图像的尺寸影响 Mipmap 的更新范围：
         * 
         * - 当图像是 `ArrayBuffer` 时，图像的尺寸必须和 Mipmap 的尺寸一致；否则，
         * 
         * - 若图像的尺寸与 Mipmap 的尺寸相同，上传后整个 Mipmap 的数据将与图像数据一致；
         * 
         * - 若图像的尺寸小于指定层级 Mipmap 的尺寸（不管是长或宽），则从贴图左上角开始，图像尺寸范围内的 Mipmap 会被更新；
         * 
         * - 若图像的尺寸超出了指定层级 Mipmap 的尺寸（不管是长或宽），都将引起错误。
         * 
         * param source The source image or image data
         * 
         * param level Mipmap level to upload the image to
         * 
         * param arrayIndex The array index
         */
        uploadDataWithArrayBuffer(source: ArrayBuffer):void; // void
        uploadDataWithArrayBuffer(source: ArrayBuffer, level: number):void; // void
        uploadDataWithArrayBuffer(source: ArrayBuffer, level: number, arrayIndex: number):void; // void
        uploadData(source: string):void; // void
        uploadData(source: string, level: number):void; // void
        uploadData(source: string, level: number, arrayIndex: number):void; // void
        assignImage(image: jsb.ImageAsset, level: number):void; // void
        assignImage(image: jsb.ImageAsset, level: number, arrayIndex: number):void; // void
        checkTextureLoaded():void; // void
        /**
         * Set mipmap level range for this texture.
         * 
         * param baseLevel The base mipmap level.
         * 
         * param maxLevel The maximum mipmap level.
         */
        setMipRange(baseLevel: number, maxLevel: number):void; // void
        /**
         * en Whether mipmaps are baked convolutional maps.
         * 
         * zh mipmaps是否为烘焙出来的卷积图。
         */
        isUsingOfflineMipmaps():boolean; // bool
    } // endof class SimpleTexture
    
    
    // ts : jsb.ITexture2DSerializeData
    // cpp: cc::ITexture2DSerializeData
    export class ITexture2DSerializeData {
        // public_fields list
        base    : string;   // std::string
        mipmaps : string[]; // std::vector<std::string>
    } // endof class ITexture2DSerializeData
    
    
    // ts : jsb.ITexture2DCreateInfo
    // cpp: cc::ITexture2DCreateInfo
    export class ITexture2DCreateInfo {
        // public_fields list
        width       : number;   // unsigned int
        height      : number;   // unsigned int
        format      ?: number;  // boost::optional<cc::PixelFormat>
        mipmapLevel ?: number;  // boost::optional<unsigned int>
        baseLevel   ?: number;  // boost::optional<unsigned int>
        maxLevel    ?: number;  // boost::optional<unsigned int>
    } // endof class ITexture2DCreateInfo
    
    
    // ts : jsb.Texture2D
    // cpp: cc::Texture2D
    export class Texture2D extends jsb.SimpleTexture {
        // methods list
        constructor();
        /**
         * en All levels of mipmap images, be noted, automatically generated mipmaps are not included.
         * 
         * When setup mipmap, the size of the texture and pixel format could be modified.
         * 
         * zh 所有层级 Mipmap，注意，这里不包含自动生成的 Mipmap。
         * 
         * 当设置 Mipmap 时，贴图的尺寸以及像素格式可能会改变。
         */
        getMipmaps():jsb.ImageAsset[]; // std::vector<cc::IntrusivePtr<cc::ImageAsset>>
        getMipmapsUuids():string[]; // std::vector<std::string>
        syncMipmapsForJS(value: jsb.ImageAsset[]):void; // void
        setMipmaps(value: jsb.ImageAsset[]):void; // void
        /**
         * en Level 0 mipmap image.
         * 
         * Be noted, `this.image = img` equals `this.mipmaps = [img]`,
         * 
         * sets image will clear all previous mipmaps.
         * 
         * zh 0 级 Mipmap。
         * 
         * 注意，`this.image = img` 等价于 `this.mipmaps = [img]`，
         * 
         * 也就是说，通过 `this.image` 设置 0 级 Mipmap 时将隐式地清除之前的所有 Mipmap。
         */
        getImage():jsb.ImageAsset; // cc::ImageAsset*
        setImage(value: jsb.ImageAsset):void; // void
        initialize():void; // void
        /**
         * en Reset the current texture with given size, pixel format and mipmap images.
         * 
         * After reset, the gfx resource will become invalid, you must use [[uploadData]] explicitly to upload the new mipmaps to GPU resources.
         * 
         * zh 将当前贴图重置为指定尺寸、像素格式以及指定 mipmap 层级。重置后，贴图的像素数据将变为未定义。
         * 
         * mipmap 图像的数据不会自动更新到贴图中，你必须显式调用 [[uploadData]] 来上传贴图数据。
         * 
         * param info The create information
         */
        reset(info: jsb.ITexture2DCreateInfo):void; // void
        /**
         * en Reset the current texture with given size, pixel format and mipmap images.
         * 
         * After reset, the gfx resource will become invalid, you must use [[uploadData]] explicitly to upload the new mipmaps to GPU resources.
         * 
         * zh 将当前贴图重置为指定尺寸、像素格式以及指定 mipmap 层级。重置后，贴图的像素数据将变为未定义。
         * 
         * mipmap 图像的数据不会自动更新到贴图中，你必须显式调用 [[uploadData]] 来上传贴图数据。
         * 
         * param width Pixel width
         * 
         * param height Pixel height
         * 
         * param format Pixel format
         * 
         * param mipmapLevel Mipmap level count
         * 
         * param baseLevel Mipmap base level
         * 
         * param maxLevel Mipmap maximum level
         * 
         * deprecated since v1.0 please use [[reset]] instead
         */
        create(width: number, height: number):void; // void
        create(width: number, height: number, format: number):void; // void
        create(width: number, height: number, format: number, mipmapLevel: number):void; // void
        create(width: number, height: number, format: number, mipmapLevel: number, baseLevel: number):void; // void
        create(width: number, height: number, format: number, mipmapLevel: number, baseLevel: number, maxLevel: number):void; // void
        /**
         * en Gets the description of the 2d texture
         * 
         * zh 返回此贴图的描述。
         * 
         * returns The description
         */
        description():string; // std::string
        /**
         * en Release used GPU resources.
         * 
         * zh 释放占用的 GPU 资源。
         * 
         * deprecated please use [[destroy]] instead
         */
        releaseTexture():void; // void
        getGfxTextureCreateInfo(usage: number, format: number, levelCount: number, flags: number):gfx.TextureInfo; // cc::gfx::TextureInfo
        getGfxTextureViewCreateInfo(texture: gfx.Texture, format: number, baseLevel: number, levelCount: number):gfx.TextureViewInfo; // cc::gfx::TextureViewInfo
    } // endof class Texture2D
    
    
    // ts : jsb.ITextureCubeMipmap
    // cpp: cc::ITextureCubeMipmap
    export class ITextureCubeMipmap {
        // public_fields list
        front   : jsb.ImageAsset;   // cc::IntrusivePtr<cc::ImageAsset>
        back    : jsb.ImageAsset;   // cc::IntrusivePtr<cc::ImageAsset>
        left    : jsb.ImageAsset;   // cc::IntrusivePtr<cc::ImageAsset>
        right   : jsb.ImageAsset;   // cc::IntrusivePtr<cc::ImageAsset>
        top     : jsb.ImageAsset;   // cc::IntrusivePtr<cc::ImageAsset>
        bottom  : jsb.ImageAsset;   // cc::IntrusivePtr<cc::ImageAsset>
    } // endof class ITextureCubeMipmap
    
    
    // ts : jsb.ITextureCubeSerializeMipmapData
    // cpp: cc::ITextureCubeSerializeMipmapData
    export class ITextureCubeSerializeMipmapData {
        // public_fields list
        front   : string;   // std::string
        back    : string;   // std::string
        left    : string;   // std::string
        right   : string;   // std::string
        top     : string;   // std::string
        bottom  : string;   // std::string
    } // endof class ITextureCubeSerializeMipmapData
    
    
    // ts : jsb.MipmapAtlasLayoutInfo
    // cpp: cc::MipmapAtlasLayoutInfo
    export class MipmapAtlasLayoutInfo {
        // public_fields list
        left    : number;   // unsigned int
        top     : number;   // unsigned int
        width   : number;   // unsigned int
        height  : number;   // unsigned int
        level   : number;   // unsigned int
    } // endof class MipmapAtlasLayoutInfo
    
    
    // ts : jsb.TextureCubeMipmapAtlasInfo
    // cpp: cc::TextureCubeMipmapAtlasInfo
    export class TextureCubeMipmapAtlasInfo {
        // public_fields list
        atlas   : jsb.ITextureCubeMipmap;       // cc::ITextureCubeMipmap
        layout  : jsb.MipmapAtlasLayoutInfo[];  // std::vector<cc::MipmapAtlasLayoutInfo>
    } // endof class TextureCubeMipmapAtlasInfo
    
    
    // ts : jsb.TextureCubeSerializeData
    // cpp: cc::TextureCubeSerializeData
    export class TextureCubeSerializeData {
        // public_fields list
        base        : string;                               // std::string
        rgbe        : boolean;                              // bool
        mipmapMode  : number;                               // cc::MipmapMode
        mipmaps     : jsb.ITextureCubeSerializeMipmapData[];// std::vector<cc::ITextureCubeSerializeMipmapData>
        mipmapAtlas : jsb.TextureCubeMipmapAtlasInfo;       // cc::TextureCubeMipmapAtlasInfo
    } // endof class TextureCubeSerializeData
    
    
    // ts : jsb.TextureCube
    // cpp: cc::TextureCube
    export class TextureCube extends jsb.SimpleTexture {
        // public_fields list
        _mipmapMode : number;   // cc::MipmapMode
        isRGBE      : boolean;  // bool
        // static methods list
        /**
         * en Create a texture cube with an array of [[Texture2D]] which represents 6 faces of the texture cube.
         * 
         * zh 通过二维贴图数组指定每个 Mipmap 的每个面创建立方体贴图。
         * 
         * param textures Texture array, the texture count must be multiple of 6. Every 6 textures are 6 faces of a mipmap level.
         * 
         * The order should obey [[FaceIndex]] order.
         * 
         * param out Output texture cube, if not given, will create a new texture cube.
         * 
         * returns The created texture cube.
         * 
         * example
         * 
         * ```ts
         * 
         * const textures = new Array<Texture2D>(6);
         * 
         * textures[TextureCube.FaceIndex.front] = frontImage;
         * 
         * textures[TextureCube.FaceIndex.back] = backImage;
         * 
         * textures[TextureCube.FaceIndex.left] = leftImage;
         * 
         * textures[TextureCube.FaceIndex.right] = rightImage;
         * 
         * textures[TextureCube.FaceIndex.top] = topImage;
         * 
         * textures[TextureCube.FaceIndex.bottom] = bottomImage;
         * 
         * const textureCube = TextureCube.fromTexture2DArray(textures);
         * 
         * ```
         */
        static fromTexture2DArray(textures: jsb.Texture2D[]):jsb.TextureCube; // cc::TextureCube*
        // methods list
        constructor();
        /**
         * en All levels of mipmap images, be noted, automatically generated mipmaps are not included.
         * 
         * When setup mipmap, the size of the texture and pixel format could be modified.
         * 
         * zh 所有层级 Mipmap，注意，这里不包含自动生成的 Mipmap。
         * 
         * 当设置 Mipmap 时，贴图的尺寸以及像素格式可能会改变。
         */
        getMipmaps():jsb.ITextureCubeMipmap[]; // std::vector<cc::ITextureCubeMipmap>
        getMipmapAtlas():jsb.TextureCubeMipmapAtlasInfo; // cc::TextureCubeMipmapAtlasInfo
        setMipmaps(value: jsb.ITextureCubeMipmap[]):void; // void
        setMipmapsForJS(value: jsb.ITextureCubeMipmap[]):void; // void
        setMipmapAtlasForJS(value: jsb.TextureCubeMipmapAtlasInfo):void; // void
        /**
         * en Fill mipmaps with convolutional maps.
         * 
         * zh 使用卷积图填充mipmaps。
         * 
         * param value All mipmaps of each face of the cube map are stored in the form of atlas.
         * 
         * and the value contains the atlas of the 6 faces and the layout information of each mipmap layer.
         */
        setMipmapAtlas(value: jsb.TextureCubeMipmapAtlasInfo):void; // void
        /**
         * en Level 0 mipmap image.
         * 
         * Be noted, `this.image = img` equals `this.mipmaps = [img]`,
         * 
         * sets image will clear all previous mipmaps.
         * 
         * zh 0 级 Mipmap。
         * 
         * 注意，`this.image = img` 等价于 `this.mipmaps = [img]`，
         * 
         * 也就是说，通过 `this.image` 设置 0 级 Mipmap 时将隐式地清除之前的所有 Mipmap。
         */
        getImage():jsb.ITextureCubeMipmap; // cc::ITextureCubeMipmap*
        setImage(value: jsb.ITextureCubeMipmap):void; // void
        /**
         * en Reset the current texture with given size, pixel format and mipmap images.
         * 
         * After reset, the gfx resource will become invalid, you must use [[uploadData]] explicitly to upload the new mipmaps to GPU resources.
         * 
         * zh 将当前贴图重置为指定尺寸、像素格式以及指定 mipmap 层级。重置后，贴图的像素数据将变为未定义。
         * 
         * mipmap 图像的数据不会自动更新到贴图中，你必须显式调用 [[uploadData]] 来上传贴图数据。
         * 
         * param info The create information
         */
        reset(info: jsb.ITexture2DCreateInfo):void; // void
        /**
         * en Release used GPU resources.
         * 
         * zh 释放占用的 GPU 资源。
         * 
         * deprecated please use [[destroy]] instead
         */
        releaseTexture():void; // void
        initialize():void; // void
        getGfxTextureCreateInfo(usage: number, format: number, levelCount: number, flags: number):gfx.TextureInfo; // cc::gfx::TextureInfo
        getGfxTextureViewCreateInfo(texture: gfx.Texture, format: number, baseLevel: number, levelCount: number):gfx.TextureViewInfo; // cc::gfx::TextureViewInfo
    } // endof class TextureCube
    
    
    // ts : jsb.BuiltinResMgr
    // cpp: cc::BuiltinResMgr
    export class BuiltinResMgr {
        // static methods list
        static getInstance():jsb.BuiltinResMgr; // cc::BuiltinResMgr*
        // methods list
        constructor();
        initBuiltinRes():boolean; // bool
        isInitialized():boolean; // bool
        addAsset(uuid: string, asset: jsb.Asset):void; // void
        getAsset(uuid: string):jsb.Asset; // cc::Asset*
    } // endof class BuiltinResMgr
    
    
    // ts : jsb.IMeshBufferView
    // cpp: cc::IMeshBufferView
    export class IMeshBufferView {
        // public_fields list
        offset  : number;   // unsigned int
        length  : number;   // unsigned int
        count   : number;   // unsigned int
        stride  : number;   // unsigned int
    } // endof class IMeshBufferView
    
    
    // ts : jsb.MorphTarget
    // cpp: cc::MorphTarget
    export class MorphTarget {
        // public_fields list
        displacements   : jsb.IMeshBufferView[];// std::vector<cc::IMeshBufferView>
    } // endof class MorphTarget
    
    
    // ts : jsb.SubMeshMorph
    // cpp: cc::SubMeshMorph
    export class SubMeshMorph {
        // public_fields list
        attributes  : string[];         // std::vector<std::string>
        targets     : jsb.MorphTarget[];// std::vector<cc::MorphTarget>
        weights     ?: number[];        // boost::optional<std::vector<float>>
    } // endof class SubMeshMorph
    
    
    // ts : jsb.Morph
    // cpp: cc::Morph
    export class Morph {
        // public_fields list
        subMeshMorphs   : jsb.SubMeshMorph[];   // std::vector<boost::optional<cc::SubMeshMorph>>
        weights         ?: number[];            // boost::optional<std::vector<float>>
        targetNames     ?: string[];            // boost::optional<std::vector<std::string>>
    } // endof class Morph
    
    
    // ts : jsb.MorphRenderingInstance
    // cpp: cc::MorphRenderingInstance
    export class MorphRenderingInstance {
        // methods list
        /**
         * Sets weights of targets of specified sub mesh.
         * 
         * param subMeshIndex
         * 
         * param weights
         */
        setWeights(subMeshIndex: number, weights: number[]):void; // void
        /**
         * Adapts pipeline state to do the rendering.
         * 
         * param subMeshIndex
         * 
         * param pipelineState
         */
        adaptPipelineState(subMeshIndex: number, descriptorSet: gfx.DescriptorSet):void; // void
        requiredPatches(subMeshIndex: number):jsb.IMacroPatch[]; // std::vector<cc::scene::IMacroPatch>
        /**
         * Destroy the rendering instance.
         */
        destroy():void; // void
    } // endof class MorphRenderingInstance
    
    
    // ts : jsb.MorphRendering
    // cpp: cc::MorphRendering
    export class MorphRendering {
        // methods list
        createInstance():jsb.MorphRenderingInstance; // cc::MorphRenderingInstance*
    } // endof class MorphRendering
    
    
    // ts : jsb.StdMorphRendering
    // cpp: cc::StdMorphRendering
    export class StdMorphRendering extends jsb.MorphRendering {
        // methods list
        constructor(mesh: jsb.Mesh, gfxDevice: gfx.Device);
    } // endof class StdMorphRendering
    
    
    // ts : jsb.CustomAttribute
    // cpp: cc::CustomAttribute
    export class CustomAttribute {
        // public_fields list
        attr    : gfx.Attribute;// cc::gfx::Attribute
        values  : number[];     // std::vector<float>
    } // endof class CustomAttribute
    
    
    // ts : jsb.IGeometry
    // cpp: cc::IGeometry
    export class IGeometry {
        // public_fields list
        positions       : number[];                 // std::vector<float>
        normals         ?: number[];                // boost::optional<std::vector<float>>
        uvs             ?: number[];                // boost::optional<std::vector<float>>
        tangents        ?: number[];                // boost::optional<std::vector<float>>
        colors          ?: number[];                // boost::optional<std::vector<float>>
        attributes      ?: gfx.Attribute[];         // boost::optional<std::vector<cc::gfx::Attribute>>
        customAttributes?: jsb.CustomAttribute[];   // boost::optional<std::vector<cc::CustomAttribute>>
        boundingRadius  ?: number;                  // boost::optional<float>
        minPos          ?: jsb.Vec3;                // boost::optional<cc::Vec3>
        maxPos          ?: jsb.Vec3;                // boost::optional<cc::Vec3>
        indices         ?: number[];                // boost::optional<std::vector<unsigned int>>
        primitiveMode   ?: cc.gfx.PrimitiveMode;    // boost::optional<cc::gfx::PrimitiveMode>
        doubleSided     ?: boolean;                 // boost::optional<bool>
    } // endof class IGeometry
    
    
    // ts : jsb.DynamicCustomAttribute
    // cpp: cc::DynamicCustomAttribute
    export class DynamicCustomAttribute {
        // public_fields list
        attr    : gfx.Attribute;// cc::gfx::Attribute
        values  : Float32Array; // cc::TypedArrayTemp<float>
    } // endof class DynamicCustomAttribute
    
    
    // ts : jsb.IDynamicGeometry
    // cpp: cc::IDynamicGeometry
    export class IDynamicGeometry {
        // public_fields list
        positions       : Float32Array;                 // cc::TypedArrayTemp<float>
        normals         ?: Float32Array;                // boost::optional<cc::TypedArrayTemp<float>>
        uvs             ?: Float32Array;                // boost::optional<cc::TypedArrayTemp<float>>
        tangents        ?: Float32Array;                // boost::optional<cc::TypedArrayTemp<float>>
        colors          ?: Float32Array;                // boost::optional<cc::TypedArrayTemp<float>>
        customAttributes?: jsb.DynamicCustomAttribute[];// boost::optional<std::vector<cc::DynamicCustomAttribute>>
        minPos          ?: jsb.Vec3;                    // boost::optional<cc::Vec3>
        maxPos          ?: jsb.Vec3;                    // boost::optional<cc::Vec3>
        indices16       ?: Uint16Array;                 // boost::optional<cc::TypedArrayTemp<unsigned short>>
        indices32       ?: Uint32Array;                 // boost::optional<cc::TypedArrayTemp<unsigned int>>
        primitiveMode   ?: cc.gfx.PrimitiveMode;        // boost::optional<cc::gfx::PrimitiveMode>
        doubleSided     ?: boolean;                     // boost::optional<bool>
    } // endof class IDynamicGeometry
    
    
    export namespace Mesh {
    
    
        // ts : jsb.Mesh::IVertexBundle
        // cpp: cc::Mesh::IVertexBundle
        export class IVertexBundle {
            // public_fields list
            _padding    ?: number;              // boost::optional<unsigned char>
            view        : jsb.IMeshBufferView;  // cc::IMeshBufferView
            attributes  : gfx.Attribute[];      // std::vector<cc::gfx::Attribute>
        } // endof class IVertexBundle
    
    
        // ts : jsb.Mesh::ISubMesh
        // cpp: cc::Mesh::ISubMesh
        export class ISubMesh {
            // public_fields list
            vertexBundelIndices : number[];             // std::vector<unsigned int>
            primitiveMode       : number;               // cc::gfx::PrimitiveMode
            indexView           ?: jsb.IMeshBufferView; // boost::optional<cc::IMeshBufferView>
            jointMapIndex       ?: number;              // boost::optional<unsigned int>
        } // endof class ISubMesh
    
    
        // ts : jsb.Mesh::IDynamicInfo
        // cpp: cc::Mesh::IDynamicInfo
        export class IDynamicInfo {
            // public_fields list
            maxSubMeshes        : number;   // unsigned int
            maxSubMeshVertices  : number;   // unsigned int
            maxSubMeshIndices   : number;   // unsigned int
        } // endof class IDynamicInfo
    
    
        // ts : jsb.Mesh::IDynamicStruct
        // cpp: cc::Mesh::IDynamicStruct
        export class IDynamicStruct {
            // public_fields list
            info    : jsb.Mesh.IDynamicInfo;// cc::Mesh::IDynamicInfo
            bounds  : jsb.AABB[];           // std::vector<cc::geometry::AABB>
        } // endof class IDynamicStruct
    
    
        // ts : jsb.Mesh::IStruct
        // cpp: cc::Mesh::IStruct
        export class IStruct {
            // public_fields list
            vertexBundles   : jsb.Mesh.IVertexBundle[]; // std::vector<cc::Mesh::IVertexBundle>
            primitives      : jsb.Mesh.ISubMesh[];      // std::vector<cc::Mesh::ISubMesh>
            minPosition     ?: jsb.Vec3;                // boost::optional<cc::Vec3>
            maxPosition     ?: jsb.Vec3;                // boost::optional<cc::Vec3>
            jointMaps       ?: number[][];              // boost::optional<std::vector<std::vector<int>>>
            morph           ?: jsb.Morph;               // boost::optional<cc::Morph>
            dynamic         ?: jsb.Mesh.IDynamicStruct; // boost::optional<cc::Mesh::IDynamicStruct>
        } // endof class IStruct
    
    
        // ts : jsb.Mesh::ICreateInfo
        // cpp: cc::Mesh::ICreateInfo
        export class ICreateInfo {
            // public_fields list
            struct  : jsb.Mesh.IStruct; // cc::Mesh::IStruct
            data    : Uint8Array;       // cc::TypedArrayTemp<unsigned char>
        } // endof class ICreateInfo
    } // endof namespace ${klass.class_name} 
    
    // ts : jsb.Mesh
    // cpp: cc::Mesh
    export class Mesh extends jsb.Asset {
        // attributes list
        _hash               : number;                   // unsigned int
        hash                : number;                   // unsigned int
        data                : Uint8Array;               // cc::TypedArrayTemp<unsigned char>
        _data               : Uint8Array;               // cc::TypedArrayTemp<unsigned char>
        jointBufferIndices  : number[];                 // std::vector<int>
        maxPosition         : jsb.Vec3;                 // cc::Vec3
        minPosition         : jsb.Vec3;                 // cc::Vec3
        renderingSubMeshes  : jsb.RenderingSubMesh[];   // std::vector<cc::IntrusivePtr<cc::RenderingSubMesh>>
        subMeshCount        : number;                   // unsigned int
        _nativeAsset        : ArrayBuffer;              // cc::ArrayBuffer*
        _allowDataAccess    : boolean;                  // bool
        allowDataAccess     : boolean;                  // bool
        // public_fields list
        morphRendering  : jsb.MorphRendering;   // cc::IntrusivePtr<cc::MorphRendering>
        // methods list
        constructor();
        /**
         * en The struct of the mesh
         * 
         * zh 此网格的结构。
         */
        getStruct():jsb.Mesh.IStruct; // cc::Mesh::IStruct
        setStruct(input: jsb.Mesh.IStruct):void; // void
        initialize():void; // void
        /**
         * en Release all related GPU resources
         * 
         * zh 释放此网格占有的所有 GPU 资源。
         */
        destroyRenderingMesh():void; // void
        /**
         * en Reset the struct and data of the mesh
         * 
         * zh 重置此网格的结构和数据。
         * 
         * param struct The new struct
         * 
         * param data The new data
         * 
         * deprecated Will be removed in v3.0.0, please use [[reset]] instead
         */
        assign(structInfo: jsb.Mesh.IStruct, data: Uint8Array):void; // void
        /**
         * en Reset the mesh with mesh creation information
         * 
         * zh 重置此网格。
         * 
         * param info Mesh creation information including struct and data
         */
        reset(info: jsb.Mesh.ICreateInfo):void; // void
        /**
         * en Get [[AABB]] bounds in the skeleton's bone space
         * 
         * zh 获取骨骼变换空间内下的 [[AABB]] 包围盒
         * 
         * param skeleton
         */
        getBoneSpaceBounds(skeleton: jsb.Skeleton):jsb.AABB[]; // std::vector<cc::IntrusivePtr<cc::geometry::AABB>>
        /**
         * en Merge the given mesh into the current mesh
         * 
         * zh 合并指定的网格到此网格中。
         * 
         * param mesh The mesh to be merged
         * 
         * param worldMatrix The world matrix of the given mesh
         * 
         * param [validate=false] Whether to validate the mesh
         * 
         * returns Check the mesh state and return the validation result.
         */
        merge(mesh: jsb.Mesh):boolean; // bool
        merge(mesh: jsb.Mesh, worldMatrix: jsb.Mat4):boolean; // bool
        merge(mesh: jsb.Mesh, worldMatrix: jsb.Mat4, validate: boolean):boolean; // bool
        /**
         * en Validation for whether the given mesh can be merged into the current mesh.
         * 
         * To pass the validation, it must satisfy either of these two requirements:
         * 
         * - When the current mesh have no data
         * 
         * - When the two mesh have the same vertex bundle count, the same sub meshes count, and the same sub mesh layout.
         * 
         * Same mesh layout means:
         * 
         * - They have the same primitive type and reference to the same amount vertex bundle with the same indices.
         * 
         * - And they all have or don't have index view
         * 
         * zh 验证指定网格是否可以合并至当前网格。
         * 
         * 当满足以下条件之一时，指定网格可以合并至当前网格：
         * 
         * - 当前网格无数据而待合并网格有数据；
         * 
         * - 它们的顶点块数目相同且对应顶点块的布局一致，并且它们的子网格数目相同且对应子网格的布局一致。
         * 
         * 两个顶点块布局一致当且仅当：
         * 
         * - 它们具有相同数量的顶点属性且对应的顶点属性具有相同的属性格式。
         * 
         * 两个子网格布局一致，当且仅当：
         * 
         * - 它们具有相同的图元类型并且引用相同数量、相同索引的顶点块；并且，
         * 
         * - 要么都需要索引绘制，要么都不需要索引绘制。
         * 
         * param mesh The other mesh to be validated
         */
        validateMergingMesh(mesh: jsb.Mesh):boolean; // bool
        /**
         * en Read the requested attribute of the given sub mesh
         * 
         * zh 读取子网格的指定属性。
         * 
         * param primitiveIndex Sub mesh index
         * 
         * param attributeName Attribute name
         * 
         * returns Return null if not found or can't read, otherwise, will create a large enough typed array to contain all data of the attribute,
         * 
         * the array type will match the data type of the attribute.
         */
        readAttribute(primitiveIndex: number, attributeName: string):(undefined|Int8Array|Int16Array|Int32Array|Uint8Array|Uint16Array|Uint32Array|Float32Array|Float64Array); // boost::variant2::variant<boost::variant2::monostate, cc::TypedArrayTemp<signed char>, cc::TypedArrayTemp<short>, cc::TypedArrayTemp<int>, cc::TypedArrayTemp<unsigned char>, cc::TypedArrayTemp<unsigned short>, cc::TypedArrayTemp<unsigned int>, cc::TypedArrayTemp<float>, cc::TypedArrayTemp<double>>
        /**
         * en Read the requested attribute of the given sub mesh and fill into the given buffer.
         * 
         * zh 读取子网格的指定属性到目标缓冲区中。
         * 
         * param primitiveIndex Sub mesh index
         * 
         * param attributeName Attribute name
         * 
         * param buffer The target array buffer
         * 
         * param stride Byte distance between two attributes in the target buffer
         * 
         * param offset The offset of the first attribute in the target buffer
         * 
         * returns Return false if failed to access attribute, return true otherwise.
         */
        copyAttribute(primitiveIndex: number, attributeName: string, buffer: ArrayBuffer, stride: number, offset: number):boolean; // bool
        /**
         * en Read the indices data of the given sub mesh
         * 
         * zh 读取子网格的索引数据。
         * 
         * param primitiveIndex Sub mesh index
         * 
         * returns Return null if not found or can't read, otherwise, will create a large enough typed array to contain all indices data,
         * 
         * the array type will use the corresponding stride size.
         */
        readIndices(primitiveIndex: number):(Uint8Array|Uint16Array|Uint32Array); // boost::variant2::variant<cc::TypedArrayTemp<unsigned char>, cc::TypedArrayTemp<unsigned short>, cc::TypedArrayTemp<unsigned int>>
        /**
         * en Read the indices data of the given sub mesh and fill into the given array
         * 
         * zh 读取子网格的索引数据到目标数组中。
         * 
         * param primitiveIndex Sub mesh index
         * 
         * param outputArray The target output array
         * 
         * returns Return false if failed to access the indices data, return true otherwise.
         */
        copyIndices(primitiveIndex: number, outputArray: (undefined|Int8Array|Int16Array|Int32Array|Uint8Array|Uint16Array|Uint32Array|Float32Array|Float64Array)):boolean; // bool
        /**
         * en Read the format by attributeName of submesh
         * 
         * zh 根据属性名读取子网格的属性信息。
         * 
         * param primitiveIndex @en Sub mesh index @zh 子网格索引
         * 
         * param attributeName @en Attribute name @zh 属性名称
         * 
         * returns @en Return null if failed to read format, return the format otherwise. @zh 读取失败返回 null， 否则返回 format
         */
        readAttributeFormat(primitiveIndex: number, attributeName: string):gfx.FormatInfo; // cc::gfx::FormatInfo*
        /**
         * en update dynamic sub mesh geometry
         * 
         * zh 更新动态子网格的几何数据
         * 
         * param primitiveIndex: sub mesh index
         * 
         * param geometry: sub mesh geometry data
         */
        updateSubMesh(primitiveIndex: number, geometry: jsb.IDynamicGeometry):void; // void
    } // endof class Mesh
    
    
    // ts : jsb.Skeleton
    // cpp: cc::Skeleton
    export class Skeleton extends jsb.Asset {
        // attributes list
        _joints         : string[];     // std::vector<std::string>
        joints          : string[];     // std::vector<std::string>
        _hash           : number;       // unsigned int
        hash            : number;       // unsigned int
        _invBindposes   : jsb.Mat4[];   // std::vector<cc::Mat4>
        inverseBindposes: jsb.Mat4[];   // std::vector<cc::Mat4>
        // methods list
        constructor();
        /**
         * en The path of all bones, the length always equals the length of [[bindposes]]
         * 
         * zh 所有关节的路径。该数组的长度始终与 [[bindposes]] 的长度相同。
         */
        getJoints():string[]; // std::vector<std::string>
        setJoints(value: string[]):void; // void
        /**
         * en The bind poses matrix of all bones, the length always equals the length of [[joints]]
         * 
         * zh 所有关节的绑定姿势矩阵。该数组的长度始终与 [[joints]] 的长度相同。
         */
        getBindposes():jsb.Mat4[]; // std::vector<cc::Mat4>
        setBindposes(value: jsb.Mat4[]):void; // void
        /**
         * en Gets the inverse bind poses matrix
         * 
         * zh 获取反向绑定姿势矩阵
         */
        getInverseBindposes():jsb.Mat4[]; // std::vector<cc::Mat4>
        /**
         * en Gets the hash of the skeleton asset
         * 
         * zh 获取骨骼资源的哈希值
         */
        getHash():number; // unsigned int
        setHash(hash: number):void; // void
    } // endof class Skeleton
    
    
    // ts : jsb.ICreateMeshOptions
    // cpp: cc::ICreateMeshOptions
    export class ICreateMeshOptions {
        // public_fields list
        calculateBounds ?: boolean; // boost::optional<bool>
    } // endof class ICreateMeshOptions
    
    
    // ts : jsb.ICreateDynamicMeshOptions
    // cpp: cc::ICreateDynamicMeshOptions
    export class ICreateDynamicMeshOptions {
        // public_fields list
        maxSubMeshes        : number;   // unsigned int
        maxSubMeshVertices  : number;   // unsigned int
        maxSubMeshIndices   : number;   // unsigned int
    } // endof class ICreateDynamicMeshOptions
    
    
    // ts : jsb.MeshUtils
    // cpp: cc::MeshUtils
    export class MeshUtils {
        // static methods list
        /**
         * en create a static mesh.
         * 
         * zh 创建一个静态网格。
         */
        static createMesh(geometry: jsb.IGeometry):jsb.Mesh; // cc::Mesh*
        static createMesh(geometry: jsb.IGeometry, out: jsb.Mesh):jsb.Mesh; // cc::Mesh*
        static createMesh(geometry: jsb.IGeometry, out: jsb.Mesh, options: jsb.ICreateMeshOptions):jsb.Mesh; // cc::Mesh*
        /**
         * en create a static mesh ICreateInfo.
         * 
         * zh 创建一个静态网格ICreateInfo。
         */
        static createMeshInfo(geometry: jsb.IGeometry, options: jsb.ICreateMeshOptions):jsb.Mesh.ICreateInfo; // cc::Mesh::ICreateInfo
        /**
         * en create a dynamic mesh.
         * 
         * zh 创建一个动态网格。
         */
        static createDynamicMesh(primitiveIndex: number, geometry: jsb.IDynamicGeometry):jsb.Mesh; // cc::Mesh*
        static createDynamicMesh(primitiveIndex: number, geometry: jsb.IDynamicGeometry, out: jsb.Mesh):jsb.Mesh; // cc::Mesh*
        static createDynamicMesh(primitiveIndex: number, geometry: jsb.IDynamicGeometry, out: jsb.Mesh, options: jsb.ICreateDynamicMeshOptions):jsb.Mesh; // cc::Mesh*
        /**
         * en create a dynamic mesh ICreateInfo.
         * 
         * zh 创建一个动态网格ICreateInfo。
         */
        static createDynamicMeshInfo(geometry: jsb.IDynamicGeometry, options: jsb.ICreateDynamicMeshOptions):jsb.Mesh.ICreateInfo; // cc::Mesh::ICreateInfo
    } // endof class MeshUtils
    
    
    // ts : jsb.AudioProfile
    // cpp: cc::AudioProfile
    export class AudioProfile {
        // public_fields list
        name        : string;   // std::string
        maxInstances: number;   // unsigned int
        minDelay    : number;   // double
        // methods list
        constructor();
    } // endof class AudioProfile
    
    
    // ts : jsb.AudioEngine
    // cpp: cc::AudioEngine
    export class AudioEngine {
        // static methods list
        static lazyInit():boolean; // bool
        /**
         * Release objects relating to AudioEngine.
         * 
         * warning It must be called before the application exit.
         * 
         * lua endToLua
         */
        static end():void; // void
        /**
         * Gets the default profile of audio instances.
         * 
         * return The default profile of audio instances.
         */
        static getDefaultProfile():jsb.AudioProfile; // cc::AudioProfile*
        /**
         * Play 2d sound.
         * 
         * param filePath The path of an audio file.
         * 
         * param loop Whether audio instance loop or not.
         * 
         * param volume Volume value (range from 0.0 to 1.0).
         * 
         * param profile A profile for audio instance. When profile is not specified, default profile will be used.
         * 
         * return An audio ID. It allows you to dynamically change the behavior of an audio instance on the fly.
         * 
         * see `AudioProfile`
         */
        static play2d(filePath: string):number; // int
        static play2d(filePath: string, loop: boolean):number; // int
        static play2d(filePath: string, loop: boolean, volume: number):number; // int
        static play2d(filePath: string, loop: boolean, volume: number, profile: jsb.AudioProfile):number; // int
        /**
         * Sets whether an audio instance loop or not.
         * 
         * param audioID An audioID returned by the play2d function.
         * 
         * param loop Whether audio instance loop or not.
         */
        static setLoop(audioID: number, loop: boolean):void; // void
        /**
         * Checks whether an audio instance is loop.
         * 
         * param audioID An audioID returned by the play2d function.
         * 
         * return Whether or not an audio instance is loop.
         */
        static isLoop(audioID: number):boolean; // bool
        /**
         * Sets volume for an audio instance.
         * 
         * param audioID An audioID returned by the play2d function.
         * 
         * param volume Volume value (range from 0.0 to 1.0).
         */
        static setVolume(audioID: number, volume: number):void; // void
        /**
         * sets volume factor for all audio instance
         * 
         * param factor, Volume factor(range from 0.0 to 1.0).
         */
        static setVolumeFactor(factor: number):void; // void
        /**
         * Gets the volume value of an audio instance.
         * 
         * param audioID An audioID returned by the play2d function.
         * 
         * return Volume value (range from 0.0 to 1.0).
         */
        static getVolume(audioID: number):number; // float
        /**
         * Pause an audio instance.
         * 
         * param audioID An audioID returned by the play2d function.
         */
        static pause(audioID: number):void; // void
        /**
         * Pause all playing audio instances.
         */
        static pauseAll():void; // void
        /**
         * Resume an audio instance.
         * 
         * param audioID An audioID returned by the play2d function.
         */
        static resume(audioID: number):void; // void
        /**
         * Resume all suspended audio instances.
         */
        static resumeAll():void; // void
        /**
         * Stop an audio instance.
         * 
         * param audioID An audioID returned by the play2d function.
         */
        static stop(audioID: number):void; // void
        /**
         * Stop all audio instances.
         */
        static stopAll():void; // void
        /**
         * Sets the current playback position of an audio instance.
         * 
         * param audioID   An audioID returned by the play2d function.
         * 
         * param time      The offset in seconds from the start to seek to.
         * 
         * return
         */
        static setCurrentTime(audioID: number, time: number):boolean; // bool
        /**
         * Gets the current playback position of an audio instance.
         * 
         * param audioID An audioID returned by the play2d function.
         * 
         * return The current playback position of an audio instance.
         */
        static getCurrentTime(audioID: number):number; // float
        /**
         * Gets the duration of an audio instance.
         * 
         * param audioID An audioID returned by the play2d function.
         * 
         * return The duration of an audio instance.
         */
        static getDuration(audioID: number):number; // float
        /**
         * Gets the duration of an audio file.
         * 
         * param filePath The path of an audio file.
         * 
         * return The duration of an audio file.
         */
        static getDurationFromFile(filePath: string):number; // float
        /**
         * Returns the state of an audio instance.
         * 
         * param audioID An audioID returned by the play2d function.
         * 
         * return The status of an audio instance.
         */
        static getState(audioID: number):number; // cc::AudioEngine::AudioState
        /**
         * Register a callback to be invoked when an audio instance has completed playing.
         * 
         * param audioID An audioID returned by the play2d function.
         * 
         * param callback
         */
        static setFinishCallback(audioID: number, callback: AnyFunction):void; // void
        /**
         * Gets the maximum number of simultaneous audio instance of AudioEngine.
         */
        static getMaxAudioInstance():number; // int
        /**
         * Sets the maximum number of simultaneous audio instance for AudioEngine.
         * 
         * param maxInstances The maximum number of simultaneous audio instance.
         */
        static setMaxAudioInstance(maxInstances: number):boolean; // bool
        /**
         * Uncache the audio data from internal buffer.
         * 
         * AudioEngine cache audio data on ios,mac, and oalsoft platform.
         * 
         * warning This can lead to stop related audio first.
         * 
         * param filePath Audio file path.
         */
        static uncache(filePath: string):void; // void
        /**
         * Uncache all audio data from internal buffer.
         * 
         * warning All audio will be stopped first.
         */
        static uncacheAll():void; // void
        /**
         * Gets an audio profile by name.
         * 
         * param profileName A name of audio profile.
         * 
         * return The audio profile.
         */
        static getProfile(profileName: string):jsb.AudioProfile; // cc::AudioProfile*
        /**
         * Gets the audio profile by id of audio instance.
         * 
         * param audioID An audioID returned by the play2d function.
         * 
         * return The audio profile.
         */
        static getProfile(audioID: number):jsb.AudioProfile; // cc::AudioProfile*
        /**
         * Preload audio file.
         * 
         * param filePath The file path of an audio.
         * 
         * param callback A callback which will be called after loading is finished.
         */
        static preload(filePath: string, callback: AnyFunction):void; // void
        /**
         * Preload audio file.
         * 
         * param filePath The file path of an audio.
         */
        static preload(filePath: string):void; // void
        /**
         * Gets playing audio count.
         */
        static getPlayingAudioCount():number; // int
        /**
         * Whether to enable playing audios
         * 
         * note If it's disabled, current playing audios will be stopped and the later 'preload', 'play2d' methods will take no effects.
         */
        static setEnabled(isEnabled: boolean):void; // void
        /**
         * Check whether AudioEngine is enabled.
         */
        static isEnabled():boolean; // bool
    } // endof class AudioEngine
    
    
    // ts : jsb.FileUtils
    // cpp: cc::FileUtils
    export class FileUtils {
        // static methods list
        /**
         * Gets the instance of FileUtils.
         */
        static getInstance():jsb.FileUtils; // cc::FileUtils*
        // methods list
        /**
         * Purges full path caches.
         */
        purgeCachedEntries():void; // void
        /**
         * Gets string from a file.
         */
        getStringFromFile(filename: string):string; // std::string
        /**
         * Creates binary data from a file.
         * 
         * return A data object.
         */
        getDataFromFile(filename: string):jsb.Data; // cc::Data
        getContents(filename: string, buffer: jsb.ResizableBuffer):number; // cc::FileUtils::Status
        /**
         * Gets resource file data from a zip file.
         * 
         * param[in]  filename The resource file name which contains the relative path of the zip file.
         * 
         * param[out] size If the file read operation succeeds, it will be the data size, otherwise 0.
         * 
         * return Upon success, a pointer to the data is returned, otherwise nullptr.
         * 
         * warning Recall: you are responsible for calling free() on any Non-nullptr pointer returned.
         */
        getFileDataFromZip(zipFilePath: string, filename: string, size: number):string; // unsigned char*
        /**
         * Returns the fullpath for a given filename.
         * 
         * First it will try to get a new filename from the "filenameLookup" dictionary.
         * 
         * If a new filename can't be found on the dictionary, it will use the original filename.
         * 
         * Then it will try to obtain the full path of the filename using the FileUtils search rules: resolutions, and search paths.
         * 
         * The file search is based on the array element order of search paths and resolution directories.
         * 
         * For instance:
         * 
         * We set two elements("/mnt/sdcard/", "internal_dir/") to search paths vector by setSearchPaths,
         * 
         * and set three elements("resources-ipadhd/", "resources-ipad/", "resources-iphonehd")
         * 
         * to resolutions vector by setSearchResolutionsOrder. The "internal_dir" is relative to "Resources/".
         * 
         * If we have a file named 'sprite.png', the mapping in fileLookup dictionary contains `key: sprite.png -> value: sprite.pvr.gz`.
         * 
         * Firstly, it will replace 'sprite.png' with 'sprite.pvr.gz', then searching the file sprite.pvr.gz as follows:
         * 
         * /mnt/sdcard/resources-ipadhd/sprite.pvr.gz      (if not found, search next)
         * 
         * /mnt/sdcard/resources-ipad/sprite.pvr.gz        (if not found, search next)
         * 
         * /mnt/sdcard/resources-iphonehd/sprite.pvr.gz    (if not found, search next)
         * 
         * /mnt/sdcard/sprite.pvr.gz                       (if not found, search next)
         * 
         * internal_dir/resources-ipadhd/sprite.pvr.gz     (if not found, search next)
         * 
         * internal_dir/resources-ipad/sprite.pvr.gz       (if not found, search next)
         * 
         * internal_dir/resources-iphonehd/sprite.pvr.gz   (if not found, search next)
         * 
         * internal_dir/sprite.pvr.gz                      (if not found, return "sprite.png")
         * 
         * If the filename contains relative path like "gamescene/uilayer/sprite.png",
         * 
         * and the mapping in fileLookup dictionary contains `key: gamescene/uilayer/sprite.png -> value: gamescene/uilayer/sprite.pvr.gz`.
         * 
         * The file search order will be:
         * 
         * /mnt/sdcard/gamescene/uilayer/resources-ipadhd/sprite.pvr.gz      (if not found, search next)
         * 
         * /mnt/sdcard/gamescene/uilayer/resources-ipad/sprite.pvr.gz        (if not found, search next)
         * 
         * /mnt/sdcard/gamescene/uilayer/resources-iphonehd/sprite.pvr.gz    (if not found, search next)
         * 
         * /mnt/sdcard/gamescene/uilayer/sprite.pvr.gz                       (if not found, search next)
         * 
         * internal_dir/gamescene/uilayer/resources-ipadhd/sprite.pvr.gz     (if not found, search next)
         * 
         * internal_dir/gamescene/uilayer/resources-ipad/sprite.pvr.gz       (if not found, search next)
         * 
         * internal_dir/gamescene/uilayer/resources-iphonehd/sprite.pvr.gz   (if not found, search next)
         * 
         * internal_dir/gamescene/uilayer/sprite.pvr.gz                      (if not found, return "gamescene/uilayer/sprite.png")
         * 
         * If the new file can't be found on the file system, it will return the parameter filename directly.
         * 
         * This method was added to simplify multiplatform support. Whether you are using cocos2d-js or any cross-compilation toolchain like StellaSDK or Apportable,
         * 
         * you might need to load different resources for a given file in the different platforms.
         * 
         * since v2.1
         */
        fullPathForFilename(filename: string):string; // std::string
        /**
         * Gets full path from a file name and the path of the relative file.
         * 
         * param filename The file name.
         * 
         * param relativeFile The path of the relative file.
         * 
         * return The full path.
         * 
         * e.g. filename: hello.png, pszRelativeFile: /User/path1/path2/hello.plist
         * 
         * Return: /User/path1/path2/hello.pvr (If there a a key(hello.png)-value(hello.pvr) in FilenameLookup dictionary. )
         */
        fullPathFromRelativeFile(filename: string, relativeFile: string):string; // std::string
        /**
         * Sets the array of search paths.
         * 
         * You can use this array to modify the search path of the resources.
         * 
         * If you want to use "themes" or search resources in the "cache", you can do it easily by adding new entries in this array.
         * 
         * note This method could access relative path and absolute path.
         * 
         * If the relative path was passed to the vector, FileUtils will add the default resource directory before the relative path.
         * 
         * For instance:
         * 
         * On Android, the default resource root path is "@assets/".
         * 
         * If "/mnt/sdcard/" and "resources-large" were set to the search paths vector,
         * 
         * "resources-large" will be converted to "@assets/resources-large" since it was a relative path.
         * 
         * param searchPaths The array contains search paths.
         * 
         * see fullPathForFilename(const char*)
         * 
         * since v2.1
         */
        setSearchPaths(searchPaths: string[]):void; // void
        /**
         * Get default resource root path.
         */
        getDefaultResourceRootPath():string; // std::string
        /**
         * Set default resource root path.
         */
        setDefaultResourceRootPath(path: string):void; // void
        /**
         * Add search path.
         * 
         * since v2.1
         */
        addSearchPath(path: string):void; // void
        addSearchPath(path: string, front: boolean):void; // void
        /**
         * Gets the array of search paths.
         * 
         * return The array of search paths which may contain the prefix of default resource root path.
         * 
         * note In best practise, getter function should return the value of setter function passes in.
         * 
         * But since we should not break the compatibility, we keep using the old logic.
         * 
         * Therefore, If you want to get the original search paths, please call 'getOriginalSearchPaths()' instead.
         * 
         * see fullPathForFilename(const char*).
         */
        getSearchPaths():string[]; // std::vector<std::string>
        /**
         * Gets the original search path array set by 'setSearchPaths' or 'addSearchPath'.
         * 
         * return The array of the original search paths
         */
        getOriginalSearchPaths():string[]; // std::vector<std::string>
        /**
         * Gets the writable path.
         * 
         * return  The path that can be write/read a file in
         */
        getWritablePath():string; // std::string
        /**
         * Sets writable path.
         */
        setWritablePath(writablePath: string):void; // void
        /**
         * Converts the contents of a file to a ValueMap.
         * 
         * param filename The filename of the file to gets content.
         * 
         * return ValueMap of the file contents.
         * 
         * note This method is used internally.
         */
        getValueMapFromFile(filename: string):{[key:string]:any}; // std::unordered_map<std::string, cc::Value>
        /**
         * Converts the contents of a file to a ValueMap.
         * 
         * This method is used internally.
         */
        getValueMapFromData(filedata: string, filesize: number):{[key:string]:any}; // std::unordered_map<std::string, cc::Value>
        /**
         * write a ValueMap into a plist file
         * 
         * param dict the ValueMap want to save
         * 
         * param fullPath The full path to the file you want to save a string
         * 
         * return bool
         */
        writeToFile(dict: {[key:string]:any}, fullPath: string):boolean; // bool
        /**
         * write a string into a file
         * 
         * param dataStr the string want to save
         * 
         * param fullPath The full path to the file you want to save a string
         * 
         * return bool True if write success
         */
        writeStringToFile(dataStr: string, fullPath: string):boolean; // bool
        /**
         * write Data into a file
         * 
         * param data the data want to save
         * 
         * param fullPath The full path to the file you want to save a string
         * 
         * return bool
         */
        writeDataToFile(data: jsb.Data, fullPath: string):boolean; // bool
        /**
         * write ValueMap into a plist file
         * 
         * param dict the ValueMap want to save
         * 
         * param fullPath The full path to the file you want to save a string
         * 
         * return bool
         */
        writeValueMapToFile(dict: {[key:string]:any}, fullPath: string):boolean; // bool
        /**
         * write ValueVector into a plist file
         * 
         * param vecData the ValueVector want to save
         * 
         * param fullPath The full path to the file you want to save a string
         * 
         * return bool
         */
        writeValueVectorToFile(vecData: any[], fullPath: string):boolean; // bool
        /**
         * Windows fopen can't support UTF-8 filename
         * 
         * Need convert all parameters fopen and other 3rd-party libs
         * 
         * param filenameUtf8 ccstd::string name file for conversion from utf-8
         * 
         * return ccstd::string ansi filename in current locale
         */
        getSuitableFOpen(filenameUtf8: string):string; // std::string
        getValueVectorFromFile(filename: string):any[]; // std::vector<cc::Value>
        /**
         * Checks whether a file exists.
         * 
         * note If a relative path was passed in, it will be inserted a default root path at the beginning.
         * 
         * param filename The path of the file, it could be a relative or absolute path.
         * 
         * return True if the file exists, false if not.
         */
        isFileExist(filename: string):boolean; // bool
        /**
         * Gets filename extension is a suffix (separated from the base filename by a dot) in lower case.
         * 
         * Examples of filename extensions are .png, .jpeg, .exe, .dmg and .txt.
         * 
         * param filePath The path of the file, it could be a relative or absolute path.
         * 
         * return suffix for filename in lower case or empty if a dot not found.
         */
        getFileExtension(filePath: string):string; // std::string
        /**
         * Checks whether the path is an absolute path.
         * 
         * note On Android, if the parameter passed in is relative to "@assets/", this method will treat it as an absolute path.
         * 
         * Also on Blackberry, path starts with "app/native/Resources/" is treated as an absolute path.
         * 
         * param path The path that needs to be checked.
         * 
         * return True if it's an absolute path, false if not.
         */
        isAbsolutePath(path: string):boolean; // bool
        /**
         * Checks whether the path is a directory.
         * 
         * param dirPath The path of the directory, it could be a relative or an absolute path.
         * 
         * return True if the directory exists, false if not.
         */
        isDirectoryExist(dirPath: string):boolean; // bool
        /**
         * List all files in a directory.
         * 
         * param dirPath The path of the directory, it could be a relative or an absolute path.
         * 
         * return File paths in a string vector
         */
        listFiles(dirPath: string):string[]; // std::vector<std::string>
        /**
         * List all files recursively in a directory.
         * 
         * param dirPath The path of the directory, it could be a relative or an absolute path.
         * 
         * return File paths in a string vector
         */
        listFilesRecursively(dirPath: string, files: string[]):void; // void
        /**
         * Creates a directory.
         * 
         * param dirPath The path of the directory, it must be an absolute path.
         * 
         * return True if the directory have been created successfully, false if not.
         */
        createDirectory(dirPath: string):boolean; // bool
        /**
         * Removes a directory.
         * 
         * param dirPath  The full path of the directory, it must be an absolute path.
         * 
         * return True if the directory have been removed successfully, false if not.
         */
        removeDirectory(dirPath: string):boolean; // bool
        /**
         * Removes a file.
         * 
         * param filepath The full path of the file, it must be an absolute path.
         * 
         * return True if the file have been removed successfully, false if not.
         */
        removeFile(filepath: string):boolean; // bool
        /**
         * Renames a file under the given directory.
         * 
         * param oldfullpath  The current fullpath of the file. Includes path and name.
         * 
         * param newfullpath  The new fullpath of the file. Includes path and name.
         * 
         * return True if the file have been renamed successfully, false if not.
         */
        renameFile(oldfullpath: string, newfullpath: string):boolean; // bool
        /**
         * Renames a file under the given directory.
         * 
         * param path     The parent directory path of the file, it must be an absolute path.
         * 
         * param oldname  The current name of the file.
         * 
         * param name     The new name of the file.
         * 
         * return True if the file have been renamed successfully, false if not.
         */
        renameFile(path: string, oldname: string, name: string):boolean; // bool
        /**
         * Retrieve the file size.
         * 
         * note If a relative path was passed in, it will be inserted a default root path at the beginning.
         * 
         * param filepath The path of the file, it could be a relative or absolute path.
         * 
         * return The file size.
         */
        getFileSize(filepath: string):number; // long
        /**
         * Returns the full path cache.
         */
        getFullPathCache():{[key:string]:string}; // std::unordered_map<std::string, std::string>
        normalizePath(path: string):string; // std::string
        getFileDir(path: string):string; // std::string
    } // endof class FileUtils
    
    
    // ts : jsb.Vec2
    // cpp: cc::Vec2
    export class Vec2 {
        // public_fields list
        x   : number;   // float
        y   : number;   // float
        // methods list
        constructor(xx: number, yy: number);
        constructor();
        constructor(array: number);
        constructor(p1: jsb.Vec2, p2: jsb.Vec2);
        /**
         * Indicates whether this vector contains all zeros.
         * 
         * return true if this vector contains all zeros, false otherwise.
         */
        isZero():boolean; // bool
        /**
         * Indicates whether this vector contains all ones.
         * 
         * return true if this vector contains all ones, false otherwise.
         */
        isOne():boolean; // bool
        /**
         * Adds the elements of the specified vector to this one.
         * 
         * param v The vector to add.
         */
        add(v: jsb.Vec2):void; // void
        /**
         * Clamps this vector within the specified range.
         * 
         * param min The minimum value.
         * 
         * param max The maximum value.
         */
        clamp(min: jsb.Vec2, max: jsb.Vec2):void; // void
        /**
         * Returns the distance between this vector and v.
         * 
         * param v The other vector.
         * 
         * return The distance between this vector and v.
         * 
         * see distanceSquared
         */
        distance(v: jsb.Vec2):number; // float
        /**
         * Returns the squared distance between this vector and v.
         * 
         * When it is not necessary to get the exact distance between
         * 
         * two vectors (for example, when simply comparing the
         * 
         * distance between different vectors), it is advised to use
         * 
         * this method instead of distance.
         * 
         * param v The other vector.
         * 
         * return The squared distance between this vector and v.
         * 
         * see distance
         */
        distanceSquared(v: jsb.Vec2):number; // float
        /**
         * Returns the dot product of this vector and the specified vector.
         * 
         * param v The vector to compute the dot product with.
         * 
         * return The dot product.
         */
        dot(v: jsb.Vec2):number; // float
        /**
         * Computes the length of this vector.
         * 
         * return The length of the vector.
         * 
         * see lengthSquared
         */
        length():number; // float
        /**
         * Returns the squared length of this vector.
         * 
         * When it is not necessary to get the exact length of a
         * 
         * vector (for example, when simply comparing the lengths of
         * 
         * different vectors), it is advised to use this method
         * 
         * instead of length.
         * 
         * return The squared length of the vector.
         * 
         * see length
         */
        lengthSquared():number; // float
        /**
         * Negates this vector.
         */
        negate():void; // void
        /**
         * Normalizes this vector.
         * 
         * This method normalizes this Vec2 so that it is of
         * 
         * unit length (in other words, the length of the vector
         * 
         * after calling this method will be 1.0f). If the vector
         * 
         * already has unit length or if the length of the vector
         * 
         * is zero, this method does nothing.
         * 
         * return This vector, after the normalization occurs.
         */
        normalize():void; // void
        /**
         * Get the normalized vector.
         */
        getNormalized():jsb.Vec2; // cc::Vec2
        /**
         * Scales each element of this vector by the matching component of scale.
         * 
         * param scale The vector to scale by.
         */
        scale(scale: jsb.Vec2):void; // void
        /**
         * Scales all elements of this vector by the specified value.
         * 
         * param scalar The scalar value.
         */
        scale(scalar: number):void; // void
        /**
         * Complex multiplication of two points ("rotates" two points).
         * 
         * return Vec2 vector with an angle of this.getAngle() + other.getAngle(),
         * 
         * and a length of this.getLength() * other.getLength().
         * 
         * since v2.1.4
         */
        rotate(other: jsb.Vec2):jsb.Vec2; // cc::Vec2
        /**
         * Rotates this vector by angle (specified in radians) around the given point.
         * 
         * param point The point to rotate around.
         * 
         * param angle The angle to rotate by (in radians).
         */
        rotate(point: jsb.Vec2, angle: number):void; // void
        /**
         * Sets the elements of this vector from the values in the specified array.
         * 
         * param array An array containing the elements of the vector in the order x, y.
         */
        set(array: number):void; // void
        /**
         * Sets the elements of this vector to the specified values.
         * 
         * param xx The new x coordinate.
         * 
         * param yy The new y coordinate.
         */
        set(xx: number, yy: number):void; // void
        /**
         * Sets the elements of this vector to those in the specified vector.
         * 
         * param v The vector to copy.
         */
        set(v: jsb.Vec2):void; // void
        /**
         * Sets this vector to the directional vector between the specified points.
         * 
         * param p1 The first point.
         * 
         * param p2 The second point.
         */
        set(p1: jsb.Vec2, p2: jsb.Vec2):void; // void
        /**
         * Sets the elements of this vector to zero.
         */
        setZero():void; // void
        /**
         * Subtracts this vector and the specified vector as (this - v)
         * 
         * and stores the result in this vector.
         * 
         * param v The vector to subtract.
         */
        subtract(v: jsb.Vec2):void; // void
        /**
         * Updates this vector towards the given target using a smoothing function.
         * 
         * The given response time determines the amount of smoothing (lag). A longer
         * 
         * response time yields a smoother result and more lag. To force this vector to
         * 
         * follow the target closely, provide a response time that is very small relative
         * 
         * to the given elapsed time.
         * 
         * param target target value.
         * 
         * param elapsedTime elapsed time between calls.
         * 
         * param responseTime response time (in the same units as elapsedTime).
         */
        smooth(target: jsb.Vec2, elapsedTime: number, responseTime: number):void; // void
        setPoint(xx: number, yy: number):void; // void
        /**
         * js NA
         */
        equals(target: jsb.Vec2):boolean; // bool
        /**
         * @returns if points have fuzzy equality which means equal with some degree of variance.
         * 
         * since v2.1.4
         */
        fuzzyEquals(target: jsb.Vec2, variance: number):boolean; // bool
        /**
         * Calculates distance between point an origin
         * 
         * return float
         * 
         * since v2.1.4
         */
        getLength():number; // float
        /**
         * Calculates the square length of a Vec2 (not calling sqrt() )
         * 
         * return float
         * 
         * since v2.1.4
         */
        getLengthSq():number; // float
        /**
         * Calculates the square distance between two points (not calling sqrt() )
         * 
         * return float
         * 
         * since v2.1.4
         */
        getDistanceSq(other: jsb.Vec2):number; // float
        /**
         * Calculates the distance between two points
         * 
         * return float
         * 
         * since v2.1.4
         */
        getDistance(other: jsb.Vec2):number; // float
        /**
         * @returns the angle in radians between two vector directions
         * 
         * since v2.1.4
         */
        getAngle(other: jsb.Vec2):number; // float
        /**
         * @returns the angle in radians between this vector and the x axis
         * 
         * since v2.1.4
         */
        getAngle():number; // float
        /**
         * Calculates cross product of two points.
         * 
         * return float
         * 
         * since v2.1.4
         */
        cross(other: jsb.Vec2):number; // float
        /**
         * Calculates perpendicular of v, rotated 90 degrees counter-clockwise -- cross(v, perp(v)) >= 0
         * 
         * return Vec2
         * 
         * since v2.1.4
         */
        getPerp():jsb.Vec2; // cc::Vec2
        /**
         * Calculates midpoint between two points.
         * 
         * return Vec2
         * 
         * since v3.0
         */
        getMidpoint(other: jsb.Vec2):jsb.Vec2; // cc::Vec2
        /**
         * Clamp a point between from and to.
         * 
         * since v3.0
         */
        getClampPoint(min_inclusive: jsb.Vec2, max_inclusive: jsb.Vec2):jsb.Vec2; // cc::Vec2
        /**
         * Run a math operation function on each point component
         * 
         * absf, floorf, ceilf, roundf
         * 
         * any function that has the signature: float func(float);
         * 
         * For example: let's try to take the floor of x,y
         * 
         * p.compOp(floorf);
         * 
         * since v3.0
         */
        compOp(function_: AnyFunction):jsb.Vec2; // cc::Vec2
        /**
         * Calculates perpendicular of v, rotated 90 degrees clockwise -- cross(v, rperp(v)) <= 0
         * 
         * return Vec2
         * 
         * since v2.1.4
         */
        getRPerp():jsb.Vec2; // cc::Vec2
        /**
         * Calculates the projection of this over other.
         * 
         * return Vec2
         * 
         * since v2.1.4
         */
        project(other: jsb.Vec2):jsb.Vec2; // cc::Vec2
        /**
         * Unrotates two points.
         * 
         * return Vec2 vector with an angle of this.getAngle() - other.getAngle(),
         * 
         * and a length of this.getLength() * other.getLength().
         * 
         * since v2.1.4
         */
        unrotate(other: jsb.Vec2):jsb.Vec2; // cc::Vec2
        /**
         * Linear Interpolation between two points a and b
         * 
         * returns
         * 
         * alpha == 0 ? a
         * 
         * alpha == 1 ? b
         * 
         * otherwise a value between a..b
         * 
         * since v2.1.4
         */
        lerp(other: jsb.Vec2, alpha: number):jsb.Vec2; // cc::Vec2
        /**
         * Rotates a point counter clockwise by the angle around a pivot
         * 
         * param pivot is the pivot, naturally
         * 
         * param angle is the angle of rotation ccw in radians
         * 
         * returns the rotated point
         * 
         * since v2.1.4
         */
        rotateByAngle(pivot: jsb.Vec2, angle: number):jsb.Vec2; // cc::Vec2
    } // endof class Vec2
    
    
    // ts : jsb.OSInterface
    // cpp: cc::OSInterface
    export class OSInterface {
        // methods list
        /**
         * brief Dispatch event.
         * 
         * param type : Abstract event
         */
        dispatchEvent(ev: jsb.OSEvent):void; // void
        /**
         * brief Dispatch touch event.
         * 
         * param type : Touch event
         */
        dispatchTouchEvent(ev: jsb.TouchEvent):void; // void
    } // endof class OSInterface
    
    
    // ts : jsb.ICanvasGradient
    // cpp: cc::ICanvasGradient
    export class ICanvasGradient {
        // methods list
        addColorStop(offset: number, color: string):void; // void
    } // endof class ICanvasGradient
    
    
    // ts : jsb.ICanvasRenderingContext2D
    // cpp: cc::ICanvasRenderingContext2D
    export class ICanvasRenderingContext2D extends jsb.OSInterface {
        // attributes list
        width                   : number;   // float
        height                  : number;   // float
        fillStyle               : string;   // std::string
        font                    : string;   // std::string
        globalCompositeOperation: string;   // std::string
        lineCap                 : string;   // std::string
        lineJoin                : string;   // std::string
        lineWidth               : number;   // float
        strokeStyle             : string;   // std::string
        textAlign               : string;   // std::string
        textBaseline            : string;   // std::string
        // methods list
        rect(x: number, y: number, width: number, height: number):void; // void
        clearRect(x: number, y: number, width: number, height: number):void; // void
        fillRect(x: number, y: number, width: number, height: number):void; // void
        fillText(text: string, x: number, y: number, maxWidth: number):void; // void
        strokeText(text: string, x: number, y: number, maxWidth: number):void; // void
        measureText(text: string):jsb.Size; // cc::Size
        createLinearGradient(x0: number, y0: number, x1: number, y1: number):jsb.ICanvasGradient; // cc::ICanvasGradient*
        save():void; // void
        beginPath():void; // void
        closePath():void; // void
        moveTo(x: number, y: number):void; // void
        lineTo(x: number, y: number):void; // void
        fill():void; // void
        stroke():void; // void
        restore():void; // void
        setCanvasBufferUpdatedCallback(cb: AnyFunction):void; // void
        fillImageData(imageData: jsb.Data, imageWidth: number, imageHeight: number, offsetX: number, offsetY: number):void; // void
        translate(x: number, y: number):void; // void
        scale(x: number, y: number):void; // void
        rotate(angle: number):void; // void
        transform(a: number, b: number, c: number, d: number, e: number, f: number):void; // void
        setTransform(a: number, b: number, c: number, d: number, e: number, f: number):void; // void
        fetchData():void; // void
    } // endof class ICanvasRenderingContext2D
    
    
    // ts : jsb.CanvasGradient
    // cpp: cc::CanvasGradient
    export class CanvasGradient extends jsb.ICanvasGradient {
        // methods list
        constructor();
    } // endof class CanvasGradient
    
    
    // ts : jsb.CanvasRenderingContext2D
    // cpp: cc::CanvasRenderingContext2D
    export class CanvasRenderingContext2D extends jsb.ICanvasRenderingContext2D {
        // methods list
        constructor(width: number, height: number);
    } // endof class CanvasRenderingContext2D
    
    
    // ts : jsb.Device
    // cpp: cc::Device
    export class Device {
        // static methods list
        /**
         * Gets the DPI of device
         * 
         * return The DPI of device.
         */
        static getDPI():number; // int
        /**
         * Get device pixel ratio.
         */
        static getDevicePixelRatio():number; // float
        /**
         * To enable or disable accelerometer.
         */
        static setAccelerometerEnabled(isEnabled: boolean):void; // void
        /**
         * Sets the interval of accelerometer.
         */
        static setAccelerometerInterval(interval: number):void; // void
        /**
         * Gets the orientation of device.
         */
        static getDeviceOrientation():number; // cc::IScreen::Orientation
        /**
         * Gets device model information.
         */
        static getDeviceModel():string; // std::string
        /**
         * Controls whether the screen should remain on.
         * 
         * param keepScreenOn One flag indicating that the screen should remain on.
         */
        static setKeepScreenOn(keepScreenOn: boolean):void; // void
        /**
         * Vibrate for the specified amount of time.
         * 
         * If vibrate is not supported, then invoking this method has no effect.
         * 
         * Some platforms limit to a maximum duration of 5 seconds.
         * 
         * Duration is ignored on iOS due to API limitations.
         * 
         * param duration The duration in seconds.
         */
        static vibrate(duration: number):void; // void
        /**
         * Gets battery level, only avaiable on iOS and Android.
         * 
         * return 0.0 ~ 1.0
         */
        static getBatteryLevel():number; // float
        static getNetworkType():number; // cc::INetwork::NetworkType
        static getSafeAreaEdge():jsb.Vec4; // cc::Vec4
    } // endof class Device
    
    
    // ts : jsb.SAXParser
    // cpp: cc::SAXParser
    export class SAXParser {
        // methods list
        /**
         * js NA
         * 
         * lua NA
         */
        init(encoding: string):boolean; // bool
        /**
         * js NA
         * 
         * lua NA
         */
        parse(filename: string):boolean; // bool
        /**
         * js NA
         * 
         * lua NA
         */
        parse(xmlData: string, dataLength: number):boolean; // bool
        /**
         * js NA
         * 
         * lua NA
         */
        setDelegator(delegator: jsb.SAXDelegator):void; // void
    } // endof class SAXParser
    
    
    // ts : jsb.Color
    // cpp: cc::Color
    export class Color {
        // public_fields list
        r   : number;   // unsigned char
        g   : number;   // unsigned char
        b   : number;   // unsigned char
        a   : number;   // unsigned char
        // methods list
        constructor(r: number, g: number, b: number, a: number);
        constructor();
        constructor(src: string);
        constructor(val: number);
        constructor(p1: jsb.Color, p2: jsb.Color);
        /**
         * Sets the elements of this color from the values in the specified array.
         * 
         * param array An array containing the elements of the color in the order r, g, b, a.
         */
        set(array: string):void; // void
        /**
         * Sets the elements of this color to the specified values.
         * 
         * param xx The new x coordinate.
         * 
         * param yy The new y coordinate.
         * 
         * param zz The new z coordinate.
         * 
         * param ww The new w coordinate.
         */
        set(r: number, g: number, b: number, a: number):void; // void
        set(val: number):void; // void
        /**
         * Sets the elements of this color to those in the specified color.
         * 
         * param v The color to copy.
         */
        set(c: jsb.Color):void; // void
        /**
         * Sets this color to the directional color between the specified points.
         * 
         * param p1 The first point.
         * 
         * param p2 The second point.
         */
        set(p1: jsb.Color, p2: jsb.Color):void; // void
        toVec4():jsb.Vec4; // cc::Vec4
    } // endof class Color
    
    
    // ts : jsb.CCObject
    // cpp: cc::CCObject
    export class CCObject {
        // attributes list
        name        : string;   // std::string
        hideFlags   : number;   // cc::CCObject::Flags
        replicated  : boolean;  // bool
        isValid     : boolean;  // bool
        // public_fields list
        _objFlags   : number;   // cc::CCObject::Flags
        _name       : string;   // std::string
        // static methods list
        static deferredDestroy():void; // void
        // methods list
        constructor(name: string);
        /**
         * en
         * 
         * Destroy this Object, and release all its own references to other objects.
         * 
         * 
         * Actual object destruction will delayed until before rendering.
         * 
         * From the next frame, this object is not usable any more.
         * 
         * You can use `isValid(obj)` to check whether the object is destroyed before accessing it.
         * 
         * zh
         * 
         * 销毁该对象，并释放所有它对其它对象的引用。
         * 
         * 
         * 实际销毁操作会延迟到当前帧渲染前执行。从下一帧开始，该对象将不再可用。
         * 
         * 您可以在访问对象之前使用 `isValid(obj)` 来检查对象是否已被销毁。
         * 
         * return whether it is the first time the destroy being called
         * 
         * example
         * 
         * ```
         * 
         * obj.destroy();
         * 
         * ```
         */
        destroy():boolean; // bool
        /**
         * Clear all references in the instance.
         * 
         * NOTE: this method will not clear the getter or setter functions which defined in the instance of CCObject.
         * 
         * You can override the _destruct method if you need, for example:
         * 
         * _destruct: function () {
         * 
         * for (var key in this) {
         * 
         * if (hasOwnProperty(key)) {
         * 
         * switch (typeof this[key]) {
         * 
         * case 'string':
         * 
         * this[key] = '';
         * 
         * break;
         * 
         * case 'object':
         * 
         * case 'function':
         * 
         * this[key] = null;
         * 
         * break;
         * 
         * }
         * 
         * }
         * 
         * }
         */
        destroyImmediate():void; // void
        toString():string; // std::string
    } // endof class CCObject
    
    
    // ts : jsb.JSBNativeDataHolder
    // cpp: cc::JSBNativeDataHolder
    export class JSBNativeDataHolder {
        // methods list
        constructor(data: string);
        constructor();
        setData(data: string):void; // void
        getData():string; // unsigned char*
        destroy():void; // void
    } // endof class JSBNativeDataHolder
    
    
    // ts : jsb.DebugTextInfo
    // cpp: cc::DebugTextInfo
    export class DebugTextInfo {
        // public_fields list
        color           : gfx.Color;// cc::gfx::Color
        bold            : boolean;  // bool
        italic          : boolean;  // bool
        shadow          : boolean;  // bool
        shadowThickness : number;   // unsigned int
        shadowColor     : gfx.Color;// cc::gfx::Color
        scale           : number;   // float
        // methods list
        constructor();
    } // endof class DebugTextInfo
    
    
    // ts : jsb.DebugRenderer
    // cpp: cc::DebugRenderer
    export class DebugRenderer {
        // static methods list
        static getInstance():jsb.DebugRenderer; // cc::DebugRenderer*
        // methods list
        activate(device: gfx.Device, info: jsb.DebugRendererInfo):void; // void
        render(renderPass: gfx.RenderPass, cmdBuff: gfx.CommandBuffer, sceneData: nr.PipelineSceneData):void; // void
        destroy():void; // void
        addText(text: string, screenPos: jsb.Vec2, info: jsb.DebugTextInfo):void; // void
        addText(text: string, screenPos: jsb.Vec2):void; // void
    } // endof class DebugRenderer
    
    
    // ts : jsb.ShapeBase
    // cpp: cc::geometry::ShapeBase
    export class ShapeBase {
        // attributes list
        _type   : number;   // cc::geometry::ShapeEnum
    } // endof class ShapeBase
    
    
    // ts : jsb.AABB
    // cpp: cc::geometry::AABB
    export class AABB extends jsb.ShapeBase {
        // public_fields list
        center      : jsb.Vec3; // cc::Vec3
        halfExtents : jsb.Vec3; // cc::Vec3
        // static methods list
        /**
         * en
         * 
         * create a new AABB
         * 
         * zh
         * 
         * 创建一个新的 AABB 实例。
         * 
         * param px - AABB 的原点的 X 坐标。
         * 
         * param py - AABB 的原点的 Y 坐标。
         * 
         * param pz - AABB 的原点的 Z 坐标。
         * 
         * param hw - AABB 宽度的一半。
         * 
         * param hh - AABB 高度的一半。
         * 
         * param hl - AABB 长度的一半。
         * 
         * returns 返回新创建的 AABB 实例。
         */
        static create(px: number, py: number, pz: number, hw: number, hh: number, hl: number):jsb.AABB; // cc::geometry::AABB*
        /**
         * en
         * 
         * AABB to sphere
         * 
         * zh
         * 
         * 包围盒转包围球
         * 
         * param out 接受操作的 sphere。
         * 
         * param a 输入的 AABB。
         */
        static toBoundingSphere(out: jsb.Sphere, a: jsb.AABB):jsb.Sphere; // cc::geometry::Sphere*
        // methods list
        constructor();
        constructor(px: number, py: number, pz: number, hw: number, hh: number, hl: number);
        /**
         * en
         * 
         * aabb-plane intersect detect.
         * 
         * zh
         * 
         * 轴对齐包围盒和平面的相交性检测。
         * 
         * param {AABB} aabb 轴对齐包围盒
         * 
         * param {Plane} plane 平面
         * 
         * return {number} inside(back) = -1, outside(front) = 0, intersect = 1
         */
        aabbAabb(aabb: jsb.AABB):boolean; // bool
        /**
         * en
         * 
         * aabb-frustum intersect detect, faster but has false positive corner cases.
         * 
         * zh
         * 
         * 轴对齐包围盒和锥台相交性检测，速度快，但有错误情况。
         * 
         * param {AABB} aabb 轴对齐包围盒
         * 
         * param {Frustum} frustum 锥台
         * 
         * return {number} 0 或 非0
         */
        aabbFrustum(arg0: jsb.Frustum):boolean; // bool
        aabbPlane(arg0: jsb.Plane):number; // int
        getBoundary(minPos: jsb.Vec3, maxPos: jsb.Vec3):void; // void
        merge(point: jsb.Vec3):void; // void
        merge(aabb: jsb.AABB):void; // void
        merge(points: jsb.Vec3[]):void; // void
        merge(frustum: jsb.Frustum):void; // void
        set(centerVal: jsb.Vec3, halfExtentVal: jsb.Vec3):void; // void
        transform(m: jsb.Mat4, out: jsb.AABB):void; // void
        contain(point: jsb.Vec3):boolean; // bool
        setCenter(center: jsb.Vec3):void; // void
        setCenter(x: number, y: number, z: number):void; // void
        setValid(isValid: boolean):void; // void
        getCenter():jsb.Vec3; // cc::Vec3
        isValid():boolean; // bool
        setHalfExtents(halfExtents: jsb.Vec3):void; // void
        setHalfExtents(x: number, y: number, z: number):void; // void
        getHalfExtents():jsb.Vec3; // cc::Vec3
    } // endof class AABB
    
    
    // ts : jsb.Capsule
    // cpp: cc::geometry::Capsule
    export class Capsule extends jsb.ShapeBase {
        // methods list
        constructor(other: jsb.Capsule);
        constructor(radius: number, halfHeight: number, axis: number);
        /**
         * en
         * 
         * Transform this capsule.
         * 
         * zh
         * 
         * 变换此胶囊体。
         */
        transform(m: jsb.Mat4, pos: jsb.Vec3, rot: jsb.Quaternion, scale: jsb.Vec3, out: jsb.Capsule):void; // void
    } // endof class Capsule
    
    
    // ts : jsb.Plane
    // cpp: cc::geometry::Plane
    export class Plane extends jsb.ShapeBase {
        // public_fields list
        n   : jsb.Vec3; // cc::Vec3
        d   : number;   // float
        // static methods list
        /**
         * en
         * 
         * create a new plane
         * 
         * zh
         * 
         * 创建一个新的 plane。
         * 
         * param nx 法向分量的 x 部分。
         * 
         * param ny 法向分量的 y 部分。
         * 
         * param nz 法向分量的 z 部分。
         * 
         * param d 与原点的距离。
         * 
         * return
         */
        static create(nx: number, ny: number, nz: number, d: number):jsb.Plane; // cc::geometry::Plane*
        // methods list
        setX(val: number):void; // void
        getX():number; // float
        setY(val: number):void; // void
        getY():number; // float
        setZ(val: number):void; // void
        getZ():number; // float
        setW(val: number):void; // void
        getW():number; // float
        constructor();
        constructor(nx: number, ny: number, nz: number, d: number);
        /**
         * en
         * 
         * transform this plane.
         * 
         * zh
         * 
         * 变换一个平面。
         * 
         * param mat
         */
        transform(mat: jsb.Mat4):void; // void
        define(normal: jsb.Vec3, point: jsb.Vec3):void; // void
        define(v0: jsb.Vec3, v1: jsb.Vec3, v2: jsb.Vec3):void; // void
        distance(point: jsb.Vec3):number; // float
        clone():jsb.Plane; // cc::geometry::Plane
    } // endof class Plane
    
    
    // ts : jsb.Frustum
    // cpp: cc::geometry::Frustum
    export class Frustum extends jsb.ShapeBase {
        // public_fields list
        vertices: jsb.Vec3[];   // std::array<cc::Vec3, 8>
        planes  : jsb.Plane[];  // std::array<cc::geometry::Plane *, 6>
        // static methods list
        /**
         * en
         * 
         * Create a ortho frustum.
         * 
         * zh
         * 
         * 创建一个正交视锥体。
         * 
         * param out @en The result orthogonal frustum. @zh 输出的正交视锥体。
         * 
         * param width @en The width of the frustum. @zh 正交视锥体的宽度。
         * 
         * param height @en The height of the frustum. @zh 正交视锥体的高度。
         * 
         * param near @en The near plane of the frustum. @zh 正交视锥体的近平面值。
         * 
         * param far @en The far plane of the frustum. @zh 正交视锥体的远平面值。
         * 
         * param transform @en The transform matrix of the frustum. @zh 正交视锥体的变换矩阵。
         * 
         * return @en The out object @zh 返回正交视锥体.
         */
        static createOrtho(out: jsb.Frustum, width: number, height: number, near: number, far: number, transform: jsb.Mat4):void; // void
        /**
         * en Create a frustum from an AABB box.
         * 
         * zh 从 AABB 包围盒中创建一个视锥体。
         * 
         * param out @en The result frustum @zh 输出的视锥体对象。
         * 
         * param aabb @en The AABB bounding box of the frustum @zh AABB 包围盒。
         * 
         * return @en The out object @zh 返回视锥体.
         */
        static createFromAABB(out: jsb.Frustum, aabb: jsb.AABB):jsb.Frustum; // cc::geometry::Frustum*
        /**
         * en
         * 
         * Create a ccnew frustum.
         * 
         * zh
         * 
         * 创建一个新的截锥体。
         * 
         * return @en An empty frustum. @zh 一个空截椎体
         */
        static create():jsb.Frustum; // cc::geometry::Frustum*
        /**
         * en
         * 
         * Clone a frustum.
         * 
         * zh
         * 
         * 克隆一个截锥体。
         * 
         * param f @en The frustum to clone from @zh 用于克隆的截锥体
         * 
         * return @en The cloned frustum @zh 克隆出的新截锥体
         */
        static clone(f: jsb.Frustum):jsb.Frustum; // cc::geometry::Frustum*
        /**
         * en
         * 
         * Copy the values from one frustum to another.
         * 
         * zh
         * 
         * 从一个视锥体拷贝到另一个视锥体。
         * 
         * param out @en The result frustum @zh 用于存储拷贝数据的截锥体
         * 
         * param f @en The frustum to copy from @zh 用于克隆的截锥体
         * 
         * return @en The out object @zh 传入的 out 对象
         */
        static copy(out: jsb.Frustum, f: jsb.Frustum):jsb.Frustum; // cc::geometry::Frustum*
        // methods list
        constructor();
        /**
         * en
         * 
         * Transform this frustum.
         * 
         * zh
         * 
         * 变换此截锥体。
         * 
         * param mat 变换矩阵。
         */
        transform(arg0: jsb.Mat4):void; // void
        createOrtho(width: number, height: number, near: number, far: number, transform: jsb.Mat4):void; // void
        split(start: number, end: number, aspect: number, fov: number, transform: jsb.Mat4):void; // void
        updatePlanes():void; // void
        update(m: jsb.Mat4, inv: jsb.Mat4):void; // void
        /**
         * en
         * 
         * Set whether to use accurate intersection testing function on this frustum.
         * 
         * zh
         * 
         * 设置是否在此截锥体上使用精确的相交测试函数。
         */
        setAccurate(accurate: boolean):void; // void
    } // endof class Frustum
    
    
    // ts : jsb.Line
    // cpp: cc::geometry::Line
    export class Line extends jsb.ShapeBase {
        // static methods list
        /**
         * en
         * 
         * create a new line
         * 
         * zh
         * 
         * 创建一个新的 line。
         * 
         * param sx 起点的 x 部分。
         * 
         * param sy 起点的 y 部分。
         * 
         * param sz 起点的 z 部分。
         * 
         * param ex 终点的 x 部分。
         * 
         * param ey 终点的 y 部分。
         * 
         * param ez 终点的 z 部分。
         * 
         * return
         */
        static create(sx: number, sy: number, sz: number, ex: number, ey: number, ez: number):jsb.Line; // cc::geometry::Line*
        /**
         * en
         * 
         * Creates a new Line initialized with values from an existing Line
         * 
         * zh
         * 
         * 克隆一个新的 line。
         * 
         * param a 克隆的来源。
         * 
         * return 克隆出的对象。
         */
        static clone(a: jsb.Line):jsb.Line; // cc::geometry::Line*
        /**
         * en
         * 
         * Copy the values from one Line to another
         * 
         * zh
         * 
         * 复制一个线的值到另一个。
         * 
         * param out 接受操作的对象。
         * 
         * param a 复制的来源。
         * 
         * return 接受操作的对象。
         */
        static copy(out: jsb.Line, a: jsb.Line):jsb.Line; // cc::geometry::Line*
        /**
         * en
         * 
         * create a line from two points
         * 
         * zh
         * 
         * 用两个点创建一个线。
         * 
         * param out 接受操作的对象。
         * 
         * param start 起点。
         * 
         * param end 终点。
         * 
         * return out 接受操作的对象。
         */
        static fromPoints(out: jsb.Line, start: jsb.Vec3, end: jsb.Vec3):jsb.Line; // cc::geometry::Line*
        /**
         * en
         * 
         * Set the components of a Vec3 to the given values
         * 
         * zh
         * 
         * 将给定线的属性设置为给定值。
         * 
         * param out 接受操作的对象。
         * 
         * param sx 起点的 x 部分。
         * 
         * param sy 起点的 y 部分。
         * 
         * param sz 起点的 z 部分。
         * 
         * param ex 终点的 x 部分。
         * 
         * param ey 终点的 y 部分。
         * 
         * param ez 终点的 z 部分。
         * 
         * return out 接受操作的对象。
         */
        static set(out: jsb.Line, sx: number, sy: number, sz: number, ex: number, ey: number, ez: number):jsb.Line; // cc::geometry::Line*
        /**
         * zh
         * 
         * 计算线的长度。
         * 
         * param a 要计算的线。
         * 
         * return 长度。
         */
        static len(a: jsb.Line):number; // float
        // methods list
        constructor(arg0: jsb.Line);
        constructor(sx: number, sy: number, sz: number, ex: number, ey: number, ez: number);
        /**
         * zh
         * 
         * 计算线的长度。
         * 
         * param a 要计算的线。
         * 
         * return 长度。
         */
        length():number; // float
    } // endof class Line
    
    
    // ts : jsb.Ray
    // cpp: cc::geometry::Ray
    export class Ray extends jsb.ShapeBase {
        // static methods list
        /**
         * en
         * 
         * create a new ray
         * 
         * zh
         * 
         * 创建一条射线。
         * 
         * param {number} ox 起点的 x 部分。
         * 
         * param {number} oy 起点的 y 部分。
         * 
         * param {number} oz 起点的 z 部分。
         * 
         * param {number} dx 方向的 x 部分。
         * 
         * param {number} dy 方向的 y 部分。
         * 
         * param {number} dz 方向的 z 部分。
         * 
         * return {Ray} 射线。
         */
        static create():jsb.Ray; // cc::geometry::Ray*
        static create(ox: number):jsb.Ray; // cc::geometry::Ray*
        static create(ox: number, oy: number):jsb.Ray; // cc::geometry::Ray*
        static create(ox: number, oy: number, oz: number):jsb.Ray; // cc::geometry::Ray*
        static create(ox: number, oy: number, oz: number, dx: number):jsb.Ray; // cc::geometry::Ray*
        static create(ox: number, oy: number, oz: number, dx: number, dy: number):jsb.Ray; // cc::geometry::Ray*
        static create(ox: number, oy: number, oz: number, dx: number, dy: number, dz: number):jsb.Ray; // cc::geometry::Ray*
        /**
         * en
         * 
         * Creates a new ray initialized with values from an existing ray
         * 
         * zh
         * 
         * 从一条射线克隆出一条新的射线。
         * 
         * param {Ray} a 克隆的目标。
         * 
         * return {Ray} 克隆出的新对象。
         */
        static clone(a: jsb.Ray):jsb.Ray; // cc::geometry::Ray*
        /**
         * en
         * 
         * Copy the values from one ray to another
         * 
         * zh
         * 
         * 将从一个 ray 的值复制到另一个 ray。
         * 
         * param {Ray} out 接受操作的 ray。
         * 
         * param {Ray} a 被复制的 ray。
         * 
         * return {Ray} out 接受操作的 ray。
         */
        static copy(out: jsb.Ray, a: jsb.Ray):jsb.Ray; // cc::geometry::Ray*
        /**
         * en
         * 
         * create a ray from two points
         * 
         * zh
         * 
         * 用两个点创建一条射线。
         * 
         * param {Ray} out 接受操作的射线。
         * 
         * param {Vec3} origin 射线的起点。
         * 
         * param {Vec3} target 射线上的一点。
         * 
         * return {Ray} out 接受操作的射线。
         */
        static fromPoints(out: jsb.Ray, origin: jsb.Vec3, target: jsb.Vec3):jsb.Ray; // cc::geometry::Ray*
        /**
         * en
         * 
         * Set the components of a ray to the given values
         * 
         * zh
         * 
         * 将给定射线的属性设置为给定的值。
         * 
         * param {Ray} out 接受操作的射线。
         * 
         * param {number} ox 起点的 x 部分。
         * 
         * param {number} oy 起点的 y 部分。
         * 
         * param {number} oz 起点的 z 部分。
         * 
         * param {number} dx 方向的 x 部分。
         * 
         * param {number} dy 方向的 y 部分。
         * 
         * param {number} dz 方向的 z 部分。
         * 
         * return {Ray} out 接受操作的射线。
         */
        static set(out: jsb.Ray, ox: number, oy: number, oz: number, dx: number, dy: number, dz: number):jsb.Ray; // cc::geometry::Ray*
        // methods list
        constructor(arg0: jsb.Ray);
        constructor(ox: number, oy: number, oz: number, dx: number, dy: number, dz: number);
        /**
         * en
         * 
         * Compute a point with the distance between the origin.
         * 
         * zh
         * 
         * 根据给定距离计算出射线上的一点。
         * 
         * param out 射线上的另一点。
         * 
         * param distance 给定距离。
         */
        computeHit(out: jsb.Vec3, distance: number):void; // void
    } // endof class Ray
    
    
    // ts : jsb.Sphere
    // cpp: cc::geometry::Sphere
    export class Sphere extends jsb.ShapeBase {
        // static methods list
        /**
         * en
         * 
         * create a new sphere
         * 
         * zh
         * 
         * 创建一个新的 sphere 实例。
         * 
         * param cx 形状的相对于原点的 X 坐标。
         * 
         * param cy 形状的相对于原点的 Y 坐标。
         * 
         * param cz 形状的相对于原点的 Z 坐标。
         * 
         * param r 球体的半径
         * 
         * return {Sphere} 返回一个 sphere。
         */
        static create(cx: number, cy: number, cz: number, radius: number):jsb.Sphere; // cc::geometry::Sphere*
        /**
         * en
         * 
         * clone a new sphere
         * 
         * zh
         * 
         * 克隆一个新的 sphere 实例。
         * 
         * param {Sphere} p 克隆的目标。
         * 
         * return {Sphere} 克隆出的示例。
         */
        static clone(p: jsb.Sphere):jsb.Sphere; // cc::geometry::Sphere*
        /**
         * en
         * 
         * copy the values from one sphere to another
         * 
         * zh
         * 
         * 将从一个 sphere 的值复制到另一个 sphere。
         * 
         * param {Sphere} out 接受操作的 sphere。
         * 
         * param {Sphere} a 被复制的 sphere。
         * 
         * return {Sphere} out 接受操作的 sphere。
         */
        static copy(out: jsb.Sphere, p: jsb.Sphere):jsb.Sphere; // cc::geometry::Sphere*
        /**
         * en
         * 
         * create a new bounding sphere from two corner points
         * 
         * zh
         * 
         * 从两个点创建一个新的 sphere。
         * 
         * param out - 接受操作的 sphere。
         * 
         * param minPos - sphere 的最小点。
         * 
         * param maxPos - sphere 的最大点。
         * 
         * returns {Sphere} out 接受操作的 sphere。
         */
        static fromPoints(out: jsb.Sphere, minPos: jsb.Vec3, maxPos: jsb.Vec3):jsb.Sphere; // cc::geometry::Sphere*
        /**
         * en
         * 
         * Set the components of a sphere to the given values
         * 
         * zh
         * 
         * 将球体的属性设置为给定的值。
         * 
         * param {Sphere} out 接受操作的 sphere。
         * 
         * param cx 形状的相对于原点的 X 坐标。
         * 
         * param cy 形状的相对于原点的 Y 坐标。
         * 
         * param cz 形状的相对于原点的 Z 坐标。
         * 
         * param {number} r 半径。
         * 
         * return {Sphere} out 接受操作的 sphere。
         * 
         * function
         */
        static set(out: jsb.Sphere, cx: number, cy: number, cz: number, r: number):jsb.Sphere; // cc::geometry::Sphere*
        /**
         * zh
         * 
         * 球跟点合并
         */
        static mergePoint(out: jsb.Sphere, s: jsb.Sphere, point: jsb.Vec3):jsb.Sphere; // cc::geometry::Sphere*
        /**
         * zh
         * 
         * 球跟立方体合并
         */
        static mergeAABB(out: jsb.Sphere, s: jsb.Sphere, a: jsb.AABB):jsb.Sphere; // cc::geometry::Sphere*
        // methods list
        constructor(cx: number, cy: number, cz: number, radius: number);
        getRadius():number; // float
        getCenter():jsb.Vec3; // cc::Vec3
        setCenter(val: jsb.Vec3):void; // void
        setRadius(val: number):void; // void
        clone():jsb.Sphere; // cc::geometry::Sphere*
        copy(out: jsb.Sphere):jsb.Sphere; // cc::geometry::Sphere*
        define(aabb: jsb.AABB):void; // void
        mergeAABB(aabb: jsb.AABB):void; // void
        mergePoint(point: jsb.Vec3):void; // void
        mergeFrustum(frustum: jsb.Frustum):void; // void
        merge(point: jsb.Vec3):void; // void
        merge(aabb: jsb.AABB):void; // void
        merge(points: jsb.Vec3[]):void; // void
        merge(frustum: jsb.Frustum):void; // void
        interset(plane: jsb.Plane):number; // int
        interset(frustum: jsb.Frustum):boolean; // bool
        spherePlane(plane: jsb.Plane):number; // int
        sphereFrustum(frustum: jsb.Frustum):boolean; // bool
        /**
         * en
         * 
         * Get the bounding points of this shape
         * 
         * zh
         * 
         * 获取此形状的边界点。
         * 
         * param {Vec3} minPos 最小点。
         * 
         * param {Vec3} maxPos 最大点。
         */
        getBoundary(minPos: jsb.Vec3, maxPos: jsb.Vec3):void; // void
        /**
         * en
         * 
         * Transform this shape
         * 
         * zh
         * 
         * 将 out 根据这个 sphere 的数据进行变换。
         * 
         * param m 变换的矩阵。
         * 
         * param pos 变换的位置部分。
         * 
         * param rot 变换的旋转部分。
         * 
         * param scale 变换的缩放部分。
         * 
         * param out 变换的目标。
         */
        transform(m: jsb.Mat4, arg1: jsb.Vec3, arg2: jsb.Quaternion, scale: jsb.Vec3, out: jsb.Sphere):void; // void
        /**
         * en
         * 
         * Translate and rotate this sphere.
         * 
         * zh
         * 
         * 将 out 根据这个 sphere 的数据进行变换。
         * 
         * param m 变换的矩阵。
         * 
         * param rot 变换的旋转部分。
         * 
         * param out 变换的目标。
         */
        translateAndRotate(m: jsb.Mat4, arg1: jsb.Quaternion, out: jsb.Sphere):void; // void
        /**
         * en
         * 
         * Scaling this sphere.
         * 
         * zh
         * 
         * 将 out 根据这个 sphere 的数据进行缩放。
         * 
         * param scale 缩放值。
         * 
         * param out 缩放的目标。
         */
        setScale(scale: jsb.Vec3, out: jsb.Sphere):void; // void
    } // endof class Sphere
    
    
    // ts : jsb.Spline
    // cpp: cc::geometry::Spline
    export class Spline extends jsb.ShapeBase {
        // attributes list
        mode    : number;       // cc::geometry::SplineMode
        knots   : jsb.Vec3[];   // std::vector<cc::Vec3>
        // static methods list
        static create(mode: number, knots: jsb.Vec3[]):jsb.Spline; // cc::geometry::Spline*
        static clone(s: jsb.Spline):jsb.Spline; // cc::geometry::Spline*
        static copy(out: jsb.Spline, s: jsb.Spline):jsb.Spline; // cc::geometry::Spline*
        // methods list
        constructor(arg0: jsb.Spline);
        constructor(mode: number, knots: jsb.Vec3[]);
        clearKnots():void; // void
        getKnotCount():number; // unsigned int
        addKnot(knot: jsb.Vec3):void; // void
        setModeAndKnots(mode: number, knots: jsb.Vec3[]):void; // void
        insertKnot(index: number, knot: jsb.Vec3):void; // void
        removeKnot(index: number):void; // void
        setKnot(index: number, knot: jsb.Vec3):void; // void
        getKnot(index: number):jsb.Vec3; // cc::Vec3
        getPoint(t: number):jsb.Vec3; // cc::Vec3
        getPoint(t: number, index: number):jsb.Vec3; // cc::Vec3
        getPoints(num: number):jsb.Vec3[]; // std::vector<cc::Vec3>
        getPoints(num: number, index: number):jsb.Vec3[]; // std::vector<cc::Vec3>
    } // endof class Spline
    
    
    // ts : jsb.Triangle
    // cpp: cc::geometry::Triangle
    export class Triangle extends jsb.ShapeBase {
        // static methods list
        /**
         * en
         * 
         * create a new triangle
         * 
         * zh
         * 
         * 创建一个新的 triangle。
         * 
         * param {number} ax a 点的 x 部分。
         * 
         * param {number} ay a 点的 y 部分。
         * 
         * param {number} az a 点的 z 部分。
         * 
         * param {number} bx b 点的 x 部分。
         * 
         * param {number} by b 点的 y 部分。
         * 
         * param {number} bz b 点的 z 部分。
         * 
         * param {number} cx c 点的 x 部分。
         * 
         * param {number} cy c 点的 y 部分。
         * 
         * param {number} cz c 点的 z 部分。
         * 
         * return {Triangle} 一个新的 triangle。
         */
        static create():jsb.Triangle; // cc::geometry::Triangle*
        static create(ax: number):jsb.Triangle; // cc::geometry::Triangle*
        static create(ax: number, ay: number):jsb.Triangle; // cc::geometry::Triangle*
        static create(ax: number, ay: number, az: number):jsb.Triangle; // cc::geometry::Triangle*
        static create(ax: number, ay: number, az: number, bx: number):jsb.Triangle; // cc::geometry::Triangle*
        static create(ax: number, ay: number, az: number, bx: number, by: number):jsb.Triangle; // cc::geometry::Triangle*
        static create(ax: number, ay: number, az: number, bx: number, by: number, bz: number):jsb.Triangle; // cc::geometry::Triangle*
        static create(ax: number, ay: number, az: number, bx: number, by: number, bz: number, cx: number):jsb.Triangle; // cc::geometry::Triangle*
        static create(ax: number, ay: number, az: number, bx: number, by: number, bz: number, cx: number, cy: number):jsb.Triangle; // cc::geometry::Triangle*
        static create(ax: number, ay: number, az: number, bx: number, by: number, bz: number, cx: number, cy: number, cz: number):jsb.Triangle; // cc::geometry::Triangle*
        /**
         * en
         * 
         * clone a new triangle
         * 
         * zh
         * 
         * 克隆一个新的 triangle。
         * 
         * param {Triangle} t 克隆的目标。
         * 
         * return {Triangle} 克隆出的新对象。
         */
        static clone(t: jsb.Triangle):jsb.Triangle; // cc::geometry::Triangle*
        /**
         * en
         * 
         * copy the values from one triangle to another
         * 
         * zh
         * 
         * 将一个 triangle 的值复制到另一个 triangle。
         * 
         * param {Triangle} out 接受操作的 triangle。
         * 
         * param {Triangle} t 被复制的 triangle。
         * 
         * return {Triangle} out 接受操作的 triangle。
         */
        static copy(out: jsb.Triangle, t: jsb.Triangle):jsb.Triangle; // cc::geometry::Triangle*
        /**
         * en
         * 
         * Create a triangle from three points
         * 
         * zh
         * 
         * 用三个点创建一个 triangle。
         * 
         * param {Triangle} out 接受操作的 triangle。
         * 
         * param {Vec3} a a 点。
         * 
         * param {Vec3} b b 点。
         * 
         * param {Vec3} c c 点。
         * 
         * return {Triangle} out 接受操作的 triangle。
         */
        static fromPoints(out: jsb.Triangle, a: jsb.Vec3, b: jsb.Vec3, c: jsb.Vec3):jsb.Triangle; // cc::geometry::Triangle*
        /**
         * en
         * 
         * Set the components of a triangle to the given values
         * 
         * zh
         * 
         * 将给定三角形的属性设置为给定值。
         * 
         * param {Triangle} out 给定的三角形。
         * 
         * param {number} ax a 点的 x 部分。
         * 
         * param {number} ay a 点的 y 部分。
         * 
         * param {number} az a 点的 z 部分。
         * 
         * param {number} bx b 点的 x 部分。
         * 
         * param {number} by b 点的 y 部分。
         * 
         * param {number} bz b 点的 z 部分。
         * 
         * param {number} cx c 点的 x 部分。
         * 
         * param {number} cy c 点的 y 部分。
         * 
         * param {number} cz c 点的 z 部分。
         * 
         * return {Triangle}
         * 
         * function
         */
        static set(out: jsb.Triangle, ax: number, ay: number, az: number, bx: number, by: number, bz: number, cx: number, cy: number, cz: number):jsb.Triangle; // cc::geometry::Triangle*
        // methods list
        constructor(arg0: jsb.Triangle);
        constructor(ax: number, ay: number, az: number, bx: number, by: number, bz: number, cx: number, cy: number, cz: number);
    } // endof class Triangle
    
    
    // ts : jsb.RevoluteJoint
    // cpp: cc::physics::RevoluteJoint
    export class RevoluteJoint {
        // methods list
        constructor();
        initialize(node: jsb.Node):void; // void
        onEnable():void; // void
        onDisable():void; // void
        onDestroy():void; // void
        setEnableCollision(v: boolean):void; // void
        setConnectedBody(rigidBodyID: number):void; // void
        getObjectID():number; // unsigned int
        setPivotA(x: number, y: number, z: number):void; // void
        setPivotB(x: number, y: number, z: number):void; // void
        setAxis(x: number, y: number, z: number):void; // void
    } // endof class RevoluteJoint
    
    
    // ts : jsb.DistanceJoint
    // cpp: cc::physics::DistanceJoint
    export class DistanceJoint {
        // methods list
        constructor();
        initialize(node: jsb.Node):void; // void
        onEnable():void; // void
        onDisable():void; // void
        onDestroy():void; // void
        setEnableCollision(v: boolean):void; // void
        setConnectedBody(rigidBodyID: number):void; // void
        getObjectID():number; // unsigned int
        setPivotA(x: number, y: number, z: number):void; // void
        setPivotB(x: number, y: number, z: number):void; // void
    } // endof class DistanceJoint
    
    
    // ts : jsb.RigidBody
    // cpp: cc::physics::RigidBody
    export class RigidBody {
        // methods list
        constructor();
        initialize(node: jsb.Node, t: number, g: number):void; // void
        onEnable():void; // void
        onDisable():void; // void
        onDestroy():void; // void
        isAwake():boolean; // bool
        isSleepy():boolean; // bool
        isSleeping():boolean; // bool
        setType(v: number):void; // void
        setMass(v: number):void; // void
        setLinearDamping(v: number):void; // void
        setAngularDamping(v: number):void; // void
        useGravity(v: boolean):void; // void
        useCCD(v: boolean):void; // void
        setLinearFactor(x: number, y: number, z: number):void; // void
        setAngularFactor(x: number, y: number, z: number):void; // void
        setAllowSleep(v: boolean):void; // void
        wakeUp():void; // void
        sleep():void; // void
        clearState():void; // void
        clearForces():void; // void
        clearVelocity():void; // void
        setSleepThreshold(v: number):void; // void
        getSleepThreshold():number; // float
        getLinearVelocity():jsb.Vec3; // cc::Vec3
        setLinearVelocity(x: number, y: number, z: number):void; // void
        getAngularVelocity():jsb.Vec3; // cc::Vec3
        setAngularVelocity(x: number, y: number, z: number):void; // void
        applyForce(x: number, y: number, z: number, rx: number, ry: number, rz: number):void; // void
        applyLocalForce(x: number, y: number, z: number, rx: number, ry: number, rz: number):void; // void
        applyImpulse(x: number, y: number, z: number, rx: number, ry: number, rz: number):void; // void
        applyLocalImpulse(x: number, y: number, z: number, rx: number, ry: number, rz: number):void; // void
        applyTorque(x: number, y: number, z: number):void; // void
        applyLocalTorque(x: number, y: number, z: number):void; // void
        getGroup():number; // unsigned int
        setGroup(g: number):void; // void
        getMask():number; // unsigned int
        setMask(m: number):void; // void
        getObjectID():number; // unsigned int
    } // endof class RigidBody
    
    
    // ts : jsb.SphereShape
    // cpp: cc::physics::SphereShape
    export class SphereShape {
        // methods list
        constructor();
        initialize(node: jsb.Node):void; // void
        onEnable():void; // void
        onDisable():void; // void
        onDestroy():void; // void
        setMaterial(ID: number, f: number, df: number, r: number, m0: number, m1: number):void; // void
        setAsTrigger(v: boolean):void; // void
        setCenter(x: number, y: number, z: number):void; // void
        updateEventListener(v: number):void; // void
        getAABB():jsb.AABB; // cc::geometry::AABB
        getBoundingSphere():jsb.Sphere; // cc::geometry::Sphere
        getGroup():number; // unsigned int
        setGroup(g: number):void; // void
        getMask():number; // unsigned int
        setMask(m: number):void; // void
        getObjectID():number; // unsigned int
        setRadius(v: number):void; // void
    } // endof class SphereShape
    
    
    // ts : jsb.BoxShape
    // cpp: cc::physics::BoxShape
    export class BoxShape {
        // methods list
        constructor();
        initialize(node: jsb.Node):void; // void
        onEnable():void; // void
        onDisable():void; // void
        onDestroy():void; // void
        setMaterial(ID: number, f: number, df: number, r: number, m0: number, m1: number):void; // void
        setAsTrigger(v: boolean):void; // void
        setCenter(x: number, y: number, z: number):void; // void
        updateEventListener(v: number):void; // void
        getAABB():jsb.AABB; // cc::geometry::AABB
        getBoundingSphere():jsb.Sphere; // cc::geometry::Sphere
        getGroup():number; // unsigned int
        setGroup(g: number):void; // void
        getMask():number; // unsigned int
        setMask(m: number):void; // void
        getObjectID():number; // unsigned int
        setSize(x: number, y: number, z: number):void; // void
    } // endof class BoxShape
    
    
    // ts : jsb.CapsuleShape
    // cpp: cc::physics::CapsuleShape
    export class CapsuleShape {
        // methods list
        constructor();
        initialize(node: jsb.Node):void; // void
        onEnable():void; // void
        onDisable():void; // void
        onDestroy():void; // void
        setMaterial(ID: number, f: number, df: number, r: number, m0: number, m1: number):void; // void
        setAsTrigger(v: boolean):void; // void
        setCenter(x: number, y: number, z: number):void; // void
        updateEventListener(v: number):void; // void
        getAABB():jsb.AABB; // cc::geometry::AABB
        getBoundingSphere():jsb.Sphere; // cc::geometry::Sphere
        getGroup():number; // unsigned int
        setGroup(g: number):void; // void
        getMask():number; // unsigned int
        setMask(m: number):void; // void
        getObjectID():number; // unsigned int
        setRadius(v: number):void; // void
        setCylinderHeight(v: number):void; // void
        setDirection(v: number):void; // void
    } // endof class CapsuleShape
    
    
    // ts : jsb.PlaneShape
    // cpp: cc::physics::PlaneShape
    export class PlaneShape {
        // methods list
        constructor();
        initialize(node: jsb.Node):void; // void
        onEnable():void; // void
        onDisable():void; // void
        onDestroy():void; // void
        setMaterial(ID: number, f: number, df: number, r: number, m0: number, m1: number):void; // void
        setAsTrigger(v: boolean):void; // void
        setCenter(x: number, y: number, z: number):void; // void
        updateEventListener(v: number):void; // void
        getAABB():jsb.AABB; // cc::geometry::AABB
        getBoundingSphere():jsb.Sphere; // cc::geometry::Sphere
        getGroup():number; // unsigned int
        setGroup(g: number):void; // void
        getMask():number; // unsigned int
        setMask(m: number):void; // void
        getObjectID():number; // unsigned int
        setConstant(v: number):void; // void
        setNormal(x: number, y: number, z: number):void; // void
    } // endof class PlaneShape
    
    
    // ts : jsb.TrimeshShape
    // cpp: cc::physics::TrimeshShape
    export class TrimeshShape {
        // methods list
        constructor();
        initialize(node: jsb.Node):void; // void
        onEnable():void; // void
        onDisable():void; // void
        onDestroy():void; // void
        setMaterial(ID: number, f: number, df: number, r: number, m0: number, m1: number):void; // void
        setAsTrigger(v: boolean):void; // void
        setCenter(x: number, y: number, z: number):void; // void
        updateEventListener(v: number):void; // void
        getAABB():jsb.AABB; // cc::geometry::AABB
        getBoundingSphere():jsb.Sphere; // cc::geometry::Sphere
        getGroup():number; // unsigned int
        setGroup(g: number):void; // void
        getMask():number; // unsigned int
        setMask(m: number):void; // void
        getObjectID():number; // unsigned int
        setMesh(objectID: number):void; // void
        useConvex(v: boolean):void; // void
    } // endof class TrimeshShape
    
    
    // ts : jsb.CylinderShape
    // cpp: cc::physics::CylinderShape
    export class CylinderShape {
        // methods list
        constructor();
        initialize(node: jsb.Node):void; // void
        onEnable():void; // void
        onDisable():void; // void
        onDestroy():void; // void
        setMaterial(ID: number, f: number, df: number, r: number, m0: number, m1: number):void; // void
        setAsTrigger(v: boolean):void; // void
        setCenter(x: number, y: number, z: number):void; // void
        updateEventListener(v: number):void; // void
        getAABB():jsb.AABB; // cc::geometry::AABB
        getBoundingSphere():jsb.Sphere; // cc::geometry::Sphere
        getGroup():number; // unsigned int
        setGroup(g: number):void; // void
        getMask():number; // unsigned int
        setMask(m: number):void; // void
        getObjectID():number; // unsigned int
        setConvex(objectID: number):void; // void
        setCylinder(r: number, h: number, d: number):void; // void
    } // endof class CylinderShape
    
    
    // ts : jsb.ConeShape
    // cpp: cc::physics::ConeShape
    export class ConeShape {
        // methods list
        constructor();
        initialize(node: jsb.Node):void; // void
        onEnable():void; // void
        onDisable():void; // void
        onDestroy():void; // void
        setMaterial(ID: number, f: number, df: number, r: number, m0: number, m1: number):void; // void
        setAsTrigger(v: boolean):void; // void
        setCenter(x: number, y: number, z: number):void; // void
        updateEventListener(v: number):void; // void
        getAABB():jsb.AABB; // cc::geometry::AABB
        getBoundingSphere():jsb.Sphere; // cc::geometry::Sphere
        getGroup():number; // unsigned int
        setGroup(g: number):void; // void
        getMask():number; // unsigned int
        setMask(m: number):void; // void
        getObjectID():number; // unsigned int
        setConvex(objectID: number):void; // void
        setCone(r: number, h: number, d: number):void; // void
    } // endof class ConeShape
    
    
    // ts : jsb.TerrainShape
    // cpp: cc::physics::TerrainShape
    export class TerrainShape {
        // methods list
        constructor();
        initialize(node: jsb.Node):void; // void
        onEnable():void; // void
        onDisable():void; // void
        onDestroy():void; // void
        setMaterial(ID: number, f: number, df: number, r: number, m0: number, m1: number):void; // void
        setAsTrigger(v: boolean):void; // void
        setCenter(x: number, y: number, z: number):void; // void
        updateEventListener(v: number):void; // void
        getAABB():jsb.AABB; // cc::geometry::AABB
        getBoundingSphere():jsb.Sphere; // cc::geometry::Sphere
        getGroup():number; // unsigned int
        setGroup(g: number):void; // void
        getMask():number; // unsigned int
        setMask(m: number):void; // void
        getObjectID():number; // unsigned int
        setTerrain(objectID: number, rs: number, cs: number, hs: number):void; // void
    } // endof class TerrainShape
    
    
    // ts : jsb.World
    // cpp: cc::physics::World
    export class World {
        // methods list
        constructor();
        setGravity(x: number, y: number, z: number):void; // void
        setAllowSleep(v: boolean):void; // void
        step(fixedTimeStep: number):void; // void
        emitEvents():void; // void
        syncSceneToPhysics():void; // void
        syncSceneWithCheck():void; // void
        setCollisionMatrix(i: number, m: number):void; // void
        getTriggerEventPairs():cc.physics.TriggerEventPair[]; // std::vector<std::shared_ptr<cc::physics::TriggerEventPair>>
        getContactEventPairs():cc.physics.ContactEventPair[]; // std::vector<std::shared_ptr<cc::physics::ContactEventPair>>
        raycast(opt: jsb.RaycastOptions):boolean; // bool
        raycastClosest(opt: jsb.RaycastOptions):boolean; // bool
        raycastResult():cc.physics.RaycastResult[]; // std::vector<cc::physics::RaycastResult>
        raycastClosestResult():jsb.RaycastResult; // cc::physics::RaycastResult
        createConvex(desc: jsb.ConvexDesc):number; // unsigned int
        createTrimesh(desc: jsb.TrimeshDesc):number; // unsigned int
        createHeightField(desc: jsb.HeightFieldDesc):number; // unsigned int
        createMaterial(id: number, f: number, df: number, r: number, m0: number, m1: number):boolean; // bool
        destroy():void; // void
    } // endof class World
    
    
    // ts : jsb.BaseNode
    // cpp: cc::BaseNode
    export class BaseNode extends jsb.CCObject {
    } // endof class BaseNode
    
    
    // ts : jsb.Node
    // cpp: cc::Node
    export class Node extends jsb.BaseNode {
        // attributes list
        uuid            : string;   // std::string
        angle           : number;   // float
        matrix          : jsb.Mat4; // cc::Mat4
        hasChangedFlags : number;   // unsigned int
        _persistNode    : boolean;  // bool
        // public_fields list
        _id             : string;   // std::string
        _parentInternal : jsb.Node; // cc::Node*
        // static methods list
        static instantiate(cloned: jsb.Node, isSyncedNode: boolean):jsb.Node; // cc::Node*
        static setScene(arg0: jsb.Node):void; // void
        static resetChangedFlags():void; // void
        static clearNodeArray():void; // void
        // methods list
        constructor(name: string);
        constructor();
        onPostActivated(active: boolean):void; // void
        setParent(parent: jsb.Node):void; // void
        setParent(parent: jsb.Node, isKeepWorld: boolean):void; // void
        getScene():jsb.Scene; // cc::Scene*
        walk(preFunc: AnyFunction, postFunc: AnyFunction):void; // void
        walk(preFunc: AnyFunction):void; // void
        off(type: number, cbID: number):void; // void
        off(type: number, cbID: number, useCapture: boolean):void; // void
        off(type: number):void; // void
        off(type: number, useCapture: boolean):void; // void
        off(type: number, target: ArrayBuffer):void; // void
        off(type: number, target: ArrayBuffer, useCapture: boolean):void; // void
        hasEventListener(type: number, cbID: number):boolean; // bool
        hasEventListener(type: number):boolean; // bool
        hasEventListener(type: number, target: ArrayBuffer):boolean; // bool
        hasEventListener(type: number, target: ArrayBuffer, cbID: number):boolean; // bool
        targetOff(type: number):void; // void
        destroyAllChildren():void; // void
        updateSiblingIndex():void; // void
        addChild(node: jsb.Node):void; // void
        removeChild(node: jsb.Node):void; // void
        removeFromParent():void; // void
        removeAllChildren():void; // void
        isChildOf(parent: jsb.Node):boolean; // bool
        setActive(isActive: boolean):void; // void
        setSiblingIndex(index: number):void; // void
        isActive():boolean; // bool
        isActiveInHierarchy():boolean; // bool
        setActiveInHierarchy(v: boolean):void; // void
        getChildren():jsb.Node[]; // std::vector<cc::IntrusivePtr<cc::Node>>
        getParent():jsb.Node; // cc::Node*
        getEventProcessor():jsb.NodeEventProcessor; // cc::NodeEventProcessor*
        getChildByUuid(uuid: string):jsb.Node; // cc::Node*
        getChildByName(name: string):jsb.Node; // cc::Node*
        getChildByPath(path: string):jsb.Node; // cc::Node*
        getSiblingIndex():number; // int
        getUserData():jsb.Node.UserData; // cc::Node::UserData*
        setUserData(data: jsb.Node.UserData):void; // void
        insertChild(child: jsb.Node, siblingIndex: number):void; // void
        invalidateChildren(dirtyBit: number):void; // void
        translate(arg0: jsb.Vec3):void; // void
        translate(arg0: jsb.Vec3, ns: number):void; // void
        rotate(rot: jsb.Quaternion):void; // void
        rotate(rot: jsb.Quaternion, ns: number):void; // void
        rotate(rot: jsb.Quaternion, ns: number, calledFromJS: boolean):void; // void
        rotateForJS(x: number, y: number, z: number, w: number):void; // void
        rotateForJS(x: number, y: number, z: number, w: number, ns: number):void; // void
        lookAt(pos: jsb.Vec3):void; // void
        lookAt(pos: jsb.Vec3, up: jsb.Vec3):void; // void
        pauseSystemEvents(recursive: boolean):void; // void
        resumeSystemEvents(recursive: boolean):void; // void
        setPosition(x: number, y: number):void; // void
        /**
         * en Set position in local coordinate system
         * 
         * zh 设置本地坐标
         * 
         * param position Target position
         */
        setPosition(pos: jsb.Vec3):void; // void
        setPosition(x: number, y: number, z: number):void; // void
        setPositionInternal(x: number, y: number, z: number, calledFromJS: boolean):void; // void
        setPositionInternal(x: number, y: number, calledFromJS: boolean):void; // void
        setPositionForJS(x: number, y: number, z: number):void; // void
        /**
         * en Get position in local coordinate system, please try to pass `out` vector and reuse it to avoid garbage.
         * 
         * zh 获取本地坐标，注意，尽可能传递复用的 [[Vec3]] 以避免产生垃圾。
         * 
         * param out Set the result to out vector
         * 
         * return If `out` given, the return value equals to `out`, otherwise a new vector will be generated and return
         */
        getPosition():jsb.Vec3; // cc::Vec3
        setRotation(x: number, y: number, z: number, w: number):void; // void
        /**
         * en Set rotation in local coordinate system with a quaternion representing the rotation
         * 
         * zh 用四元数设置本地旋转
         * 
         * param rotation Rotation in quaternion
         */
        setRotation(rotation: jsb.Quaternion):void; // void
        setRotationInternal(x: number, y: number, z: number, w: number, calledFromJS: boolean):void; // void
        setRotationForJS(x: number, y: number, z: number, w: number):void; // void
        setEulerAngles(val: jsb.Vec3):void; // void
        setRotationFromEuler(x: number, y: number):void; // void
        setRotationFromEuler(val: jsb.Vec3):void; // void
        setRotationFromEuler(x: number, y: number, z: number):void; // void
        setRotationFromEulerForJS(x: number, y: number, z: number):void; // void
        /**
         * en Get rotation as quaternion in local coordinate system, please try to pass `out` quaternion and reuse it to avoid garbage.
         * 
         * zh 获取本地旋转，注意，尽可能传递复用的 [[Quat]] 以避免产生垃圾。
         * 
         * param out Set the result to out quaternion
         * 
         * return If `out` given, the return value equals to `out`, otherwise a new quaternion will be generated and return
         */
        getRotation():jsb.Quaternion; // cc::Quaternion
        setScale(x: number, y: number):void; // void
        /**
         * en Set scale in local coordinate system
         * 
         * zh 设置本地缩放
         * 
         * param scale Target scale
         */
        setScale(scale: jsb.Vec3):void; // void
        setScale(x: number, y: number, z: number):void; // void
        setScaleInternal(x: number, y: number, z: number, calledFromJS: boolean):void; // void
        setScaleInternal(x: number, y: number, calledFromJS: boolean):void; // void
        setScaleForJS(x: number, y: number, z: number):void; // void
        /**
         * en Get scale in local coordinate system, please try to pass `out` vector and reuse it to avoid garbage.
         * 
         * zh 获取本地缩放，注意，尽可能传递复用的 [[Vec3]] 以避免产生垃圾。
         * 
         * param out Set the result to out vector
         * 
         * return If `out` given, the return value equals to `out`, otherwise a new vector will be generated and return
         */
        getScale():jsb.Vec3; // cc::Vec3
        /**
         * en Inversely transform a point from world coordinate system to local coordinate system.
         * 
         * zh 逆向变换一个空间点，一般用于将世界坐标转换到本地坐标系中。
         * 
         * param p A position in world coordinate system
         * 
         * return The result point in local coordinate system will be stored in this vector
         */
        inverseTransformPoint(p: jsb.Vec3):jsb.Vec3; // cc::Vec3
        setWorldPosition(x: number, y: number, z: number):void; // void
        /**
         * en Set position in world coordinate system
         * 
         * zh 设置世界坐标
         * 
         * param position Target position
         */
        setWorldPosition(pos: jsb.Vec3):void; // void
        /**
         * en Get position in world coordinate system, please try to pass `out` vector and reuse it to avoid garbage.
         * 
         * zh 获取世界坐标，注意，尽可能传递复用的 [[Vec3]] 以避免产生垃圾。
         * 
         * param out Set the result to out vector
         * 
         * return If `out` given, the return value equals to `out`, otherwise a new vector will be generated and return
         */
        getWorldPosition():jsb.Vec3; // cc::Vec3
        setWorldRotation(x: number, y: number, z: number, w: number):void; // void
        /**
         * en Set rotation in world coordinate system with a quaternion representing the rotation
         * 
         * zh 用四元数设置世界坐标系下的旋转
         * 
         * param rotation Rotation in quaternion
         */
        setWorldRotation(rotation: jsb.Quaternion):void; // void
        /**
         * en Get rotation as quaternion in world coordinate system, please try to pass `out` quaternion and reuse it to avoid garbage.
         * 
         * zh 获取世界坐标系下的旋转，注意，尽可能传递复用的 [[Quat]] 以避免产生垃圾。
         * 
         * param out Set the result to out quaternion
         * 
         * return If `out` given, the return value equals to `out`, otherwise a new quaternion will be generated and return
         */
        getWorldRotation():jsb.Quaternion; // cc::Quaternion
        setWorldScale(x: number, y: number, z: number):void; // void
        /**
         * en Set rotation in world coordinate system with euler angles
         * 
         * zh 用欧拉角设置世界坐标系下的旋转
         * 
         * param x X axis rotation
         * 
         * param y Y axis rotation
         * 
         * param z Z axis rotation
         */
        setWorldScale(scale: jsb.Vec3):void; // void
        /**
         * en Get scale in world coordinate system, please try to pass `out` vector and reuse it to avoid garbage.
         * 
         * zh 获取世界缩放，注意，尽可能传递复用的 [[Vec3]] 以避免产生垃圾。
         * 
         * param out Set the result to out vector
         * 
         * return If `out` given, the return value equals to `out`, otherwise a new vector will be generated and return
         */
        getWorldScale():jsb.Vec3; // cc::Vec3
        setWorldRotationFromEuler(x: number, y: number, z: number):void; // void
        /**
         * en Update the world transform information if outdated
         * 
         * zh 更新节点的世界变换信息
         */
        updateWorldTransform():void; // void
        /**
         * en Get a world transform matrix
         * 
         * zh 获取世界变换矩阵
         * 
         * param out Set the result to out matrix
         * 
         * return If `out` given, the return value equals to `out`, otherwise a new matrix will be generated and return
         */
        getWorldMatrix():jsb.Mat4; // cc::Mat4
        /**
         * en Get a world transform matrix with only rotation and scale
         * 
         * zh 获取只包含旋转和缩放的世界变换矩阵
         * 
         * param out Set the result to out matrix
         * 
         * return If `out` given, the return value equals to `out`, otherwise a new matrix will be generated and return
         */
        getWorldRS():jsb.Mat4; // cc::Mat4
        /**
         * en Get a world transform matrix with only rotation and translation
         * 
         * zh 获取只包含旋转和位移的世界变换矩阵
         * 
         * param out Set the result to out matrix
         * 
         * return If `out` given, the return value equals to `out`, otherwise a new matrix will be generated and return
         */
        getWorldRT():jsb.Mat4; // cc::Mat4
        /**
         * en Set local transformation with rotation, position and scale separately.
         * 
         * zh 一次性设置所有局部变换（平移、旋转、缩放）信息
         * 
         * param rot The rotation
         * 
         * param pos The position
         * 
         * param scale The scale
         */
        setRTSInternal(rot: jsb.Quaternion, pos: jsb.Vec3, scale: jsb.Vec3, calledFromJS: boolean):void; // void
        setRTS(rot: jsb.Quaternion, pos: jsb.Vec3, scale: jsb.Vec3):void; // void
        setForward(dir: jsb.Vec3):void; // void
        getEulerAngles():jsb.Vec3; // cc::Vec3
        getForward():jsb.Vec3; // cc::Vec3
        getUp():jsb.Vec3; // cc::Vec3
        getRight():jsb.Vec3; // cc::Vec3
        isStatic():boolean; // bool
        setStatic(v: boolean):void; // void
        setDirtyFlag(value: number):void; // void
        getDirtyFlag():number; // unsigned int
        setLayer(layer: number):void; // void
        getLayer():number; // unsigned int
        _setChildren(children: jsb.Node[]):void; // void
        _getSharedArrayBufferObject():jsb.Object; // se::Object*
        onPreDestroy():boolean; // bool
        onPreDestroyBase():boolean; // bool
    } // endof class Node
    
    
    // ts : jsb.Scene
    // cpp: cc::Scene
    export class Scene extends jsb.Node {
        // attributes list
        autoReleaseAssets   : boolean;  // bool
        // methods list
        constructor();
        constructor(name: string);
        getRenderScene():jsb.RenderScene; // cc::scene::RenderScene*
        getSceneGlobals():jsb.SceneGlobals; // cc::SceneGlobals*
        setSceneGlobals(globals: jsb.SceneGlobals):void; // void
        load():void; // void
        activate():void; // void
        activate(active: boolean):void; // void
        onBatchCreated(dontSyncChildPrefab: boolean):void; // void
    } // endof class Scene
    
    
    // ts : jsb.SceneGlobals
    // cpp: cc::SceneGlobals
    export class SceneGlobals {
        // methods list
        constructor();
        activate():void; // void
        getAmbientInfo():jsb.AmbientInfo; // cc::scene::AmbientInfo*
        getShadowsInfo():jsb.ShadowsInfo; // cc::scene::ShadowsInfo*
        getSkyboxInfo():jsb.SkyboxInfo; // cc::scene::SkyboxInfo*
        getFogInfo():jsb.FogInfo; // cc::scene::FogInfo*
        getOctreeInfo():jsb.OctreeInfo; // cc::scene::OctreeInfo*
        setAmbientInfo(info: jsb.AmbientInfo):void; // void
        setShadowsInfo(info: jsb.ShadowsInfo):void; // void
        setSkyboxInfo(info: jsb.SkyboxInfo):void; // void
        setFogInfo(info: jsb.FogInfo):void; // void
        setOctreeInfo(info: jsb.OctreeInfo):void; // void
    } // endof class SceneGlobals
    
    
    // ts : jsb.Light
    // cpp: cc::scene::Light
    export class Light {
        // attributes list
        baked               : boolean;          // bool
        color               : jsb.Vec3;         // cc::Vec3
        useColorTemperature : boolean;          // bool
        colorTemperature    : number;           // float
        colorTemperatureRGB : jsb.Vec3;         // cc::Vec3
        node                : jsb.Node;         // cc::Node*
        type                : number;           // cc::scene::LightType
        name                : string;           // std::string
        scene               : jsb.RenderScene;  // cc::scene::RenderScene*
        // static methods list
        static nt2lm(size: number):number; // float
        static colorTemperatureToRGB(kelvin: number):jsb.Vec3; // cc::Vec3
        // methods list
        constructor();
        attachToScene(scene: jsb.RenderScene):void; // void
        detachFromScene():void; // void
        destroy():void; // void
        initialize():void; // void
        update():void; // void
    } // endof class Light
    
    
    // ts : jsb.Fog
    // cpp: cc::scene::Fog
    export class Fog {
        // attributes list
        enabled     : boolean;  // bool
        accurate    : boolean;  // bool
        fogColor    : jsb.Color;// cc::Color
        type        : number;   // cc::scene::FogType
        fogDensity  : number;   // float
        fogStart    : number;   // float
        fogEnd      : number;   // float
        fogAtten    : number;   // float
        fogTop      : number;   // float
        fogRange    : number;   // float
        colorArray  : jsb.Vec4; // cc::Vec4
        // methods list
        constructor();
        initialize(fogInfo: jsb.FogInfo):void; // void
        activate():void; // void
    } // endof class Fog
    
    
    // ts : jsb.FogInfo
    // cpp: cc::scene::FogInfo
    export class FogInfo {
        // attributes list
        type        : number;   // cc::scene::FogType
        fogColor    : jsb.Color;// cc::Color
        enabled     : boolean;  // bool
        accurate    : boolean;  // bool
        fogDensity  : number;   // float
        fogStart    : number;   // float
        fogEnd      : number;   // float
        fogAtten    : number;   // float
        fogTop      : number;   // float
        fogRange    : number;   // float
        // public_fields list
        _type       : number;   // cc::scene::FogType
        _fogColor   : jsb.Color;// cc::Color
        _enabled    : boolean;  // bool
        _fogDensity : number;   // float
        _fogStart   : number;   // float
        _fogEnd     : number;   // float
        _fogAtten   : number;   // float
        _fogTop     : number;   // float
        _fogRange   : number;   // float
        _accurate   : boolean;  // bool
        // methods list
        constructor();
        activate(resource: jsb.Fog):void; // void
    } // endof class FogInfo
    
    
    // ts : jsb.IMacroPatch
    // cpp: cc::scene::IMacroPatch
    export class IMacroPatch {
        // public_fields list
        name    : string;                   // std::string
        value   : (number|boolean|string);  // boost::variant2::variant<int, bool, std::string>
    } // endof class IMacroPatch
    
    
    // ts : jsb.ShadowsInfo
    // cpp: cc::scene::ShadowsInfo
    export class ShadowsInfo {
        // attributes list
        enabled         : boolean;  // bool
        type            : number;   // cc::scene::ShadowType
        planeDirection  : jsb.Vec3; // cc::Vec3
        planeHeight     : number;   // float
        shadowColor     : jsb.Color;// cc::Color
        maxReceived     : number;   // unsigned int
        shadowMapSize   : number;   // float
        // public_fields list
        _enabled    : boolean;  // bool
        _type       : number;   // cc::scene::ShadowType
        _normal     : jsb.Vec3; // cc::Vec3
        _distance   : number;   // float
        _shadowColor: jsb.Color;// cc::Color
        _maxReceived: number;   // unsigned int
        _size       : jsb.Vec2; // cc::Vec2
        // methods list
        constructor();
        /**
         * en Set plane which receives shadow with the given node's world transformation
         * 
         * zh 根据指定节点的世界变换设置阴影接收平面的信息
         * 
         * param node The node for setting up the plane
         */
        setPlaneFromNode(node: jsb.Node):void; // void
        activate(resource: jsb.Shadows):void; // void
    } // endof class ShadowsInfo
    
    
    // ts : jsb.Shadows
    // cpp: cc::scene::Shadows
    export class Shadows {
        // attributes list
        enabled             : boolean;      // bool
        type                : number;       // cc::scene::ShadowType
        normal              : jsb.Vec3;     // cc::Vec3
        distance            : number;       // float
        shadowColor         : jsb.Color;    // cc::Color
        maxReceived         : number;       // unsigned int
        size                : jsb.Vec2;     // cc::Vec2
        shadowMapDirty      : boolean;      // bool
        matLight            : jsb.Mat4;     // cc::Mat4
        material            : jsb.Material; // cc::Material*
        instancingMaterial  : jsb.Material; // cc::Material*
        // public_fields list
        static readonly MAX_FAR                 : number;   // float
        static readonly COEFFICIENT_OF_EXPANSION: number;   // float
        // methods list
        constructor();
        initialize(shadowsInfo: jsb.ShadowsInfo):void; // void
        destroy():void; // void
        getPlanarShader(patches: jsb.IMacroPatch[]):gfx.Shader; // cc::gfx::Shader*
        getPlanarInstanceShader(patches: jsb.IMacroPatch[]):gfx.Shader; // cc::gfx::Shader*
        activate():void; // void
        getShadowColor4f():Float32Array; // std::array<float, 4>
        setShadowMapSize(value: number):void; // void
        getShadowMapSize():number; // float
    } // endof class Shadows
    
    
    // ts : jsb.SubModel
    // cpp: cc::scene::SubModel
    export class SubModel {
        // attributes list
        passes              : jsb.Pass[];           // std::vector<cc::IntrusivePtr<cc::scene::Pass>>
        shaders             : gfx.Shader[];         // std::vector<cc::IntrusivePtr<cc::gfx::Shader>>
        subMesh             : jsb.RenderingSubMesh; // cc::RenderingSubMesh*
        priority            : number;               // cc::pipeline::RenderPriority
        inputAssembler      : gfx.InputAssembler;   // cc::gfx::InputAssembler*
        descriptorSet       : gfx.DescriptorSet;    // cc::gfx::DescriptorSet*
        patches             : jsb.IMacroPatch[];    // std::vector<cc::scene::IMacroPatch>
        planarInstanceShader: gfx.Shader;           // cc::gfx::Shader*
        planarShader        : gfx.Shader;           // cc::gfx::Shader*
        // methods list
        constructor();
        update():void; // void
        getShader(arg0: number):gfx.Shader; // cc::gfx::Shader*
        getPass(arg0: number):jsb.Pass; // cc::scene::Pass*
        setWorldBoundDescriptorSet(descriptorSet: gfx.DescriptorSet):void; // void
        setOwner(model: jsb.Model):void; // void
        getWorldBoundDescriptorSet():gfx.DescriptorSet; // cc::gfx::DescriptorSet*
        getOwner():jsb.Model; // cc::scene::Model*
        getId():number; // unsigned int
        initialize(subMesh: jsb.RenderingSubMesh, passes: jsb.Pass[], patches: jsb.IMacroPatch[]):void; // void
        initPlanarShadowShader():void; // void
        initPlanarShadowInstanceShader():void; // void
        destroy():void; // void
        onPipelineStateChanged():void; // void
        onMacroPatchesStateChanged(patches: jsb.IMacroPatch[]):void; // void
        onGeometryChanged():void; // void
    } // endof class SubModel
    
    
    // ts : jsb.InstancedAttributeBlock
    // cpp: cc::scene::InstancedAttributeBlock
    export class InstancedAttributeBlock {
        // public_fields list
        buffer      : Uint8Array;                                                                                                   // cc::TypedArrayTemp<unsigned char>
        views       : (undefined|Int8Array|Int16Array|Int32Array|Uint8Array|Uint16Array|Uint32Array|Float32Array|Float64Array)[];   // std::vector<boost::variant2::variant<boost::variant2::monostate, cc::TypedArrayTemp<signed char>, cc::TypedArrayTemp<short>, cc::TypedArrayTemp<int>, cc::TypedArrayTemp<unsigned char>, cc::TypedArrayTemp<unsigned short>, cc::TypedArrayTemp<unsigned int>, cc::TypedArrayTemp<float>, cc::TypedArrayTemp<double>>>
        attributes  : gfx.Attribute[];                                                                                              // std::vector<cc::gfx::Attribute>
    } // endof class InstancedAttributeBlock
    
    
    // ts : jsb.Model
    // cpp: cc::scene::Model
    export class Model {
        // attributes list
        scene               : jsb.RenderScene;              // cc::scene::RenderScene*
        _subModels          : jsb.SubModel[];               // std::vector<cc::IntrusivePtr<cc::scene::SubModel>>
        subModels           : jsb.SubModel[];               // std::vector<cc::IntrusivePtr<cc::scene::SubModel>>
        inited              : boolean;                      // bool
        _localDataUpdated   : boolean;                      // bool
        _worldBounds        : jsb.AABB;                     // cc::geometry::AABB*
        worldBounds         : jsb.AABB;                     // cc::geometry::AABB*
        _modelBounds        : jsb.AABB;                     // cc::geometry::AABB*
        modelBounds         : jsb.AABB;                     // cc::geometry::AABB*
        worldBoundBuffer    : gfx.Buffer;                   // cc::gfx::Buffer*
        localBuffer         : gfx.Buffer;                   // cc::gfx::Buffer*
        updateStamp         : number;                       // unsigned int
        isInstancingEnabled : boolean;                      // bool
        receiveShadow       : boolean;                      // bool
        castShadow          : boolean;                      // bool
        shadowBias          : number;                       // float
        shadowNormalBias    : number;                       // float
        node                : jsb.Node;                     // cc::Node*
        transform           : jsb.Node;                     // cc::Node*
        visFlags            : number;                       // cc::Layers::LayerList
        enabled             : boolean;                      // bool
        type                : number;                       // cc::scene::Model::Type
        instancedAttributes : jsb.InstancedAttributeBlock;  // cc::scene::InstancedAttributeBlock
        isDynamicBatching   : boolean;                      // bool
        priority            : number;                       // unsigned int
        // methods list
        constructor();
        destroy():void; // void
        initSubModel(idx: number, subMeshData: jsb.RenderingSubMesh, mat: jsb.Material):void; // void
        getMacroPatches(subModelIndex: number):jsb.IMacroPatch[]; // std::vector<cc::scene::IMacroPatch>
        setSubModelMaterial(idx: number, mat: jsb.Material):void; // void
        updateInstancedAttributes(attributes: gfx.Attribute[], pass: jsb.Pass):void; // void
        updateTransform(stamp: number):void; // void
        updateUBOs(stamp: number):void; // void
        updateLocalDescriptors(subModelIndex: number, descriptorSet: gfx.DescriptorSet):void; // void
        updateWorldBoundDescriptors(subModelIndex: number, descriptorSet: gfx.DescriptorSet):void; // void
        createBoundingShape(minPos?: jsb.Vec3, maxPos?: jsb.Vec3):void; // void
        getInstancedAttributeIndex(name: string):number; // int
        initialize():void; // void
        initLightingmap(texture: jsb.Texture2D, uvParam: jsb.Vec4):void; // void
        initLocalDescriptors(subModelIndex: number):void; // void
        initWorldBoundDescriptors(subModelIndex: number):void; // void
        onGlobalPipelineStateChanged():void; // void
        onMacroPatchesStateChanged():void; // void
        onGeometryChanged():void; // void
        setSubModelMesh(idx: number, subMesh: jsb.RenderingSubMesh):void; // void
        setInstancedAttribute(name: string, value: number, byteLength: number):void; // void
        updateWorldBound():void; // void
        updateWorldBoundsForJSSkinningModel(min: jsb.Vec3, max: jsb.Vec3):void; // void
        updateWorldBoundsForJSBakedSkinningModel(aabb: jsb.AABB):void; // void
        updateLightingmap(texture: jsb.Texture2D, uvParam: jsb.Vec4):void; // void
        updateOctree():void; // void
        updateWorldBoundUBOs():void; // void
        updateLocalShadowBias():void; // void
        attachToScene(scene: jsb.RenderScene):void; // void
        detachFromScene():void; // void
        setInstMatWorldIdx(idx: number):void; // void
        setBounds(world: jsb.AABB):void; // void
        setOctreeNode(node: jsb.OctreeNode):void; // void
        getInstMatWorldIdx():number; // int
        getInstanceAttributes():gfx.Attribute[]; // std::vector<cc::gfx::Attribute>
        getInstancedBuffer():string; // unsigned char*
        getInstancedBufferSize():number; // unsigned int
        getLocalData():Float32Array; // cc::TypedArrayTemp<float>
        getOctreeNode():jsb.OctreeNode; // cc::scene::OctreeNode*
        setCalledFromJS(v: boolean):void; // void
        getEventProcessor():jsb.CallbacksInvoker; // cc::CallbacksInvoker
        setInstancedAttributesViewData(viewIdx: number, arrIdx: number, value: number):void; // void
        isModelImplementedInJS():boolean; // bool
    } // endof class Model
    
    
    // ts : jsb.IRenderSceneInfo
    // cpp: cc::scene::IRenderSceneInfo
    export class IRenderSceneInfo {
        // public_fields list
        name: string;   // std::string
    } // endof class IRenderSceneInfo
    
    
    // ts : jsb.RenderScene
    // cpp: cc::scene::RenderScene
    export class RenderScene {
        // attributes list
        name            : string;               // std::string
        cameras?        : jsb.Camera[];         // std::vector<cc::IntrusivePtr<cc::scene::Camera>>
        mainLight?      : jsb.DirectionalLight; // cc::scene::DirectionalLight*
        sphereLights?   : jsb.SphereLight[];    // std::vector<cc::IntrusivePtr<cc::scene::SphereLight>>
        spotLights?     : jsb.SpotLight[];      // std::vector<cc::IntrusivePtr<cc::scene::SpotLight>>
        models          : jsb.Model[];          // std::vector<cc::IntrusivePtr<cc::scene::Model>>
        // methods list
        constructor();
        initialize(info: jsb.IRenderSceneInfo):boolean; // bool
        update(stamp: number):void; // void
        destroy():void; // void
        activate():void; // void
        addCamera(camera: jsb.Camera):void; // void
        removeCamera(camera: jsb.Camera):void; // void
        removeCameras():void; // void
        unsetMainLight(dl: jsb.DirectionalLight):void; // void
        addDirectionalLight(dl: jsb.DirectionalLight):void; // void
        removeDirectionalLight(dl: jsb.DirectionalLight):void; // void
        addSphereLight(arg0: jsb.SphereLight):void; // void
        removeSphereLight(arg0: jsb.SphereLight):void; // void
        removeSphereLights():void; // void
        addSpotLight(arg0: jsb.SpotLight):void; // void
        removeSpotLight(arg0: jsb.SpotLight):void; // void
        removeSpotLights():void; // void
        addModel(arg0: jsb.Model):void; // void
        removeModel(model: jsb.Model):void; // void
        removeModels():void; // void
        addBatch(arg0: jsb.DrawBatch2D):void; // void
        removeBatch(arg0: jsb.DrawBatch2D):void; // void
        removeBatches():void; // void
        onGlobalPipelineStateChanged():void; // void
        getMainLight():jsb.DirectionalLight; // cc::scene::DirectionalLight*
        setMainLight(dl: jsb.DirectionalLight):void; // void
        generateModelId():number; // uint64_t
        getCameras():jsb.Camera[]; // std::vector<cc::IntrusivePtr<cc::scene::Camera>>
        getSphereLights():jsb.SphereLight[]; // std::vector<cc::IntrusivePtr<cc::scene::SphereLight>>
        getSpotLights():jsb.SpotLight[]; // std::vector<cc::IntrusivePtr<cc::scene::SpotLight>>
        getOctree():jsb.Octree; // cc::scene::Octree*
        updateOctree(model: jsb.Model):void; // void
        getBatches():cc.scene.DrawBatch2D []; // std::vector<cc::scene::DrawBatch2D *>
    } // endof class RenderScene
    
    
    // ts : jsb.IRenderWindowInfo
    // cpp: cc::scene::IRenderWindowInfo
    export class IRenderWindowInfo {
        // public_fields list
        title           ?: string;              // boost::optional<std::string>
        width           : number;               // unsigned int
        height          : number;               // unsigned int
        renderPassInfo  : gfx.RenderPassInfo;   // cc::gfx::RenderPassInfo
        swapchain       : gfx.Swapchain;        // cc::gfx::Swapchain*
    } // endof class IRenderWindowInfo
    
    
    // ts : jsb.RenderWindow
    // cpp: cc::scene::RenderWindow
    export class RenderWindow {
        // attributes list
        width       : number;           // unsigned int
        height      : number;           // unsigned int
        framebuffer : gfx.Framebuffer;  // cc::gfx::Framebuffer*
        cameras     : jsb.Camera[];     // std::vector<cc::IntrusivePtr<cc::scene::Camera>>
        swapchain   : gfx.Swapchain;    // cc::gfx::Swapchain*
        // methods list
        constructor();
        initialize(device: gfx.Device, info: jsb.IRenderWindowInfo):boolean; // bool
        destroy():void; // void
        /**
         * en Resize window.
         * 
         * zh 重置窗口大小。
         * 
         * param width The new width.
         * 
         * param height The new height.
         */
        resize(width: number, height: number):void; // void
        extractRenderCameras(cameras: jsb.Camera[]):void; // void
        /**
         * zh
         * 
         * 添加渲染相机
         * 
         * param camera 渲染相机
         */
        attachCamera(camera: jsb.Camera):void; // void
        /**
         * zh
         * 
         * 移除渲染相机
         * 
         * param camera 相机
         */
        detachCamera(camera: jsb.Camera):void; // void
        /**
         * zh
         * 
         * 销毁全部渲染相机
         */
        clearCameras():void; // void
        sortCameras():void; // void
    } // endof class RenderWindow
    
    
    // ts : jsb.SphereLight
    // cpp: cc::scene::SphereLight
    export class SphereLight extends jsb.Light {
        // attributes list
        position    : jsb.Vec3; // cc::Vec3
        size        : number;   // float
        range       : number;   // float
        luminance   : number;   // float
        luminanceHDR: number;   // float
        luminanceLDR: number;   // float
        aabb        : jsb.AABB; // cc::geometry::AABB
        // methods list
        constructor();
    } // endof class SphereLight
    
    
    // ts : jsb.DebugViewConfig
    // cpp: cc::DebugViewConfig
    export class DebugViewConfig {
        // public_fields list
        singleMode              : number;   // unsigned char
        compositeModeBitCount   : number;   // unsigned char
        compositeModeValue      : number;   // unsigned int
        lightingWithAlbedo      : boolean;  // bool
        csmLayerColoration      : boolean;  // bool
    } // endof class DebugViewConfig
    
    
    // ts : jsb.Root
    // cpp: cc::Root
    export class Root {
        // attributes list
        device              : gfx.Device;               // cc::gfx::Device*
        _device             : gfx.Device;               // cc::gfx::Device*
        mainWindow          : jsb.RenderWindow;         // cc::scene::RenderWindow*
        curWindow           : jsb.RenderWindow;         // cc::scene::RenderWindow*
        tempWindow          : jsb.RenderWindow;         // cc::scene::RenderWindow*
        windows             : jsb.RenderWindow[];       // std::vector<cc::IntrusivePtr<cc::scene::RenderWindow>>
        scenes              : jsb.RenderScene[];        // std::vector<cc::IntrusivePtr<cc::scene::RenderScene>>
        cumulativeTime      : number;                   // float
        frameTime           : number;                   // float
        frameCount          : number;                   // unsigned int
        fps                 : number;                   // unsigned int
        fixedFPS            : number;                   // unsigned int
        useDeferredPipeline : boolean;                  // bool
        usesCustomPipeline  : boolean;                  // bool
        pipeline            : render.PipelineRuntime;   // cc::render::PipelineRuntime*
        customPipeline      : render.Pipeline;          // cc::render::Pipeline*
        // static methods list
        static getInstance():jsb.Root; // cc::Root*
        // methods list
        constructor(device: gfx.Device);
        initialize(swapchain: gfx.Swapchain):void; // void
        destroy():void; // void
        /**
         * zh
         * 
         * 重置大小
         * 
         * param width 屏幕宽度
         * 
         * param height 屏幕高度
         */
        resize(width: number, height: number):void; // void
        setRenderPipeline():boolean; // bool
        setRenderPipeline(rppl: nr.RenderPipeline):boolean; // bool
        onGlobalPipelineStateChanged():void; // void
        /**
         * zh
         * 
         * 激活指定窗口为当前窗口
         * 
         * param window GFX 窗口
         */
        activeWindow(arg0: jsb.RenderWindow):void; // void
        /**
         * zh
         * 
         * 重置累计时间
         */
        resetCumulativeTime():void; // void
        /**
         * zh
         * 
         * 每帧执行函数
         * 
         * param deltaTime 间隔时间
         */
        frameMove(deltaTime: number, totalFrames: number):void; // void
        /**
         * zh
         * 
         * 创建窗口
         * 
         * param info GFX 窗口描述信息
         */
        createWindow(arg0: jsb.IRenderWindowInfo):jsb.RenderWindow; // cc::scene::RenderWindow*
        /**
         * zh
         * 
         * 销毁指定的窗口
         * 
         * param window GFX 窗口
         */
        destroyWindow(arg0: jsb.RenderWindow):void; // void
        /**
         * zh
         * 
         * 销毁全部窗口
         */
        destroyWindows():void; // void
        /**
         * zh
         * 
         * 创建渲染场景
         * 
         * param info 渲染场景描述信息
         */
        createScene(arg0: jsb.IRenderSceneInfo):jsb.RenderScene; // cc::scene::RenderScene*
        /**
         * zh
         * 
         * 销毁指定的渲染场景
         * 
         * param scene 渲染场景
         */
        destroyScene(arg0: jsb.RenderScene):void; // void
        /**
         * zh
         * 
         * 销毁全部场景
         */
        destroyScenes():void; // void
        destroyModel(model: jsb.Model):void; // void
        destroyLight(light: jsb.Light):void; // void
        createCamera():jsb.Camera; // cc::scene::Camera*
        /**
         * zh
         * 
         * UI实例
         * 
         * 引擎内部使用，用户无需调用此接口
         */
        getBatcher2D():jsb.Batcher2d; // cc::Batcher2d*
        /**
         * zh
         * 
         * 渲染调试数据
         */
        setDebugViewConfig(config: jsb.DebugViewConfig):void; // void
        getDebugViewConfig():jsb.DebugViewConfig; // cc::DebugViewConfig
        getEventProcessor():jsb.CallbacksInvoker; // cc::CallbacksInvoker*
    } // endof class Root
    
    
    // ts : jsb.SkyboxInfo
    // cpp: cc::scene::SkyboxInfo
    export class SkyboxInfo {
        // attributes list
        _envmap         : jsb.TextureCube;  // cc::TextureCube*
        applyDiffuseMap : boolean;          // bool
        enabled         : boolean;          // bool
        useIBL          : boolean;          // bool
        useHDR          : boolean;          // bool
        envmap          : jsb.TextureCube;  // cc::TextureCube*
        envLightingType : number;           // cc::scene::EnvironmentLightingType
        diffuseMap      : jsb.TextureCube;  // cc::TextureCube*
        // public_fields list
        _envmapHDR          : jsb.TextureCube;  // cc::TextureCube*
        _envmapLDR          : jsb.TextureCube;  // cc::TextureCube*
        _diffuseMapHDR      : jsb.TextureCube;  // cc::TextureCube*
        _diffuseMapLDR      : jsb.TextureCube;  // cc::TextureCube*
        _reflectionHDR      : jsb.TextureCube;  // cc::TextureCube*
        _reflectionLDR      : jsb.TextureCube;  // cc::TextureCube*
        _enabled            : boolean;          // bool
        _useHDR             : boolean;          // bool
        _envLightingType    : number;           // cc::scene::EnvironmentLightingType
        _editableMaterial   : jsb.Material;     // cc::IntrusivePtr<cc::Material>
        // methods list
        constructor();
        setReflectionMap(val: jsb.TextureCube):void; // void
        activate(resource: jsb.Skybox):void; // void
    } // endof class SkyboxInfo
    
    
    // ts : jsb.Skybox
    // cpp: cc::scene::Skybox
    export class Skybox {
        // attributes list
        model           : jsb.Model;        // cc::scene::Model*
        enabled         : boolean;          // bool
        useHDR          : boolean;          // bool
        useIBL          : boolean;          // bool
        useDiffuseMap   : boolean;          // bool
        isRGBE          : boolean;          // bool
        envmap          : jsb.TextureCube;  // cc::TextureCube*
        diffuseMap      : jsb.TextureCube;  // cc::TextureCube*
        // methods list
        constructor();
        initialize(skyboxInfo: jsb.SkyboxInfo):void; // void
        setEnvMaps(envmapHDR: jsb.TextureCube, envmapLDR: jsb.TextureCube):void; // void
        setDiffuseMaps(diffuseMapHDR: jsb.TextureCube, diffuseMapLDR: jsb.TextureCube):void; // void
        setReflectionMaps(reflectionHDR: jsb.TextureCube, reflectionLDR: jsb.TextureCube):void; // void
        activate():void; // void
        /**
         * en Whether to use offline baked convolutional maps
         * 
         * zh 是否使用离线烘焙的卷积图？
         */
        isUsingConvolutionMap():boolean; // bool
        setSkyboxMaterial(skyboxMat: jsb.Material):void; // void
        getReflectionMap():jsb.TextureCube; // cc::TextureCube*
    } // endof class Skybox
    
    
    // ts : jsb.Ambient
    // cpp: cc::scene::Ambient
    export class Ambient {
        // attributes list
        skyColor    : jsb.Vec4; // cc::Vec4
        skyIllum    : number;   // float
        groundAlbedo: jsb.Vec4; // cc::Vec4
        enabled     : boolean;  // bool
        mipmapCount : number;   // unsigned char
        // public_fields list
        static readonly SUN_ILLUM   : number;   // float
        static readonly SKY_ILLUM   : number;   // float
        // methods list
        constructor();
        initialize(info: jsb.AmbientInfo):void; // void
    } // endof class Ambient
    
    
    // ts : jsb.AmbientInfo
    // cpp: cc::scene::AmbientInfo
    export class AmbientInfo {
        // attributes list
        skyColor            : jsb.Vec4; // cc::Vec4
        skyIllum            : number;   // float
        groundAlbedo        : jsb.Vec4; // cc::Vec4
        _skyColor           : jsb.Vec4; // cc::Vec4
        _skyIllum           : number;   // float
        _groundAlbedo       : jsb.Vec4; // cc::Vec4
        skyColorLDR         : jsb.Vec4; // cc::Vec4
        groundAlbedoLDR     : jsb.Vec4; // cc::Vec4
        skyIllumLDR         : number;   // float
        skyLightingColor    : jsb.Color;// cc::Color
        groundLightingColor : jsb.Color;// cc::Color
        groundAlbedoHDR     : jsb.Vec4; // cc::Vec4
        skyColorHDR         : jsb.Vec4; // cc::Vec4
        skyIllumHDR         : number;   // float
        // public_fields list
        _skyColorHDR    : jsb.Vec4; // cc::Vec4
        _skyIllumHDR    : number;   // float
        _groundAlbedoHDR: jsb.Vec4; // cc::Vec4
        _skyColorLDR    : jsb.Vec4; // cc::Vec4
        _skyIllumLDR    : number;   // float
        _groundAlbedoLDR: jsb.Vec4; // cc::Vec4
        // methods list
        constructor();
        activate(resource: jsb.Ambient):void; // void
    } // endof class AmbientInfo
    
    
    // ts : jsb.DirectionalLight
    // cpp: cc::scene::DirectionalLight
    export class DirectionalLight extends jsb.Light {
        // attributes list
        direction                       : jsb.Vec3; // cc::Vec3
        illuminance                     : number;   // float
        illuminanceHDR                  : number;   // float
        illuminanceLDR                  : number;   // float
        shadowEnabled                   : boolean;  // bool
        shadowPcf                       : number;   // cc::scene::PCFType
        shadowBias                      : number;   // float
        shadowNormalBias                : number;   // float
        shadowSaturation                : number;   // float
        shadowDistance                  : number;   // float
        shadowInvisibleOcclusionRange   : number;   // float
        csmLevel                        : number;   // cc::scene::CSMLevel
        csmNeedUpdate                   : boolean;  // bool
        csmLayerLambda                  : number;   // float
        csmOptimizationMode             : number;   // cc::scene::CSMOptimizationMode
        shadowFixedArea                 : boolean;  // bool
        shadowNear                      : number;   // float
        shadowFar                       : number;   // float
        shadowOrthoSize                 : number;   // float
        // methods list
        constructor();
    } // endof class DirectionalLight
    
    
    // ts : jsb.SpotLight
    // cpp: cc::scene::SpotLight
    export class SpotLight extends jsb.Light {
        // attributes list
        position        : jsb.Vec3;     // cc::Vec3
        size            : number;       // float
        range           : number;       // float
        luminance       : number;       // float
        luminanceHDR    : number;       // float
        luminanceLDR    : number;       // float
        direction       : jsb.Vec3;     // cc::Vec3
        spotAngle       : number;       // float
        angle           : number;       // float
        aabb            : jsb.AABB;     // cc::geometry::AABB
        frustum         : jsb.Frustum;  // cc::geometry::Frustum
        shadowEnabled   : boolean;      // bool
        shadowPcf       : number;       // float
        shadowBias      : number;       // float
        shadowNormalBias: number;       // float
        // methods list
        constructor();
    } // endof class SpotLight
    
    
    // ts : jsb.PassDynamicsValue
    // cpp: cc::scene::PassDynamicsValue
    export class PassDynamicsValue {
        // public_fields list
        dirty   : boolean;  // bool
        value   : number;   // float
    } // endof class PassDynamicsValue
    
    
    // ts : jsb.Pass
    // cpp: cc::scene::Pass
    export class Pass {
        // attributes list
        root                : jsb.Root;                                 // cc::Root*
        device              : gfx.Device;                               // cc::gfx::Device*
        shaderInfo          : jsb.IProgramInfo;                         // cc::IProgramInfo*
        localSetLayout      : gfx.DescriptorSetLayout;                  // cc::gfx::DescriptorSetLayout*
        program             : string;                                   // std::string
        properties          : {[key:string]:jsb.IPropertyInfo};         // std::unordered_map<std::string, cc::IPropertyInfo>
        defines             : {[key:string]:(number|boolean|string)};   // std::unordered_map<std::string, boost::variant2::variant<int, bool, std::string>>
        passIndex           : number;                                   // int
        propertyIndex       : number;                                   // int
        dynamics            : {[key:number]:jsb.PassDynamicsValue};     // std::unordered_map<unsigned int, cc::scene::PassDynamicsValue>
        rootBufferDirty     : boolean;                                  // bool
        _rootBufferDirty    : boolean;                                  // bool
        priority            : number;                                   // cc::pipeline::RenderPriority
        primitive           : number;                                   // cc::gfx::PrimitiveMode
        stage               : number;                                   // cc::pipeline::RenderPassStage
        phase               : number;                                   // unsigned int
        rasterizerState     : gfx.RasterizerState;                      // cc::gfx::RasterizerState*
        depthStencilState   : gfx.DepthStencilState;                    // cc::gfx::DepthStencilState*
        blendState          : gfx.BlendState;                           // cc::gfx::BlendState*
        dynamicStates       : number;                                   // cc::gfx::DynamicStateFlagBit
        batchingScheme      : number;                                   // cc::scene::BatchingSchemes
        descriptorSet       : gfx.DescriptorSet;                        // cc::gfx::DescriptorSet*
        hash                : number;                                   // unsigned int
        pipelineLayout      : gfx.PipelineLayout;                       // cc::gfx::PipelineLayout*
        // static methods list
        /**
         * en Get the type of member in uniform buffer object with the handle
         * 
         * zh 根据 handle 获取 uniform 的具体类型。
         */
        static getTypeFromHandle(handle: number):number; // cc::gfx::Type
        /**
         * en Get the binding with handle
         * 
         * zh 根据 handle 获取 binding。
         */
        static getBindingFromHandle(handle: number):number; // unsigned int
        /**
         * en Get the array length with handle
         * 
         * zh 根据 handle 获取数组长度。
         */
        static getCountFromHandle(handle: number):number; // unsigned int
        static getOffsetFromHandle(handle: number):number; // unsigned int
        /**
         * en Fill a pass represented by the given pass handle with the given override info
         * 
         * param pass The pass handle point to the pass
         * 
         * param info The pass override info
         */
        static fillPipelineInfo(pass: jsb.Pass, info: jsb.IPassInfoFull):void; // void
        /**
         * en Get pass hash value by [[Pass]] hash information.
         * 
         * zh 根据 [[Pass]] 的哈希信息获取哈希值。
         * 
         * param pass Handle of the pass info used to compute hash value.
         */
        static getPassHash(pass: jsb.Pass):number; // unsigned int
        // methods list
        constructor(root: jsb.Root);
        constructor();
        /**
         * en Initialize the pass with given pass info, shader will be compiled in the init process
         * 
         * zh 根据指定参数初始化当前 pass，shader 会在这一阶段就尝试编译。
         */
        initialize(info: jsb.IPassInfoFull):void; // void
        /**
         * en Get the handle of a UBO member, or specific channels of it.
         * 
         * zh 获取指定 UBO 成员，或其更具体分量的读写句柄。默认以成员自身的类型为目标读写类型（即读写时必须传入与成员类型相同的变量）。
         * 
         * param name Name of the target UBO member.
         * 
         * param offset Channel offset into the member.
         * 
         * param targetType Target type of the handle, i.e. the type of data when read/write to it.
         * 
         * example
         * 
         * ```
         * 
         * import { Vec3, gfx } from 'cc';
         * 
         * say 'pbrParams' is a uniform vec4
         * 
         * const hParams = pass.getHandle('pbrParams'); get the default handle
         * 
         * pass.setUniform(hAlbedo, new Vec3(1, 0, 0)); wrong! pbrParams.w is NaN now
         * 
         * say 'albedoScale' is a uniform vec4, and we only want to modify the w component in the form of a single float
         * 
         * const hThreshold = pass.getHandle('albedoScale', 3, gfx.Type.FLOAT);
         * 
         * pass.setUniform(hThreshold, 0.5); now, albedoScale.w = 0.5
         * 
         * ```
         */
        getHandle(name: string):number; // unsigned int
        getHandle(name: string, offset: number):number; // unsigned int
        getHandle(name: string, offset: number, targetType: number):number; // unsigned int
        /**
         * en Gets the uniform binding with its name
         * 
         * zh 获取指定 uniform 的 binding。
         * 
         * param name The name of target uniform
         */
        getBinding(name: string):number; // unsigned int
        /**
         * en Sets a vector type uniform value, if a uniform requires frequent update, please use this method.
         * 
         * zh 设置指定普通向量类 uniform 的值，如果需要频繁更新请尽量使用此接口。
         * 
         * param handle The handle for the target uniform
         * 
         * param value New value
         */
        setUniform(handle: number, value: (undefined|number|jsb.Vec2|jsb.Vec3|jsb.Vec4|jsb.Color|jsb.Mat3|jsb.Mat4|jsb.Quaternion|jsb.TextureBase|gfx.Texture)):void; // void
        /**
         * en Gets a uniform's value.
         * 
         * zh 获取指定普通向量类 uniform 的值。
         * 
         * param handle The handle for the target uniform
         * 
         * param out The output property to store the result
         */
        getUniform(handle: number, out: (undefined|number|jsb.Vec2|jsb.Vec3|jsb.Vec4|jsb.Color|jsb.Mat3|jsb.Mat4|jsb.Quaternion|jsb.TextureBase|gfx.Texture)):(undefined|number|jsb.Vec2|jsb.Vec3|jsb.Vec4|jsb.Color|jsb.Mat3|jsb.Mat4|jsb.Quaternion|jsb.TextureBase|gfx.Texture); // boost::variant2::variant<boost::variant2::monostate, float, int, cc::Vec2, cc::Vec3, cc::Vec4, cc::Color, cc::Mat3, cc::Mat4, cc::Quaternion, cc::IntrusivePtr<cc::TextureBase>, cc::IntrusivePtr<cc::gfx::Texture>>
        /**
         * en Sets an array type uniform value, if a uniform requires frequent update, please use this method.
         * 
         * zh 设置指定数组类 uniform 的值，如果需要频繁更新请尽量使用此接口。
         * 
         * param handle The handle for the target uniform
         * 
         * param value New value
         */
        setUniformArray(handle: number, value: (undefined|number|jsb.Vec2|jsb.Vec3|jsb.Vec4|jsb.Color|jsb.Mat3|jsb.Mat4|jsb.Quaternion|jsb.TextureBase|gfx.Texture)[]):void; // void
        /**
         * en Bind a GFX [[Texture]] the the given uniform binding
         * 
         * zh 绑定实际 GFX [[Texture]] 到指定 binding。
         * 
         * param binding The binding for target uniform of texture type
         * 
         * param value Target texture
         */
        bindTexture(binding: number, value: gfx.Texture):void; // void
        bindTexture(binding: number, value: gfx.Texture, index: number):void; // void
        /**
         * en Bind a GFX [[Sampler]] the the given uniform binding
         * 
         * zh 绑定实际 GFX [[Sampler]] 到指定 binding。
         * 
         * param binding The binding for target uniform of sampler type
         * 
         * param value Target sampler
         */
        bindSampler(binding: number, value: gfx.Sampler):void; // void
        bindSampler(binding: number, value: gfx.Sampler, index: number):void; // void
        /**
         * en Sets the dynamic pipeline state property at runtime
         * 
         * zh 设置运行时 pass 内可动态更新的管线状态属性。
         * 
         * param state Target dynamic state
         * 
         * param value Target value
         */
        setDynamicState(state: number, value: number):void; // void
        /**
         * en Override all pipeline states with the given pass override info.
         * 
         * zh 重载当前所有管线状态。
         * 
         * param original The original pass info
         * 
         * param value The override pipeline state info
         */
        overridePipelineStates(original: jsb.IPassInfoFull, overrides: jsb.IPassStates):void; // void
        update():void; // void
        getInstancedBuffer():nr.InstancedBuffer; // cc::pipeline::InstancedBuffer*
        getInstancedBuffer(extraKey: number):nr.InstancedBuffer; // cc::pipeline::InstancedBuffer*
        getBatchedBuffer():nr.BatchedBuffer; // cc::pipeline::BatchedBuffer*
        getBatchedBuffer(extraKey: number):nr.BatchedBuffer; // cc::pipeline::BatchedBuffer*
        /**
         * en Destroy the current pass.
         * 
         * zh 销毁当前 pass。
         */
        destroy():void; // void
        /**
         * en Resets the value of the given uniform by name to the default value in [[EffectAsset]].
         * 
         * This method does not support array type uniform.
         * 
         * zh 重置指定（非数组） Uniform 为 [[EffectAsset]] 默认值。
         */
        resetUniform(name: string):void; // void
        /**
         * en Resets the value of the given texture by name to the default value in [[EffectAsset]].
         * 
         * zh 重置指定贴图为 [[EffectAsset]] 默认值。
         */
        resetTexture(name: string, index: number):void; // void
        resetTexture(name: string):void; // void
        /**
         * en Resets all uniform buffer objects to the default values in [[EffectAsset]]
         * 
         * zh 重置所有 UBO 为默认值。
         */
        resetUBOs():void; // void
        /**
         * en Resets all textures and samplers to the default values in [[EffectAsset]]
         * 
         * zh 重置所有 texture 和 sampler 为初始默认值。
         */
        resetTextures():void; // void
        tryCompile(arg0?: {[key:string]:(number|boolean|string)}):boolean; // bool
        /**
         * en Try to compile the shader and retrieve related resources references.
         * 
         * zh 尝试编译 shader 并获取相关资源引用。
         */
        tryCompile():boolean; // bool
        getShaderVariant(patches: jsb.IMacroPatch[]):gfx.Shader; // cc::gfx::Shader*
        /**
         * en Gets the shader variant of the current pass and given macro patches
         * 
         * zh 结合指定的编译宏组合获取当前 Pass 的 Shader Variant
         * 
         * param patches The macro patches
         */
        getShaderVariant():gfx.Shader; // cc::gfx::Shader*
        getPassInfoFull():jsb.IPassInfoFull; // cc::IPassInfoFull
        getBlocks():cc.scene.IBlockRef[]; // std::vector<cc::scene::IBlockRef>
        getRootBlock():ArrayBuffer; // cc::ArrayBuffer*
        initPassFromTarget(target: jsb.Pass, dss: gfx.DepthStencilState, hashFactor: number):void; // void
        /**
         * private
         */
        beginChangeStatesSilently():void; // void
        endChangeStatesSilently():void; // void
    } // endof class Pass
    
    
    // ts : jsb.ICameraInfo
    // cpp: cc::scene::ICameraInfo
    export class ICameraInfo {
        // public_fields list
        name            : string;           // std::string
        node            : jsb.Node;         // cc::Node*
        projection      : number;           // cc::scene::CameraProjection
        targetDisplay   ?: number;          // boost::optional<unsigned int>
        window          : jsb.RenderWindow; // cc::scene::RenderWindow*
        priority        : number;           // unsigned int
        pipeline        ?: string;          // boost::optional<std::string>
    } // endof class ICameraInfo
    
    
    // ts : jsb.Camera
    // cpp: cc::scene::Camera
    export class Camera {
        // attributes list
        iso             : number;               // cc::scene::CameraISO
        isoValue        : number;               // float
        ec              : number;               // float
        exposure        : number;               // float
        shutter         : number;               // cc::scene::CameraShutter
        shutterValue    : number;               // float
        apertureValue   : number;               // float
        width           : number;               // unsigned int
        height          : number;               // unsigned int
        scene           : jsb.RenderScene;      // cc::scene::RenderScene*
        name            : string;               // std::string
        window          : jsb.RenderWindow;     // cc::scene::RenderWindow*
        forward         : jsb.Vec3;             // cc::Vec3
        aperture        : number;               // cc::scene::CameraAperture
        position        : jsb.Vec3;             // cc::Vec3
        projectionType  : number;               // cc::scene::CameraProjection
        fovAxis         : number;               // cc::scene::CameraFOVAxis
        fov             : number;               // float
        nearClip        : number;               // float
        farClip         : number;               // float
        viewport        : jsb.Vec4;             // cc::Vec4
        orthoHeight     : number;               // float
        clearColor      : gfx.Color;            // cc::gfx::Color
        clearDepth      : number;               // float
        clearFlag       : number;               // cc::gfx::ClearFlagBit
        clearStencil    : number;               // unsigned int
        enabled         : boolean;              // bool
        frustum         : jsb.Frustum;          // cc::geometry::Frustum
        isWindowSize    : boolean;              // bool
        priority        : number;               // unsigned int
        screenScale     : number;               // float
        visibility      : number;               // unsigned int
        node            : jsb.Node;             // cc::Node*
        surfaceTransform: number;               // cc::gfx::SurfaceTransform
        geometryRenderer: nr.GeometryRenderer;  // cc::pipeline::GeometryRenderer*
        // public_fields list
        static readonly SKYBOX_FLAG : number;   // int
        // static methods list
        /**
         * this exposure value corresponding to default standard camera exposure parameters
         */
        static getStandardExposureValue():number; // float
        /**
         * luminance unit scale used by area lights
         */
        static getStandardLightMeterScale():number; // float
        // methods list
        constructor(device: gfx.Device);
        initialize(info: jsb.ICameraInfo):boolean; // bool
        destroy():void; // void
        attachToScene(scene: jsb.RenderScene):void; // void
        detachFromScene():void; // void
        resize(width: number, height: number):void; // void
        setFixedSize(width: number, height: number):void; // void
        syncCameraEditor(camera: jsb.Camera):void; // void
        update():void; // void
        update(forceUpdate: boolean):void; // void
        changeTargetWindow(window: jsb.RenderWindow):void; // void
        /**
         * transform a screen position (in oriented space) to a world space ray
         */
        screenPointToRay(x: number, y: number):jsb.Ray; // cc::geometry::Ray
        /**
         * transform a screen position (in oriented space) to world space
         */
        screenToWorld(screenPos: jsb.Vec3):jsb.Vec3; // cc::Vec3
        /**
         * transform a world space position to screen space
         */
        worldToScreen(worldPos: jsb.Vec3):jsb.Vec3; // cc::Vec3
        /**
         * transform a world space matrix to screen space
         * 
         * param {Mat4} out the resulting vector
         * 
         * param {Mat4} worldMatrix the world space matrix to be transformed
         * 
         * param {number} width framebuffer width
         * 
         * param {number} height framebuffer height
         * 
         * returns {Mat4} the resulting vector
         */
        worldMatrixToScreen(worldMatrix: jsb.Mat4, width: number, height: number):jsb.Mat4; // cc::Mat4
        setViewportInOrientedSpace(val: jsb.Rect):void; // void
        getAspect():number; // float
        getMatView():jsb.Mat4; // cc::Mat4
        getMatProj():jsb.Mat4; // cc::Mat4
        getMatProjInv():jsb.Mat4; // cc::Mat4
        getMatViewProj():jsb.Mat4; // cc::Mat4
        getMatViewProjInv():jsb.Mat4; // cc::Mat4
        initGeometryRenderer():void; // void
        detachCamera():void; // void
    } // endof class Camera
    
    
    // ts : jsb.PassInstance
    // cpp: cc::PassInstance
    export class PassInstance extends jsb.Pass {
        // attributes list
        parent  : jsb.Pass; // cc::scene::Pass*
        // methods list
        constructor(parent: jsb.Pass, owner: jsb.MaterialInstance);
    } // endof class PassInstance
    
    
    // ts : jsb.IMaterialInstanceInfo
    // cpp: cc::IMaterialInstanceInfo
    export class IMaterialInstanceInfo {
        // public_fields list
        parent      : jsb.Material; // cc::Material*
        subModelIdx : number;       // int
    } // endof class IMaterialInstanceInfo
    
    
    // ts : jsb.MaterialInstance
    // cpp: cc::MaterialInstance
    export class MaterialInstance extends jsb.Material {
        // methods list
        constructor(info: jsb.IMaterialInstanceInfo);
        onPassStateChange(dontNotify: boolean):void; // void
        setRebuildPSOCallback(cb: AnyFunction):void; // void
    } // endof class MaterialInstance
    
    
    // ts : jsb.MorphModel
    // cpp: cc::MorphModel
    export class MorphModel extends jsb.Model {
        // methods list
        constructor();
        setMorphRendering(morphRendering: jsb.MorphRenderingInstance):void; // void
    } // endof class MorphModel
    
    
    // ts : jsb.SkinningModel
    // cpp: cc::SkinningModel
    export class SkinningModel extends jsb.MorphModel {
        // methods list
        constructor();
        bindSkeleton(skeleton: jsb.Skeleton, skinningRoot: jsb.Node, mesh: jsb.Mesh):void; // void
    } // endof class SkinningModel
    
    
    // ts : jsb.BakedSkinningModel
    // cpp: cc::BakedSkinningModel
    export class BakedSkinningModel extends jsb.MorphModel {
        // methods list
        constructor();
        updateInstancedJointTextureInfo():void; // void
        bindSkeleton(skeleton: jsb.Skeleton, skinningRoot: jsb.Node, mesh: jsb.Mesh):void; // void
        updateModelBounds(modelBounds: jsb.AABB):void; // void
        syncAnimInfoForJS(buffer: gfx.Buffer, data: Float32Array, dirty: Uint8Array):void; // void
        syncDataForJS(boundsInfo: jsb.AABB[], modelBound?: jsb.AABB, jointTextureInfo0: number, jointTextureInfo1: number, jointTextureInfo2: number, jointTextureInfo3: number, tex: gfx.Texture, animInfoData: Float32Array):void; // void
        setUploadedAnimForJS(value: boolean):void; // void
    } // endof class BakedSkinningModel
    
    
    // ts : jsb.IDefineRecord
    // cpp: cc::IDefineRecord
    export class IDefineRecord extends jsb.IDefineInfo {
        // public_fields list
        offset  : number;   // int
    } // endof class IDefineRecord
    
    
    // ts : jsb.IProgramInfo
    // cpp: cc::IProgramInfo
    export class IProgramInfo extends jsb.IShaderInfo {
        // public_fields list
        effectName      : string;               // std::string
        defines         : jsb.IDefineRecord[];  // std::vector<cc::IDefineRecord>
        constantMacros  : string;               // std::string
        uber            : boolean;              // bool
        // methods list
        copyFrom(o: jsb.IShaderInfo):void; // void
    } // endof class IProgramInfo
    
    
    // ts : jsb.ProgramLib
    // cpp: cc::ProgramLib
    export class ProgramLib {
        // static methods list
        static getInstance():jsb.ProgramLib; // cc::ProgramLib*
        // methods list
        registerEffect(effect: jsb.EffectAsset):void; // void
        /**
         * en Register the shader template with the given info
         * 
         * zh 注册 shader 模板。
         */
        define(shader: jsb.IShaderInfo):jsb.IProgramInfo; // cc::IProgramInfo*
        /**
         * en Gets the shader template with its name
         * 
         * zh 通过名字获取 Shader 模板
         * 
         * param name Target shader name
         */
        getTemplate(name: string):jsb.IProgramInfo; // cc::IProgramInfo*
        /**
         * en Gets the shader template info with its name
         * 
         * zh 通过名字获取 Shader 模版信息
         * 
         * param name Target shader name
         */
        getTemplateInfo(name: string):jsb.ITemplateInfo; // cc::ITemplateInfo*
        /**
         * en Gets the pipeline layout of the shader template given its name
         * 
         * zh 通过名字获取 Shader 模板相关联的管线布局
         * 
         * param name Target shader name
         */
        getDescriptorSetLayout(device: gfx.Device, name: string):gfx.DescriptorSetLayout; // cc::gfx::DescriptorSetLayout*
        getDescriptorSetLayout(device: gfx.Device, name: string, isLocal: boolean):gfx.DescriptorSetLayout; // cc::gfx::DescriptorSetLayout*
        /**
         * en
         * 
         * Does this library has the specified program
         * 
         * zh
         * 
         * 当前是否有已注册的指定名字的 shader
         * 
         * param name Target shader name
         */
        hasProgram(name: string):boolean; // bool
        /**
         * en Gets the shader key with the name and a macro combination
         * 
         * zh 根据 shader 名和预处理宏列表获取 shader key。
         * 
         * param name Target shader name
         * 
         * param defines The combination of preprocess macros
         */
        getKey(name: string, defines: {[key:string]:(number|boolean|string)}):string; // std::string
        /**
         * en Destroy all shader instance match the preprocess macros
         * 
         * zh 销毁所有完全满足指定预处理宏特征的 shader 实例。
         * 
         * param defines The preprocess macros as filter
         */
        destroyShaderByDefines(defines: {[key:string]:(number|boolean|string)}):void; // void
        /**
         * en Gets the shader resource instance with given information
         * 
         * zh 获取指定 shader 的渲染资源实例
         * 
         * param name Shader name
         * 
         * param defines Preprocess macros
         * 
         * param pipeline The [[RenderPipeline]] which owns the render command
         * 
         * param key The shader cache key, if already known
         */
        getGFXShader(device: gfx.Device, name: string, defines: {[key:string]:(number|boolean|string)}, pipeline: render.PipelineRuntime):gfx.Shader; // cc::gfx::Shader*
        getGFXShader(device: gfx.Device, name: string, defines: {[key:string]:(number|boolean|string)}, pipeline: render.PipelineRuntime, key: string):gfx.Shader; // cc::gfx::Shader*
    } // endof class ProgramLib
    
    
    // ts : jsb.OctreeInfo
    // cpp: cc::scene::OctreeInfo
    export class OctreeInfo {
        // attributes list
        enabled : boolean;  // bool
        minPos  : jsb.Vec3; // cc::Vec3
        maxPos  : jsb.Vec3; // cc::Vec3
        depth   : number;   // unsigned int
        // public_fields list
        _enabled: boolean;  // bool
        _minPos : jsb.Vec3; // cc::Vec3
        _maxPos : jsb.Vec3; // cc::Vec3
        _depth  : number;   // unsigned int
        // methods list
        constructor();
        activate(resource: jsb.Octree):void; // void
    } // endof class OctreeInfo
    
    
    // ts : jsb.Octree
    // cpp: cc::scene::Octree
    export class Octree {
        // methods list
        constructor();
        initialize(info: jsb.OctreeInfo):void; // void
        /**
         * en Whether activate octree
         * 
         * zh 是否启用八叉树加速剔除？
         */
        setEnabled(val: boolean):void; // void
        isEnabled():boolean; // bool
        /**
         * en min pos of scene bounding box
         * 
         * zh 场景包围盒最小值
         */
        setMinPos(val: jsb.Vec3):void; // void
        getMinPos():jsb.Vec3; // cc::Vec3
        /**
         * en max pos of scene bounding box
         * 
         * zh 场景包围盒最大值
         */
        setMaxPos(val: jsb.Vec3):void; // void
        getMaxPos():jsb.Vec3; // cc::Vec3
        resize(minPos: jsb.Vec3, maxPos: jsb.Vec3, maxDepth: number):void; // void
        insert(model: jsb.Model):void; // void
        remove(model: jsb.Model):void; // void
        update(model: jsb.Model):void; // void
        /**
         * en depth of octree
         * 
         * zh 八叉树深度
         */
        setMaxDepth(val: number):void; // void
        getMaxDepth():number; // unsigned int
        queryVisibility(camera: jsb.Camera, frustum: jsb.Frustum, isShadow: boolean, results: jsb.Model[]):void; // void
    } // endof class Octree
    
    
    // ts : jsb.VideoPlayer
    // cpp: cc::VideoPlayer
    export class VideoPlayer {
        // methods list
        constructor();
        /**
         * Destroy VideoPlayer, remove it from parent
         */
        destroy():void; // void
        /**
         * Sets a URL as a video source for VideoPlayer.
         */
        setURL(videoURL: string):void; // void
        /**
         * Starts playback.
         */
        play():void; // void
        /**
         * Pauses playback.
         */
        pause():void; // void
        /**
         * Stops playback.
         */
        stop():void; // void
        /**
         * Seeks to specified time position.
         * 
         * param sec   The offset in seconds from the start to seek to.
         */
        seekTo(sec: number):void; // void
        /**
         * Get the current play time, measure in seconds.
         */
        currentTime():number; // float
        duration():number; // float
        /**
         * Causes the video player to keep aspect ratio or no when displaying the video.
         * 
         * param enable    Specify true to keep aspect ratio or false to scale the video until
         * 
         * both dimensions fit the visible bounds of the view exactly.
         */
        setKeepAspectRatioEnabled(enable: boolean):void; // void
        /**
         * Indicates whether the video player keep aspect ratio when displaying the video.
         */
        isKeepAspectRatioEnabled():boolean; // bool
        /**
         * Causes the video player to enter or exit full-screen mode.
         * 
         * param fullscreen    Specify true to enter full-screen mode or false to exit full-screen mode.
         */
        setFullScreenEnabled(fullscreen: boolean):void; // void
        /**
         * Register a callback to be invoked when the video state is updated.
         * 
         * param callback  The callback that will be run.
         */
        addEventListener(name: string, callback: AnyFunction):void; // void
        /**
         * brief A function which will be called when video is playing.
         * 
         * param event @see VideoPlayer::EventType.
         */
        onPlayEvent(event: number):void; // void
        /**
         * Toggle visibility of VideoPlayer.
         */
        setVisible(visible: boolean):void; // void
        /**
         * Set the rect of VideoPlayer.
         */
        setFrame(x: number, y: number, width: number, height: number):void; // void
    } // endof class VideoPlayer
    
    
    // ts : jsb.WebView
    // cpp: cc::WebView
    export class WebView {
        // static methods list
        /**
         * Allocates and initializes a WebView.
         */
        static create():jsb.WebView; // cc::WebView*
        // methods list
        /**
         * Destroy webview, remove it from its parent
         */
        destroy():void; // void
        /**
         * Set javascript interface scheme.
         * 
         * see WebView::setOnJSCallback()
         */
        setJavascriptInterfaceScheme(scheme: string):void; // void
        /**
         * Sets the main page contents, MIME type, content encoding, and base URL.
         * 
         * param data The content for the main page.
         * 
         * param mimeType The MIME type of the data.
         * 
         * param encoding The encoding of the data.
         * 
         * param baseURL The base URL for the content.
         */
        loadData(data: jsb.Data, mimeType: string, encoding: string, baseURL: string):void; // void
        /**
         * Sets the main page content and base URL.
         * 
         * param string The content for the main page.
         * 
         * param baseURL The base URL for the content.
         */
        loadHTMLString(string: string):void; // void
        loadHTMLString(string: string, baseURL: string):void; // void
        /**
         * Loads the given URL.
         * 
         * param url Content URL.
         */
        loadURL(url: string):void; // void
        /**
         * Loads the given fileName.
         * 
         * param fileName Content fileName.
         */
        loadFile(fileName: string):void; // void
        /**
         * Stops the current load.
         */
        stopLoading():void; // void
        /**
         * Reloads the current URL.
         */
        reload():void; // void
        /**
         * Gets whether this WebView has a back history item.
         * 
         * return WebView has a back history item.
         */
        canGoBack():boolean; // bool
        /**
         * Gets whether this WebView has a forward history item.
         * 
         * return WebView has a forward history item.
         */
        canGoForward():boolean; // bool
        /**
         * Goes back in the history.
         */
        goBack():void; // void
        /**
         * Goes forward in the history.
         */
        goForward():void; // void
        /**
         * Evaluates JavaScript in the context of the currently displayed page.
         */
        evaluateJS(js: string):void; // void
        /**
         * Set WebView should support zooming. The default value is false.
         */
        setScalesPageToFit(scalesPageToFit: boolean):void; // void
        /**
         * Call before a web view begins loading.
         * 
         * param callback The web view that is about to load new content.
         * 
         * return YES if the web view should begin loading content; otherwise, NO.
         */
        setOnShouldStartLoading(callback: AnyFunction):void; // void
        /**
         * Call after a web view finishes loading.
         * 
         * param callback The web view that has finished loading.
         */
        setOnDidFinishLoading(callback: AnyFunction):void; // void
        /**
         * Call if a web view failed to load content.
         * 
         * param callback The web view that has failed loading.
         */
        setOnDidFailLoading(callback: AnyFunction):void; // void
        /**
         * This callback called when load URL that start with javascript interface scheme.
         */
        setOnJSCallback(callback: AnyFunction):void; // void
        /**
         * Get the callback when WebView is about to start.
         */
        getOnShouldStartLoading():AnyFunction; // std::function<bool (cc::WebView *, const std::string)>
        /**
         * Get the callback when WebView has finished loading.
         */
        getOnDidFinishLoading():AnyFunction; // std::function<void (cc::WebView *, const std::string)>
        /**
         * Get the callback when WebView has failed loading.
         */
        getOnDidFailLoading():AnyFunction; // std::function<void (cc::WebView *, const std::string)>
        /**
         * Get the Javascript callback.
         */
        getOnJSCallback():AnyFunction; // std::function<void (cc::WebView *, const std::string)>
        /**
         * Set whether the webview bounces at end of scroll of WebView.
         */
        setBounces(bounce: boolean):void; // void
        /**
         * Toggle visibility of WebView.
         */
        setVisible(visible: boolean):void; // void
        /**
         * Set the rect of WebView.
         */
        setFrame(x: number, y: number, width: number, height: number):void; // void
        /**
         * Set the background transparent
         */
        setBackgroundTransparent(isTransparent: boolean):void; // void
    } // endof class WebView
} // endof namespace jsb

declare namespace nr {
    
    
    // ts : nr.RenderObject
    // cpp: cc::pipeline::RenderObject
    export class RenderObject {
        // public_fields list
        depth   : number;   // float
        model   : jsb.Model;// cc::scene::Model*
    } // endof class RenderObject
    
    
    // ts : nr.RenderQueueDesc
    // cpp: cc::pipeline::RenderQueueDesc
    export class RenderQueueDesc {
        // public_fields list
        isTransparent   : boolean;  // bool
        sortMode        : number;   // cc::pipeline::RenderQueueSortMode
        stages          : string[]; // std::vector<std::string>
    } // endof class RenderQueueDesc
    
    
    // ts : nr.RenderPipelineInfo
    // cpp: cc::pipeline::RenderPipelineInfo
    export class RenderPipelineInfo {
        // public_fields list
        tag     : number;           // unsigned int
        flows   : nr.RenderFlow[];  // std::vector<cc::pipeline::RenderFlow *>
    } // endof class RenderPipelineInfo
    
    
    // ts : nr.RenderPipeline
    // cpp: cc::pipeline::RenderPipeline
    export class RenderPipeline extends jsb.Asset {
        // attributes list
        globalDSManager     : nr.GlobalDSManager;       // cc::pipeline::GlobalDSManager*
        descriptorSet       : gfx.DescriptorSet;        // cc::gfx::DescriptorSet*
        descriptorSetLayout : gfx.DescriptorSetLayout;  // cc::gfx::DescriptorSetLayout*
        constantMacros      : string;                   // std::string
        clusterEnabled      : boolean;                  // bool
        bloomEnabled        : boolean;                  // bool
        pipelineSceneData   : nr.PipelineSceneData;     // cc::pipeline::PipelineSceneData*
        geometryRenderer    : nr.GeometryRenderer;      // cc::pipeline::GeometryRenderer*
        profiler            : jsb.Model;                // cc::scene::Model*
        shadingScale        : number;                   // float
        // static methods list
        static getInstance():nr.RenderPipeline; // cc::pipeline::RenderPipeline*
        static getRenderArea(camera: jsb.Camera):gfx.Rect; // cc::gfx::Rect
        // methods list
        activate(swapchain: gfx.Swapchain):boolean; // bool
        initialize(info: nr.RenderPipelineInfo):boolean; // bool
        render(cameras: jsb.Camera[]):void; // void
        onGlobalPipelineStateChanged():void; // void
        getFlows():nr.RenderFlow[]; // std::vector<cc::pipeline::RenderFlow *>
        getTag():number; // unsigned int
        getGlobalBindings():{[key:string]:cc.pipeline.InternalBindingInst}; // std::unordered_map<std::string, cc::pipeline::InternalBindingInst>
        getMacros():{[key:string]:(number|boolean|string)}; // std::unordered_map<std::string, boost::variant2::variant<int, bool, std::string>>
        setValue(name: string, value: boolean):void; // void
        setValue(name: string, value: number):void; // void
        setValue(name: string, value: string):void; // void
        getCommandBuffers():gfx.CommandBuffer[]; // std::vector<cc::gfx::CommandBuffer *>
        getQueryPools():gfx.QueryPool[]; // std::vector<cc::gfx::QueryPool *>
        getPipelineUBO():nr.PipelineUBO; // cc::pipeline::PipelineUBO*
        getDevice():gfx.Device; // cc::gfx::Device*
        getRenderstageByName(name: string):nr.RenderStage; // cc::pipeline::RenderStage*
        isOccluded(camera: jsb.Camera, subModel: jsb.SubModel):boolean; // bool
        isOcclusionQueryEnabled():boolean; // bool
        setOcclusionQueryEnabled(enable: boolean):void; // void
        isEnvmapEnabled():boolean; // bool
        getViewport(camera: jsb.Camera):gfx.Viewport; // cc::gfx::Viewport
        getScissor(camera: jsb.Camera):gfx.Rect; // cc::gfx::Rect
        genQuadVertexData(viewport: jsb.Vec4, data: number):void; // void
        getWidth():number; // unsigned int
        getHeight():number; // unsigned int
        getFrameGraph():jsb.FrameGraph; // cc::framegraph::FrameGraph
        getClearcolor(camera: jsb.Camera):gfx.Color; // cc::gfx::Color
        getIAByRenderArea(renderArea: gfx.Rect):gfx.InputAssembler; // cc::gfx::InputAssembler*
        updateQuadVertexData(viewport: jsb.Vec4, buffer: gfx.Buffer):void; // void
        ensureEnoughSize(cameras: jsb.Camera[]):void; // void
        createQuadInputAssembler(quadIB: gfx.Buffer, quadVB: gfx.Buffer, quadIA: gfx.InputAssembler):boolean; // bool
        isClusterEnabled():boolean; // bool
        isBloomEnabled():boolean; // bool
    } // endof class RenderPipeline
    
    
    // ts : nr.ForwardPipeline
    // cpp: cc::pipeline::ForwardPipeline
    export class ForwardPipeline extends nr.RenderPipeline {
        // methods list
        constructor();
        getValidLights():jsb.Light[]; // std::vector<cc::scene::Light *>
        getLightBuffers():gfx.Buffer[]; // std::vector<cc::gfx::Buffer *>
        getLightIndexOffsets():number[]; // std::vector<unsigned int>
        getLightIndices():number[]; // std::vector<unsigned int>
    } // endof class ForwardPipeline
    
    
    // ts : nr.RenderFlowInfo
    // cpp: cc::pipeline::RenderFlowInfo
    export class RenderFlowInfo {
        // public_fields list
        name    : string;           // std::string
        priority: number;           // unsigned int
        tag     : number;           // unsigned int
        stages  : nr.RenderStage[]; // std::vector<cc::pipeline::RenderStage *>
    } // endof class RenderFlowInfo
    
    
    // ts : nr.RenderFlow
    // cpp: cc::pipeline::RenderFlow
    export class RenderFlow {
        // methods list
        initialize(info: nr.RenderFlowInfo):boolean; // bool
        activate(pipeline: nr.RenderPipeline):void; // void
        render(camera: jsb.Camera):void; // void
        destroy():void; // void
        getName():string; // std::string
        getPriority():number; // unsigned int
        getTag():number; // unsigned int
        getRenderstageByName(name: string):nr.RenderStage; // cc::pipeline::RenderStage*
    } // endof class RenderFlow
    
    
    // ts : nr.ForwardFlow
    // cpp: cc::pipeline::ForwardFlow
    export class ForwardFlow extends nr.RenderFlow {
        // static methods list
        static getInitializeInfo():nr.RenderFlowInfo; // cc::pipeline::RenderFlowInfo
        // methods list
        constructor();
    } // endof class ForwardFlow
    
    
    // ts : nr.RenderStageInfo
    // cpp: cc::pipeline::RenderStageInfo
    export class RenderStageInfo {
        // public_fields list
        name        : string;               // std::string
        priority    : number;               // unsigned int
        tag         : number;               // unsigned int
        renderQueues: nr.RenderQueueDesc[]; // std::vector<cc::pipeline::RenderQueueDesc>
    } // endof class RenderStageInfo
    
    
    // ts : nr.RenderStage
    // cpp: cc::pipeline::RenderStage
    export class RenderStage {
        // methods list
        activate(pipeline: nr.RenderPipeline, flow: nr.RenderFlow):void; // void
        initialize(info: nr.RenderStageInfo):boolean; // bool
        destroy():void; // void
        render(camera: jsb.Camera):void; // void
        getName():string; // std::string
        getPriority():number; // unsigned int
        getTag():number; // unsigned int
        getFlow():nr.RenderFlow; // cc::pipeline::RenderFlow*
    } // endof class RenderStage
    
    
    // ts : nr.ForwardStage
    // cpp: cc::pipeline::ForwardStage
    export class ForwardStage extends nr.RenderStage {
        // static methods list
        static getInitializeInfo():nr.RenderStageInfo; // cc::pipeline::RenderStageInfo
        // methods list
        constructor();
    } // endof class ForwardStage
    
    
    // ts : nr.ShadowFlow
    // cpp: cc::pipeline::ShadowFlow
    export class ShadowFlow extends nr.RenderFlow {
        // static methods list
        static getInitializeInfo():nr.RenderFlowInfo; // cc::pipeline::RenderFlowInfo
        // methods list
        constructor();
    } // endof class ShadowFlow
    
    
    // ts : nr.ShadowStage
    // cpp: cc::pipeline::ShadowStage
    export class ShadowStage extends nr.RenderStage {
        // static methods list
        static getInitializeInfo():nr.RenderStageInfo; // cc::pipeline::RenderStageInfo
        // methods list
        constructor();
        setFramebuffer(framebuffer: gfx.Framebuffer):void; // void
        setUsage(globalDS: gfx.DescriptorSet, light: jsb.Light, framebuffer: gfx.Framebuffer):void; // void
        setUsage(globalDS: gfx.DescriptorSet, light: jsb.Light, framebuffer: gfx.Framebuffer, level: number):void; // void
        clearFramebuffer(camera: jsb.Camera):void; // void
    } // endof class ShadowStage
    
    
    // ts : nr.CSMLayers
    // cpp: cc::pipeline::CSMLayers
    export class CSMLayers {
        // methods list
        constructor();
        update(sceneData: nr.PipelineSceneData, camera: jsb.Camera):void; // void
        getCastShadowObjects():nr.RenderObject[]; // std::vector<cc::pipeline::RenderObject>
        setCastShadowObjects(ro: nr.RenderObject[]):void; // void
        addCastShadowObject(obj: nr.RenderObject):void; // void
        clearCastShadowObjects():void; // void
        getLayerObjects():nr.RenderObject[]; // std::vector<cc::pipeline::RenderObject>
        setLayerObjects(ro: nr.RenderObject[]):void; // void
        addLayerObject(obj: nr.RenderObject):void; // void
        clearLayerObjects():void; // void
        getLayers():cc.pipeline.CSMLayerInfo []; // std::array<cc::pipeline::CSMLayerInfo *, 4>
        getSpecialLayer():nr.ShadowTransformInfo; // cc::pipeline::ShadowTransformInfo*
    } // endof class CSMLayers
    
    
    // ts : nr.GlobalDSManager
    // cpp: cc::pipeline::GlobalDSManager
    export class GlobalDSManager {
        // static methods list
        static setDescriptorSetLayout():void; // void
        // methods list
        constructor();
        getLinearSampler():gfx.Sampler; // cc::gfx::Sampler*
        getPointSampler():gfx.Sampler; // cc::gfx::Sampler*
        getDescriptorSetLayout():gfx.DescriptorSetLayout; // cc::gfx::DescriptorSetLayout*
        getGlobalDescriptorSet():gfx.DescriptorSet; // cc::gfx::DescriptorSet*
        activate(device: gfx.Device):void; // void
        bindBuffer(binding: number, buffer: gfx.Buffer):void; // void
        bindTexture(binding: number, texture: gfx.Texture):void; // void
        bindSampler(binding: number, sampler: gfx.Sampler):void; // void
        update():void; // void
        getOrCreateDescriptorSet(light: jsb.Light):gfx.DescriptorSet; // cc::gfx::DescriptorSet*
        destroy():void; // void
    } // endof class GlobalDSManager
    
    
    // ts : nr.InstancedBuffer
    // cpp: cc::pipeline::InstancedBuffer
    export class InstancedBuffer {
        // methods list
        constructor(pass: jsb.Pass);
        destroy():void; // void
        merge(arg0: jsb.Model, arg1: jsb.SubModel, arg2: number, arg3: gfx.Shader):void; // void
        merge(arg0: jsb.Model, arg1: jsb.SubModel, arg2: number):void; // void
        uploadBuffers(cmdBuff: gfx.CommandBuffer):void; // void
        clear():void; // void
        setDynamicOffset(idx: number, value: number):void; // void
        getInstances():cc.pipeline.InstancedItem[]; // std::vector<cc::pipeline::InstancedItem>
        getPass():jsb.Pass; // cc::scene::Pass*
        hasPendingModels():boolean; // bool
        dynamicOffsets():number[]; // std::vector<unsigned int>
    } // endof class InstancedBuffer
    
    
    // ts : nr.DeferredPipeline
    // cpp: cc::pipeline::DeferredPipeline
    export class DeferredPipeline extends nr.RenderPipeline {
        // methods list
        constructor();
        getLightsUBO():gfx.Buffer; // cc::gfx::Buffer*
        getValidLights():jsb.Light[]; // std::vector<cc::scene::Light *>
        getLightBuffers():gfx.Buffer[]; // std::vector<cc::gfx::Buffer *>
        getLightIndexOffsets():number[]; // std::vector<unsigned int>
        getLightIndices():number[]; // std::vector<unsigned int>
    } // endof class DeferredPipeline
    
    
    // ts : nr.MainFlow
    // cpp: cc::pipeline::MainFlow
    export class MainFlow extends nr.RenderFlow {
        // static methods list
        static getInitializeInfo():nr.RenderFlowInfo; // cc::pipeline::RenderFlowInfo
        // methods list
        constructor();
    } // endof class MainFlow
    
    
    // ts : nr.GbufferStage
    // cpp: cc::pipeline::GbufferStage
    export class GbufferStage extends nr.RenderStage {
        // static methods list
        static getInitializeInfo():nr.RenderStageInfo; // cc::pipeline::RenderStageInfo
        // methods list
        constructor();
    } // endof class GbufferStage
    
    
    // ts : nr.LightingStage
    // cpp: cc::pipeline::LightingStage
    export class LightingStage extends nr.RenderStage {
        // static methods list
        static getInitializeInfo():nr.RenderStageInfo; // cc::pipeline::RenderStageInfo
        // methods list
        constructor();
    } // endof class LightingStage
    
    
    // ts : nr.BloomStage
    // cpp: cc::pipeline::BloomStage
    export class BloomStage extends nr.RenderStage {
        // attributes list
        threshold   : number;   // float
        intensity   : number;   // float
        iterations  : number;   // int
        // static methods list
        static getInitializeInfo():nr.RenderStageInfo; // cc::pipeline::RenderStageInfo
        // methods list
        constructor();
        getPrefilterUBO():gfx.Buffer; // cc::gfx::Buffer*
        getDownsampleUBO():gfx.Buffer[]; // std::array<cc::gfx::Buffer *, 6>
        getUpsampleUBO():gfx.Buffer[]; // std::array<cc::gfx::Buffer *, 6>
        getCombineUBO():gfx.Buffer; // cc::gfx::Buffer*
        getSampler():gfx.Sampler; // cc::gfx::Sampler*
    } // endof class BloomStage
    
    
    // ts : nr.PostProcessStage
    // cpp: cc::pipeline::PostProcessStage
    export class PostProcessStage extends nr.RenderStage {
        // static methods list
        static getInitializeInfo():nr.RenderStageInfo; // cc::pipeline::RenderStageInfo
        // methods list
        constructor();
    } // endof class PostProcessStage
    
    
    // ts : nr.PipelineSceneData
    // cpp: cc::pipeline::PipelineSceneData
    export class PipelineSceneData {
        // attributes list
        isHDR       : boolean;      // bool
        shadingScale: number;       // float
        fog         : jsb.Fog;      // cc::scene::Fog*
        ambient     : jsb.Ambient;  // cc::scene::Ambient*
        skybox      : jsb.Skybox;   // cc::scene::Skybox*
        shadows     : jsb.Shadows;  // cc::scene::Shadows*
        // methods list
        constructor();
        activate(device: gfx.Device):void; // void
        destroy():void; // void
        updatePipelineSceneData():void; // void
        setShadowFramebuffer(light: jsb.Light, framebuffer: gfx.Framebuffer):void; // void
        getShadowFramebufferMap():{[key:jsb.Light]:gfx.Framebuffer}; // std::unordered_map<const cc::scene::Light *, cc::IntrusivePtr<cc::gfx::Framebuffer>>
        getRenderObjects():nr.RenderObject[]; // std::vector<cc::pipeline::RenderObject>
        setRenderObjects(ro: nr.RenderObject[]):void; // void
        getValidPunctualLights():jsb.Light[]; // std::vector<const cc::scene::Light *>
        getCSMLayers():nr.CSMLayers; // cc::pipeline::CSMLayers*
        getOctree():jsb.Octree; // cc::scene::Octree*
        getOcclusionQueryInputAssembler():gfx.InputAssembler; // cc::gfx::InputAssembler*
        getOcclusionQueryPass():jsb.Pass; // cc::scene::Pass*
        getOcclusionQueryShader():gfx.Shader; // cc::gfx::Shader*
        getGeometryRendererMaterials():jsb.Material[]; // std::vector<cc::IntrusivePtr<cc::Material>>
        getGeometryRendererPasses():jsb.Pass[]; // std::vector<cc::scene::Pass *>
        getGeometryRendererShaders():gfx.Shader[]; // std::vector<cc::gfx::Shader *>
        getDebugRendererPass():jsb.Pass; // cc::scene::Pass*
        getDebugRendererShader():gfx.Shader; // cc::gfx::Shader*
        addRenderObject(obj: nr.RenderObject):void; // void
        clearRenderObjects():void; // void
        addValidPunctualLight(light: jsb.Light):void; // void
        clearValidPunctualLights():void; // void
        getCSMSupported():boolean; // bool
        setCSMSupported(val: boolean):void; // void
    } // endof class PipelineSceneData
    
    
    // ts : nr.BatchedItem
    // cpp: cc::pipeline::BatchedItem
    export class BatchedItem {
        // public_fields list
        vbs             : gfx.Buffer[];         // std::vector<cc::gfx::Buffer *>
        vbDatas         : string[];             // std::vector<unsigned char *>
        indexBuffer     : gfx.Buffer;           // cc::gfx::Buffer*
        indexData       : number;               // float*
        vbCount         : number;               // unsigned int
        mergeCount      : number;               // unsigned int
        ia              : gfx.InputAssembler;   // cc::gfx::InputAssembler*
        ubo             : gfx.Buffer;           // cc::gfx::Buffer*
        uboData         : Float32Array;         // std::array<float, 160>
        descriptorSet   : gfx.DescriptorSet;    // cc::gfx::DescriptorSet*
        pass            : jsb.Pass;             // cc::scene::Pass*
        shader          : gfx.Shader;           // cc::gfx::Shader*
    } // endof class BatchedItem
    
    
    // ts : nr.BatchedBuffer
    // cpp: cc::pipeline::BatchedBuffer
    export class BatchedBuffer {
        // methods list
        constructor(pass: jsb.Pass);
        destroy():void; // void
        merge(arg0: jsb.SubModel, passIdx: number, arg2: jsb.Model):void; // void
        clear():void; // void
        setDynamicOffset(idx: number, value: number):void; // void
        getBatches():nr.BatchedItem[]; // std::vector<cc::pipeline::BatchedItem>
        getPass():jsb.Pass; // cc::scene::Pass*
        getDynamicOffset():number[]; // std::vector<unsigned int>
    } // endof class BatchedBuffer
    
    
    // ts : nr.GeometryRenderer
    // cpp: cc::pipeline::GeometryRenderer
    export class GeometryRenderer {
        // methods list
        constructor();
        activate(device: gfx.Device, info: nr.GeometryRendererInfo):void; // void
        render(renderPass: gfx.RenderPass, cmdBuff: gfx.CommandBuffer, sceneData: nr.PipelineSceneData):void; // void
        destroy():void; // void
        empty():boolean; // bool
        update():void; // void
        addDashedLine(v0: jsb.Vec3, v1: jsb.Vec3, color: gfx.Color):void; // void
        addDashedLine(v0: jsb.Vec3, v1: jsb.Vec3, color: gfx.Color, depthTest: boolean):void; // void
        addLine(v0: jsb.Vec3, v1: jsb.Vec3, color: gfx.Color):void; // void
        addLine(v0: jsb.Vec3, v1: jsb.Vec3, color: gfx.Color, depthTest: boolean):void; // void
        addTriangle(v0: jsb.Vec3, v1: jsb.Vec3, v2: jsb.Vec3, color: gfx.Color):void; // void
        addTriangle(v0: jsb.Vec3, v1: jsb.Vec3, v2: jsb.Vec3, color: gfx.Color, wireframe: boolean):void; // void
        addTriangle(v0: jsb.Vec3, v1: jsb.Vec3, v2: jsb.Vec3, color: gfx.Color, wireframe: boolean, depthTest: boolean):void; // void
        addTriangle(v0: jsb.Vec3, v1: jsb.Vec3, v2: jsb.Vec3, color: gfx.Color, wireframe: boolean, depthTest: boolean, unlit: boolean):void; // void
        addQuad(v0: jsb.Vec3, v1: jsb.Vec3, v2: jsb.Vec3, v3: jsb.Vec3, color: gfx.Color):void; // void
        addQuad(v0: jsb.Vec3, v1: jsb.Vec3, v2: jsb.Vec3, v3: jsb.Vec3, color: gfx.Color, wireframe: boolean):void; // void
        addQuad(v0: jsb.Vec3, v1: jsb.Vec3, v2: jsb.Vec3, v3: jsb.Vec3, color: gfx.Color, wireframe: boolean, depthTest: boolean):void; // void
        addQuad(v0: jsb.Vec3, v1: jsb.Vec3, v2: jsb.Vec3, v3: jsb.Vec3, color: gfx.Color, wireframe: boolean, depthTest: boolean, unlit: boolean):void; // void
        addBoundingBox(aabb: jsb.AABB, color: gfx.Color):void; // void
        addBoundingBox(aabb: jsb.AABB, color: gfx.Color, wireframe: boolean):void; // void
        addBoundingBox(aabb: jsb.AABB, color: gfx.Color, wireframe: boolean, depthTest: boolean):void; // void
        addBoundingBox(aabb: jsb.AABB, color: gfx.Color, wireframe: boolean, depthTest: boolean, unlit: boolean):void; // void
        addBoundingBox(aabb: jsb.AABB, color: gfx.Color, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean):void; // void
        addBoundingBox(aabb: jsb.AABB, color: gfx.Color, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean, transform: jsb.Mat4):void; // void
        addCross(center: jsb.Vec3, size: number, color: gfx.Color):void; // void
        addCross(center: jsb.Vec3, size: number, color: gfx.Color, depthTest: boolean):void; // void
        addFrustum(frustum: jsb.Frustum, color: gfx.Color):void; // void
        addFrustum(frustum: jsb.Frustum, color: gfx.Color, depthTest: boolean):void; // void
        addCapsule(center: jsb.Vec3, radius: number, height: number, color: gfx.Color):void; // void
        addCapsule(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segmentsU: number):void; // void
        addCapsule(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segmentsU: number, hemiSegmentsV: number):void; // void
        addCapsule(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segmentsU: number, hemiSegmentsV: number, wireframe: boolean):void; // void
        addCapsule(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segmentsU: number, hemiSegmentsV: number, wireframe: boolean, depthTest: boolean):void; // void
        addCapsule(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segmentsU: number, hemiSegmentsV: number, wireframe: boolean, depthTest: boolean, unlit: boolean):void; // void
        addCapsule(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segmentsU: number, hemiSegmentsV: number, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean):void; // void
        addCapsule(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segmentsU: number, hemiSegmentsV: number, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean, transform: jsb.Mat4):void; // void
        addCylinder(center: jsb.Vec3, radius: number, height: number, color: gfx.Color):void; // void
        addCylinder(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segments: number):void; // void
        addCylinder(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segments: number, wireframe: boolean):void; // void
        addCylinder(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segments: number, wireframe: boolean, depthTest: boolean):void; // void
        addCylinder(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segments: number, wireframe: boolean, depthTest: boolean, unlit: boolean):void; // void
        addCylinder(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segments: number, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean):void; // void
        addCylinder(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segments: number, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean, transform: jsb.Mat4):void; // void
        addCone(center: jsb.Vec3, radius: number, height: number, color: gfx.Color):void; // void
        addCone(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segments: number):void; // void
        addCone(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segments: number, wireframe: boolean):void; // void
        addCone(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segments: number, wireframe: boolean, depthTest: boolean):void; // void
        addCone(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segments: number, wireframe: boolean, depthTest: boolean, unlit: boolean):void; // void
        addCone(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segments: number, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean):void; // void
        addCone(center: jsb.Vec3, radius: number, height: number, color: gfx.Color, segments: number, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean, transform: jsb.Mat4):void; // void
        addCircle(center: jsb.Vec3, radius: number, color: gfx.Color):void; // void
        addCircle(center: jsb.Vec3, radius: number, color: gfx.Color, segments: number):void; // void
        addCircle(center: jsb.Vec3, radius: number, color: gfx.Color, segments: number, depthTest: boolean):void; // void
        addCircle(center: jsb.Vec3, radius: number, color: gfx.Color, segments: number, depthTest: boolean, useTransform: boolean):void; // void
        addCircle(center: jsb.Vec3, radius: number, color: gfx.Color, segments: number, depthTest: boolean, useTransform: boolean, transform: jsb.Mat4):void; // void
        addArc(center: jsb.Vec3, radius: number, color: gfx.Color, startAngle: number, endAngle: number):void; // void
        addArc(center: jsb.Vec3, radius: number, color: gfx.Color, startAngle: number, endAngle: number, segments: number):void; // void
        addArc(center: jsb.Vec3, radius: number, color: gfx.Color, startAngle: number, endAngle: number, segments: number, depthTest: boolean):void; // void
        addArc(center: jsb.Vec3, radius: number, color: gfx.Color, startAngle: number, endAngle: number, segments: number, depthTest: boolean, useTransform: boolean):void; // void
        addArc(center: jsb.Vec3, radius: number, color: gfx.Color, startAngle: number, endAngle: number, segments: number, depthTest: boolean, useTransform: boolean, transform: jsb.Mat4):void; // void
        addPolygon(center: jsb.Vec3, radius: number, color: gfx.Color):void; // void
        addPolygon(center: jsb.Vec3, radius: number, color: gfx.Color, segments: number):void; // void
        addPolygon(center: jsb.Vec3, radius: number, color: gfx.Color, segments: number, wireframe: boolean):void; // void
        addPolygon(center: jsb.Vec3, radius: number, color: gfx.Color, segments: number, wireframe: boolean, depthTest: boolean):void; // void
        addPolygon(center: jsb.Vec3, radius: number, color: gfx.Color, segments: number, wireframe: boolean, depthTest: boolean, unlit: boolean):void; // void
        addPolygon(center: jsb.Vec3, radius: number, color: gfx.Color, segments: number, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean):void; // void
        addPolygon(center: jsb.Vec3, radius: number, color: gfx.Color, segments: number, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean, transform: jsb.Mat4):void; // void
        addDisc(center: jsb.Vec3, radius: number, color: gfx.Color):void; // void
        addDisc(center: jsb.Vec3, radius: number, color: gfx.Color, segments: number):void; // void
        addDisc(center: jsb.Vec3, radius: number, color: gfx.Color, segments: number, wireframe: boolean):void; // void
        addDisc(center: jsb.Vec3, radius: number, color: gfx.Color, segments: number, wireframe: boolean, depthTest: boolean):void; // void
        addDisc(center: jsb.Vec3, radius: number, color: gfx.Color, segments: number, wireframe: boolean, depthTest: boolean, unlit: boolean):void; // void
        addDisc(center: jsb.Vec3, radius: number, color: gfx.Color, segments: number, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean):void; // void
        addDisc(center: jsb.Vec3, radius: number, color: gfx.Color, segments: number, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean, transform: jsb.Mat4):void; // void
        addSector(center: jsb.Vec3, radius: number, color: gfx.Color, startAngle: number, endAngle: number):void; // void
        addSector(center: jsb.Vec3, radius: number, color: gfx.Color, startAngle: number, endAngle: number, segments: number):void; // void
        addSector(center: jsb.Vec3, radius: number, color: gfx.Color, startAngle: number, endAngle: number, segments: number, wireframe: boolean):void; // void
        addSector(center: jsb.Vec3, radius: number, color: gfx.Color, startAngle: number, endAngle: number, segments: number, wireframe: boolean, depthTest: boolean):void; // void
        addSector(center: jsb.Vec3, radius: number, color: gfx.Color, startAngle: number, endAngle: number, segments: number, wireframe: boolean, depthTest: boolean, unlit: boolean):void; // void
        addSector(center: jsb.Vec3, radius: number, color: gfx.Color, startAngle: number, endAngle: number, segments: number, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean):void; // void
        addSector(center: jsb.Vec3, radius: number, color: gfx.Color, startAngle: number, endAngle: number, segments: number, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean, transform: jsb.Mat4):void; // void
        addSphere(center: jsb.Vec3, radius: number, color: gfx.Color):void; // void
        addSphere(center: jsb.Vec3, radius: number, color: gfx.Color, segmentsU: number):void; // void
        addSphere(center: jsb.Vec3, radius: number, color: gfx.Color, segmentsU: number, segmentsV: number):void; // void
        addSphere(center: jsb.Vec3, radius: number, color: gfx.Color, segmentsU: number, segmentsV: number, wireframe: boolean):void; // void
        addSphere(center: jsb.Vec3, radius: number, color: gfx.Color, segmentsU: number, segmentsV: number, wireframe: boolean, depthTest: boolean):void; // void
        addSphere(center: jsb.Vec3, radius: number, color: gfx.Color, segmentsU: number, segmentsV: number, wireframe: boolean, depthTest: boolean, unlit: boolean):void; // void
        addSphere(center: jsb.Vec3, radius: number, color: gfx.Color, segmentsU: number, segmentsV: number, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean):void; // void
        addSphere(center: jsb.Vec3, radius: number, color: gfx.Color, segmentsU: number, segmentsV: number, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean, transform: jsb.Mat4):void; // void
        addTorus(center: jsb.Vec3, bigRadius: number, radius: number, color: gfx.Color):void; // void
        addTorus(center: jsb.Vec3, bigRadius: number, radius: number, color: gfx.Color, segmentsU: number):void; // void
        addTorus(center: jsb.Vec3, bigRadius: number, radius: number, color: gfx.Color, segmentsU: number, segmentsV: number):void; // void
        addTorus(center: jsb.Vec3, bigRadius: number, radius: number, color: gfx.Color, segmentsU: number, segmentsV: number, wireframe: boolean):void; // void
        addTorus(center: jsb.Vec3, bigRadius: number, radius: number, color: gfx.Color, segmentsU: number, segmentsV: number, wireframe: boolean, depthTest: boolean):void; // void
        addTorus(center: jsb.Vec3, bigRadius: number, radius: number, color: gfx.Color, segmentsU: number, segmentsV: number, wireframe: boolean, depthTest: boolean, unlit: boolean):void; // void
        addTorus(center: jsb.Vec3, bigRadius: number, radius: number, color: gfx.Color, segmentsU: number, segmentsV: number, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean):void; // void
        addTorus(center: jsb.Vec3, bigRadius: number, radius: number, color: gfx.Color, segmentsU: number, segmentsV: number, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean, transform: jsb.Mat4):void; // void
        addOctahedron(center: jsb.Vec3, radius: number, color: gfx.Color):void; // void
        addOctahedron(center: jsb.Vec3, radius: number, color: gfx.Color, wireframe: boolean):void; // void
        addOctahedron(center: jsb.Vec3, radius: number, color: gfx.Color, wireframe: boolean, depthTest: boolean):void; // void
        addOctahedron(center: jsb.Vec3, radius: number, color: gfx.Color, wireframe: boolean, depthTest: boolean, unlit: boolean):void; // void
        addOctahedron(center: jsb.Vec3, radius: number, color: gfx.Color, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean):void; // void
        addOctahedron(center: jsb.Vec3, radius: number, color: gfx.Color, wireframe: boolean, depthTest: boolean, unlit: boolean, useTransform: boolean, transform: jsb.Mat4):void; // void
        addBezier(v0: jsb.Vec3, v1: jsb.Vec3, v2: jsb.Vec3, v3: jsb.Vec3, color: gfx.Color):void; // void
        addBezier(v0: jsb.Vec3, v1: jsb.Vec3, v2: jsb.Vec3, v3: jsb.Vec3, color: gfx.Color, segments: number):void; // void
        addBezier(v0: jsb.Vec3, v1: jsb.Vec3, v2: jsb.Vec3, v3: jsb.Vec3, color: gfx.Color, segments: number, depthTest: boolean):void; // void
        addBezier(v0: jsb.Vec3, v1: jsb.Vec3, v2: jsb.Vec3, v3: jsb.Vec3, color: gfx.Color, segments: number, depthTest: boolean, useTransform: boolean):void; // void
        addBezier(v0: jsb.Vec3, v1: jsb.Vec3, v2: jsb.Vec3, v3: jsb.Vec3, color: gfx.Color, segments: number, depthTest: boolean, useTransform: boolean, transform: jsb.Mat4):void; // void
        addSpline(spline: jsb.Spline, color: gfx.Color):void; // void
        addSpline(spline: jsb.Spline, color: gfx.Color, index: number):void; // void
        addSpline(spline: jsb.Spline, color: gfx.Color, index: number, knotSize: number):void; // void
        addSpline(spline: jsb.Spline, color: gfx.Color, index: number, knotSize: number, segments: number):void; // void
        addSpline(spline: jsb.Spline, color: gfx.Color, index: number, knotSize: number, segments: number, depthTest: boolean):void; // void
        addMesh(center: jsb.Vec3, vertices: jsb.Vec3[], color: gfx.Color):void; // void
        addMesh(center: jsb.Vec3, vertices: jsb.Vec3[], color: gfx.Color, depthTest: boolean):void; // void
        addMesh(center: jsb.Vec3, vertices: jsb.Vec3[], color: gfx.Color, depthTest: boolean, useTransform: boolean):void; // void
        addMesh(center: jsb.Vec3, vertices: jsb.Vec3[], color: gfx.Color, depthTest: boolean, useTransform: boolean, transform: jsb.Mat4):void; // void
        addIndexedMesh(center: jsb.Vec3, vertices: jsb.Vec3[], indices: number[], color: gfx.Color):void; // void
        addIndexedMesh(center: jsb.Vec3, vertices: jsb.Vec3[], indices: number[], color: gfx.Color, depthTest: boolean):void; // void
        addIndexedMesh(center: jsb.Vec3, vertices: jsb.Vec3[], indices: number[], color: gfx.Color, depthTest: boolean, useTransform: boolean):void; // void
        addIndexedMesh(center: jsb.Vec3, vertices: jsb.Vec3[], indices: number[], color: gfx.Color, depthTest: boolean, useTransform: boolean, transform: jsb.Mat4):void; // void
    } // endof class GeometryRenderer
} // endof namespace nr



//  372 classes process!
