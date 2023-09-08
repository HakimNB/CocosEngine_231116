/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable new-cap */
import { BottleneckType, PerformanceLevel,  ThermalLevel } from './enums';
import { PerformancePredictor, InstantPredictor } from './performance-predictor';
import { Scaler } from './scaler';
import { logger } from './logger';

export interface ScalerConfig {
    name: string;
    values: Record<string, any>;
}

export interface IndexerConfig {
    scalers: ScalerConfig[];
    interval: number;
}

interface ScalerCtor<T extends Scaler> { new(...args: any[]): T, _scalerName: NamedCurve, _scalerPrority: number }
const allScalers: Map<string, { priority: number, ctor: ScalerCtor<any> }[]> = new Map();

export function registerScalerType (name: string, priority: number, ctor: ScalerCtor<any>): void {
    if (!allScalers.has(name)) {
        allScalers.set(name, []);
    }
    const arr = allScalers.get(name)!;
    // TODO: detect duplication item
    arr.push({ priority, ctor });
    arr.sort((a, b) => a.priority - b.priority);

    logger.info(`registerScaler ${name} with priority ${priority}, ctor: ${ctor.name}`);
}

function loadCfgForScaler (scaler: Scaler, cfg: ScalerConfig): void {
    for (const k in cfg.values) {
        // eslint-disable-next-line no-prototype-builtins
        if (!cfg.values.hasOwnProperty(k)) return;
        (scaler as any)[k] = cfg.values[k];
    }
}

export class Indexer {
    private _predictor: PerformancePredictor;
    private _config: IndexerConfig;
    private _allScalers: Scaler[] = [];
    private _activeScalers: Scaler[] = [];
    private _disactivedScalers: Scaler[] = [];
    private _movingAverage: MovingAverage;
    private _scheduleInterval: number = 1;
    private _indexerTime: number;
    constructor (config: IndexerConfig) {
        this._predictor = new PerformancePredictor();
        this._movingAverage = new MovingAverage();
        this._config = config;
        this._indexerTime = 0;

        for (const s of allScalers) {
            this._allScalers.push(new s[1][0].ctor());
        }
        this.loadScalerConfig();
    }

    private loadScalerConfig (): void {
        const config = this._config;
        this._activeScalers.length = 0;
        this._scheduleInterval = config.interval;
        this._disactivedScalers.length = 0;
        for (const scaler of this._allScalers) {
            for (const cfg of config.scalers) {
                if (cfg.name === (scaler as any).constructor._scalerName) {
                    if (cfg.values.active === true) {
                        this._activeScalers.push(scaler);
                        loadCfgForScaler(scaler, cfg);
                    } else {
                        this._disactivedScalers.push(scaler);
                    }
                }
            }
        }
        this.sortScalers();
    }

    private sortScalers (): void {
        this._activeScalers.sort((a, b) => a.cost() - b.cost());
    }

    private increaseLevelByOne (): boolean {
        const now = this._indexerTime;
        let done = false;
        for (let i = 0, l = this._activeScalers.length; i < l; i++) {
            const s = this._activeScalers[i];
            if (s.allowScheduleInDuration(now)) {
                if (s.increaseLevel()) {
                    logger.debug(`  increasing level for ${s.constructor.name}`);
                    s.markScheduleTime(now);
                    done = true;
                    break;
                }
            }
        }
        return done;
    }

    private decreaseLevelByOne (): boolean {
        const now = this._indexerTime;
        let done = false;
        for (let i = this._activeScalers.length - 1; i >= 0; i--) {
            const s = this._activeScalers[i];
            if (s.allowScheduleInDuration(now)) {
                if (s.decreaseLevel()) {
                    logger.debug(`  decreasing level for ${s.constructor.name}`);
                    s.markScheduleTime(now);
                    done = true;
                    break;
                }
            }
        }
        return done;
    }

    increaseLevel (level: number): void {
        logger.debug(`Try increase Level by ${level}`);
        while (level > 0) {
            this.increaseLevelByOne();
            level--;
        }
    }

    decreaseLevel (level: number): void {
        logger.debug(`Try decrease Level by ${level}`);
        while (level > 0) {
            this.decreaseLevelByOne();
            level--;
        }
    }

    update (dt: number, targetLevel: PerformanceLevel): void {
        logger.debug(`update indexer ${dt}, level ${targetLevel}`);
        this._indexerTime += dt;
        const ma = this._movingAverage;
        const pt = this._predictor;
        const ftLowerBound = pt.targetFrameTime * 0.9;
        ma.record(pt.predict());
        const performanceLevel = ma.getPerformanceLevel();

        if (targetLevel === PerformanceLevel.BOOST) {
            this.increaseLevel(1);
            return;
        }

        this._scheduleInterval -= dt;
        // Avoid Frequent Scheduling
        if (this._scheduleInterval > 0) return;
        this._scheduleInterval = this._config.interval;

        this.sortScalers();
        // In different modes, the interpretation of "stress" varies. For example,
        // in Boost Mode, even if the stress level is at 1, you can still increase
        // the number of active modules. However, in Lower Power Mode, a stress
        // level of just 0.5 might necessitate the deactivation of some modules to
        //  conserve energy.

        const trends = ma.getTrends();
        const deltaLevels = (trends === StressLevel.FastDecrease || trends === StressLevel.FastIncrease) ? 2 : 1;

        if (ma.getFrameTimeMa() <= ftLowerBound) {
            if (performanceLevel <= targetLevel) {
                this.increaseLevel(deltaLevels);
            }
            return;
        }

        // if (performanceLevel <= targetLevel) {
        // this.increaseLevel(deltaLevels);
        // return;
        // }

        // if (performanceLevel > targetLevel) {
        this.decreaseLevel(deltaLevels);
        // }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    inspect () {
        const ma = this._movingAverage;
        return {
            stressValue: ma.getStress(),
            stressLevel: ma.getPerformanceLevel(),
            stressTrends: ma.getTrends(),
            frameTime: ma.getFrameTime() * 1000,
            cpuTime: ma.getCPUTime() * 1000,
            thermalLevel: ma.getThermalLevel(),
            maMax: ma.getStressMaMax(),
            maMin: ma.getStressMaMin(),
            currentStress: ma.getCurrentStress(),
            scalers: this._allScalers.map((x) => ({
                name: x.scalerName,
                active: x.active,
                minLevel: x.getMinLevel(),
                maxLevel: x.getMaxLevel(),
                level: x.getCurrentLevel(),
                cost: x.cost(),
            })),
        };
    }
}

