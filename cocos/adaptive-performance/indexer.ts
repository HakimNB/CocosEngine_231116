/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable new-cap */
import { BottleneckType, ThermalLevel } from './enums';
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

    update (dt: number, targetLevel: ThermalLevel): void {
        logger.debug(`update indexer ${dt}, level ${targetLevel}`);
        this._indexerTime += dt;
        const ma = this._movingAverage;
        const pt = this._predictor;
        const ftLowerBound = pt.targetFrameTime * 0.9;
        ma.record(pt.predict());
        const thermalLevel = ma.thermalValueToLevel();

        if (targetLevel === ThermalLevel.Critical) {
            this.increaseLevel(1);
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

        const trends = ma.getThermalTrends();
        const deltaLevels = (trends === ThermalTrends.FastDecrease || trends === ThermalTrends.FastIncrease) ? 2 : 1;

        if (ma.getFrameTimeEMA() <= ftLowerBound) {
            if (thermalLevel <= targetLevel) {
                this.increaseLevel(deltaLevels);
            }
            // TODO: limit thermal
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
        const frameTime = ma.getFrameTime() * 1000;
        const frameTimeEMA = ma.getFrameTimeEMA() * 1000;
        const cpuTime = ma.getCPUTime() * 1000;
        return {
            theramlLevel: ma.thermalValueToLevel(),
            thermalValue: ma.getThermal(),
            thermalTrends: ma.getThermalTrends(),
            cpuTime,
            frameTime,
            frameTimeEMA,
            gpuTime: frameTime - cpuTime,
            bottleneck: ma.getBottleneckValue(),
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

enum ThermalTrends {
    FastDecrease,  // 有比较多的计算空余
    Decrease,  // 有少量空余
    Balanced,  // 平衡
    Increase,   // 有少量空余
    FastIncrease // 需要释放
}

const MaxRecords = 10; // samples
const MinRecords = 3;

const offsetIndex = (idx: number, offset: number): number => (idx + offset + MaxRecords) % MaxRecords;

class CycleArray<T> {
    private data: T[] = [];
    private curr: number = 0;

    constructor (size: number, initValue: T) {
        this.data.length = size;
        for (let i = 0; i < size; i++) this.data[i] = initValue;
    }

    public push (v: T): void {
        this.data[this.curr] = v;
        this.curr = (this.curr + 1) % this.data.length;
    }

    get raw (): T[] { return this.data; }
}

class MovingAverage {
    private thermalRecords: number[] = [];
    private recordIndex = 0;
    private thermalValueEMA = 0; // value range : 0 ~ 1.0
    private thermalValue = 0; // value range : 0 ~ 1.0

    private thermalMALongTerm = 0;
    private thermalMAShortTerm = 0;

    private frameTime = 0;
    private cpuTime = 0;

    private frameTimeEMA = 0;
    private bottleneckRecords: CycleArray<BottleneckType> = new CycleArray(3, BottleneckType.NONE);

    constructor () {
        this.thermalRecords.length = MaxRecords;
        for (let i = 0; i < MaxRecords; i++) {
            this.thermalRecords[i] = 0;
        }
    }

    getThermalTrends (): ThermalTrends {
        const longTermStress = this.thermalMALongTerm / MaxRecords;
        const shortTermStress = this.thermalMAShortTerm / MinRecords;
        const diff = shortTermStress - longTermStress;
        logger.debug(`stress trends: ${diff}`);
        if (diff > 0.05) { /// stress increasing
            if (diff > 0.2) {
                return ThermalTrends.FastIncrease;
            }
            return ThermalTrends.Increase;
        }

        if (diff < -0.05) { // stress decreasing
            if (diff < -0.2) {
                return ThermalTrends.FastDecrease;
            }
            return ThermalTrends.Decrease;
        }
        return ThermalTrends.Balanced;
    }

    //
    thermalValueToLevel (): ThermalLevel {
        if (this.thermalValueEMA > 0.9) {
            return ThermalLevel.Critical;
        }
        if (this.thermalValueEMA > 0.8) {
            return ThermalLevel.WarningLevel2;
        }
        if (this.thermalValueEMA > 0.6) {
            return ThermalLevel.WarningLevel1;
        }
        return ThermalLevel.NoWarning;
    }

    getThermalEMA (): number {
        return this.thermalValueEMA;
    }

    getThermal (): number {
        return this.thermalValue;
    }

    getFrameTime (): number {
        // FIXME: dev only
        return this.frameTime;
    }

    getCPUTime (): number {
        // FIXME: dev only
        return this.cpuTime;
    }

    getThermalMALongTerm (): number {
        // FIXME: dev only
        return this.thermalMALongTerm / MaxRecords;
    }
    getThermalMAShortTerm (): number {
        // FIXME: dev only
        return this.thermalMAShortTerm / MinRecords;
    }

    getFrameTimeEMA (): number {
        return this.frameTimeEMA;
    }

    getBottleneckValue (): BottleneckType {
        return this.bottleneckRecords.raw.reduce((p, c) => p & c, BottleneckType.ALL);
    }

    record (prid: InstantPredictor): void {
        const { bottleneck, frameTime, thermalValue, cpuTime, frameTimeEMA } = prid;
        this.frameTime = frameTime;
        this.cpuTime = cpuTime;
        this.frameTimeEMA = frameTimeEMA;
        const curr = this.recordIndex;
        this.thermalMALongTerm = this.thermalMALongTerm - this.thermalRecords[curr] + thermalValue;
        this.thermalMAShortTerm = this.thermalMAShortTerm - this.thermalRecords[offsetIndex(curr, -MinRecords)] + thermalValue;
        this.thermalRecords[curr] = thermalValue;
        this.bottleneckRecords.push(bottleneck);
        this.recordIndex = offsetIndex(curr, 1);
        this.thermalValue = thermalValue;
        this.thermalValueEMA = thermalValue * 0.1 + 0.9 * this.thermalValueEMA;
    }
}
