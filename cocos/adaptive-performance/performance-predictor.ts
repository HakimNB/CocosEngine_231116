import { game } from '../game';
import { generateFrameTime } from './dev';
import { ThermalLevel, BottleneckType } from './enums';
import { ThermalManager } from './thermal-manager';

export interface InstantPredictor {
    thermalLevel: ThermalLevel;
    thermalValue?: number;
    bottleneck: BottleneckType;
    gpuTime: number;
    cpuTime: number;
    frameTime: number;
}

export class PerformancePredictor {
    private thermalMgr = new ThermalManager();

    get targetFrameTime (): number {
        const frameRate = typeof game.frameRate === 'string' ? Number.parseFloat(game.frameRate) : game.frameRate;
        return 1 / frameRate;
    }
    predict (): InstantPredictor {
        // TODO:
        const ft = generateFrameTime();
        let bottleneck = BottleneckType.NONE;
        const tft = this.targetFrameTime;
        const cpuBound = ft.cpuTime >= tft;
        const gpuBound = ft.gpuTime >= tft;
        if (cpuBound && gpuBound) {
            bottleneck = BottleneckType.ALL;
        } else if (cpuBound) {
            bottleneck = BottleneckType.CPU;
        } else if (gpuBound) {
            bottleneck = BottleneckType.GPU;
        }
        return {
            thermalLevel: this.thermalMgr.getThremalLevel(),
            bottleneck,
            ...ft,
        };
    }
}
