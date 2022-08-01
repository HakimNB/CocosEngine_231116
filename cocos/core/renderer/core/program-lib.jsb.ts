import { API, } from '../../gfx';
import { legacyCC } from '../../global-exports';

export interface ITemplateInfo {
    gfxAttributes: gfx.Attribute[];
    shaderInfo: gfx.ShaderInfo;
    blockSizes: number[];
    setLayouts: gfx.DescriptorSetLayout[];
    pipelineLayout: gfx.PipelineLayout;
    handleMap: Record<string, number>;
    bindings: gfx.DescriptorSetLayoutBinding[];
    samplerStartBinding: number;
}

export interface IProgramInfo extends jsb.IShaderInfo {
    effectName: string;
    defines: jsb.IDefineRecord[];
    constantMacros: string;
    uber: boolean; // macro number exceeds default limits, will fallback to string hash
}

export function getDeviceShaderVersion (device) {
    switch (device.gfxAPI) {
    case API.GLES2:
    case API.WEBGL: return 'glsl1';
    case API.GLES3:
    case API.WEBGL2: return 'glsl3';
    default: return 'glsl4';
    }
}

export const programLib = jsb.ProgramLib.getInstance();
legacyCC.programLib = programLib;