enum StressLevel {
    FastDecrease,  // 有比较多的计算空余
    Decrease,  // 有少量空余
    Balanced,  // 平衡
    Increase,   // 有少量空余
    FastIncrease // 需要释放
}

const MaxRecords = 10; // samples
const MinRecords = 3;

const offsetIndex = (idx: number, offset: number): number => (idx + offset + MaxRecords) % MaxRecords;

class MovingAverage {
    private stressRecords: number[] = [];
    private stressIndex = 0;
    private stressValue = 0; // value range : 0 ~ 1.0

    private stressMovingSumMax = 0;
    private stressMovingSumMin = 0;

    private frameTime = 0;
    private cpuTime = 0;
    private thermalLevel: ThermalLevel = 0;
    private currentStress: number = 0;

    private frameTimeMa = 0;

    constructor () {
        this.stressRecords.length = MaxRecords;
        for (let i = 0; i < MaxRecords; i++) {
            this.stressRecords[i] = 0;
        }
    }

    getTrends (): StressLevel {
        const longTermStress = this.stressMovingSumMax / MaxRecords;
        const shortTermStress = this.stressMovingSumMin / MinRecords;
        const diff = shortTermStress - longTermStress;
        logger.debug(`stress trends: ${diff}`);
        if (diff > 0.05) { /// stress increasing
            if (diff > 0.2) {
                return StressLevel.FastIncrease;
            }
            return StressLevel.Increase;
        }

        if (diff < -0.05) { // stress decreasing
            if (diff < -0.2) {
                return StressLevel.FastDecrease;
            }
            return StressLevel.Decrease;
        }
        return StressLevel.Balanced;
    }

    //
    getPerformanceLevel (): PerformanceLevel {
        const stress = this.stressValue;
        if (stress > 0.9) {
            return PerformanceLevel.BOOST;
        }
        if (stress > 0.8) {
            return PerformanceLevel.HIGH_PERFORMANCE;
        }
        if (stress > 0.6) {
            return PerformanceLevel.MEDIUM_PERFORMANCE;
        }
        if (stress > 0.3) {
            return PerformanceLevel.LOW_PERFORMANCE;
        }
        return PerformanceLevel.POWER_SAVE;
    }

    getStress (): number {
        return this.stressValue;
    }

    getFrameTime (): number {
        // FIXME: dev only
        return this.frameTime;
    }

    getCPUTime (): number {
        // FIXME: dev only
        return this.cpuTime;
    }

    getThermalLevel (): number {
        // FIXME: dev only
        return this.thermalLevel;
    }

    getStressMaMax (): number {
        // FIXME: dev only
        return this.stressMovingSumMax / MaxRecords;
    }
    getStressMaMin (): number {
        // FIXME: dev only
        return this.stressMovingSumMin / MinRecords;
    }

    getCurrentStress (): number {
        // FIXME: dev only
        return this.currentStress;
    }

    getFrameTimeMa (): number {
        return this.frameTimeMa;
    }

    record (prid: InstantPredictor): void {
        const newStress = this.updateStress(prid);
        const curr = this.stressIndex;
        this.currentStress = newStress;
        this.stressMovingSumMax = this.stressMovingSumMax - this.stressRecords[curr] + newStress;
        this.stressMovingSumMin = this.stressMovingSumMin - this.stressRecords[offsetIndex(curr, -MinRecords)] + newStress;
        this.stressRecords[curr] = newStress;
        this.stressIndex = offsetIndex(curr, 1);
        this.stressValue = newStress * 0.1 + 0.9 * this.stressValue;
    }

    private updateStress (prid: InstantPredictor): number {
        const { thermalLevel, bottleneck, frameTime, thermalValue, cpuTime } = prid;
        // const thermalValue = this.cvtThermalLevel(thermalLevel);
        const bottleneckValue = this.cvtBottleneckValue(bottleneck);
        this.frameTime = frameTime;
        this.cpuTime = cpuTime;
        this.thermalLevel = thermalLevel;
        this.frameTimeMa = frameTime * 0.3  + 0.7 * this.frameTime;
        return 0.8 * thermalValue! + 0.2 * bottleneckValue;
    }

    private cvtBottleneckValue (level: BottleneckType): number {
        switch (level) {
        case BottleneckType.NONE:
            return 0;
        case BottleneckType.CPU:
            return 0.33;
        case BottleneckType.GPU:
            return 0.66;
        default:
            return 1.0;
        }
    }
}
