import { game } from '../game';
import { generateFrameTime } from './dev';
import { ThermalLevel, BottleneckType } from './enums';
import { ThermalManager } from './thermal-manager';

export interface InstantPredictor {
    thermalLevel: ThermalLevel;
    thermalValue: number;
    bottleneck: BottleneckType;
    gpuTime: number;
    cpuTime: number;
    frameTime: number;
    frameTimeEMA: number;
}

const HistoryFactor = 0.9;
const CurrentFactor = 1 - HistoryFactor;

export class PerformancePredictor {
    private thermalMgr = new ThermalManager();
    private frameTimeEMA = 0;
    private cpuTimeEMA = 0;
    private gpuTimeEMA = 0;

    get targetFrameTime (): number {
        const frameRate = typeof game.frameRate === 'string' ? Number.parseFloat(game.frameRate) : game.frameRate;
        return 1 / frameRate;
    }

    public predict (): InstantPredictor {
        // TODO:
        const { cpuTime, gpuTime, frameTime, thermalValue } = generateFrameTime();

        this.cpuTimeEMA = CurrentFactor * cpuTime + HistoryFactor * this.cpuTimeEMA;
        this.gpuTimeEMA = CurrentFactor * gpuTime + HistoryFactor * this.gpuTimeEMA;
        this.frameTimeEMA = CurrentFactor * frameTime + HistoryFactor * this.frameTimeEMA;

        let bottleneck = BottleneckType.NONE;
        const tft = this.targetFrameTime;
        const cpuBound = this.cpuTimeEMA >= tft;
        const gpuBound = this.gpuTimeEMA >= tft;
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
            gpuTime,
            cpuTime,
            frameTime,
            thermalValue,
            frameTimeEMA: this.frameTimeEMA,
        };
    }
}
