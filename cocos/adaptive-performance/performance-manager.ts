/* eslint-disable @typescript-eslint/no-empty-function */
import { ThermalLevel }  from './enums';
import { Indexer } from './indexer';
import type { IndexerConfig } from './indexer';
import { logger } from './logger';
import { InspectorClient } from './inspector';
import { legacyCC } from '../core/global-exports';
import { Director, director } from '../game';
import { profiler } from './profiler';

interface PerformanceManagerConfig {
    indexer: IndexerConfig;
}

export class PerformanceManager {
    private _enabled = false;
    private _paused = true;
    private _inited = false;
    private _running = false;

    private _indexer?: Indexer;

    private _targetLevel: ThermalLevel = ThermalLevel.Critical;

    private _config?: PerformanceManagerConfig;
    private _inspectorClient?: InspectorClient;
    private _evFrameEnd;

    protected init (): void {
        if (this._inited) return;
        this._inited = true;
        this.onInit();
    }

    protected onInit (): void {
        this._indexer = new Indexer(this._config!.indexer);
        // todo: create if enabled
        this._inspectorClient = new InspectorClient();
        this._inspectorClient.init();
    }

    protected onStart (): void {
        let dt = (new Date()).getTime();
        this._evFrameEnd = director.on(Director.EVENT_END_FRAME, () => {
            const now = (new Date()).getTime();
            this.update((now - dt) / 1000);
            dt = now;
        });
        profiler.enabled =  true;
    }

    protected onPause (): void {
    }

    protected onResume (): void {

    }

    protected onStop (): void {
        if (this._evFrameEnd) {
            director.off(Director.EVENT_END_FRAME, this._evFrameEnd);
            this._evFrameEnd = null;
        }
        profiler.enabled =  false;
        if (this._inspectorClient) {
            this._inspectorClient.close();
        }
    }

    protected onUpdate (dt: number): void {
        this._indexer?.update(dt, this._targetLevel);
    }

    private start (): void {
        this.init();
        if (this._running) return;
        this._running = true;
        this.onStart();
        this.resume();
    }

    private stop (): void {
        if (!this._running) return;
        this._running = false;
        this.onStop();
    }

    private pause (): void {
        if (!this._paused) return;
        this._paused = true;
        this.onPause();
    }

    private resume (): void {
        if (!this._paused) return;
        this._paused = false;
        this.onResume();
    }

    set enabled (value: boolean) {
        if (this._enabled === value) return;
        this._enabled = value;
        if (this._enabled) {
            this.start();
        } else {
            this.stop();
        }
    }

    get enabled (): boolean {
        return this._enabled;
    }

    set runningLevel (level: ThermalLevel) {
        this._targetLevel = level;
    }

    public update (dt: number): void {
        logger.debug(`performance_manager_update: ${this._paused} ${this._running} ${this._paused}`);
        if (this._enabled && this._running && !this._paused) {
            this.onUpdate(dt);
        } else {
            return;
        }
        const inspectData = this.inspect();
        logger.debug(`inspect:`, JSON.stringify(inspectData));
        this._inspectorClient?.send(JSON.stringify(inspectData));
    }

    public loadConfig (config: PerformanceManagerConfig): void {
        //TODO:
        this._config = config;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    private inspect () {
        return {
            enabled: this._enabled,
            ...this._indexer!.inspect(),
        };
    }
}

legacyCC.PerformanceManager = PerformanceManager;
