import { ThermalLevel } from '../enums';
import { profiler } from '../profiler';

export function generateSinLevels (): number {
    const info = jsb.thermalInfo;
    if (!info) return ThermalLevel.NoWarning;
    const s = info.thermalStatus();
    if (s > 0.8) {
        return ThermalLevel.Critical;
    }
    if (s > 0.5) {
        return ThermalLevel.WarningLevel2;
    }
    if (s > 0.3) {
        return ThermalLevel.WarningLevel1;
    }
    return ThermalLevel.NoWarning;
}

export function generateFrameTime (): { frameTime: number, cpuTime: number, gpuTime: number, thermalValue: number } {
    const frameTime = profiler.frameTime / 1000; // seconds
    const gpuTime = profiler.gpuTime  / 1000; // seconds
    const cpuTime = profiler.cpuTime  / 1000; //seconds
    const thermalValue = jsb.thermalInfo?.thermalValue();
    return { frameTime, gpuTime, cpuTime, thermalValue: thermalValue! };
}
