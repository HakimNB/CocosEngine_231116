import { Director, director } from '../game';

class Profiler {
    private _eventsToClose: {(): void}[] = [];
    private _enabled = false;
    public frameTime = 0;
    public gpuTime = 0;
    public cpuTime = 0;
    private registerEvents (): void {
        const setupEvent = (event: string, cb: () => void): void => {
            director.on(event, cb, this);
            const close =  (): void => {
                director.off(event, cb);
            };
            this._eventsToClose.push(close);
        };
        let beforeUpdate = 0;
        let afterRender = 0;
        setupEvent(Director.EVENT_BEFORE_UPDATE, () => {
            beforeUpdate = performance.now();
        });
        setupEvent(Director.EVENT_AFTER_RENDER, () => {
            afterRender = performance.now();
        });
        setupEvent(Director.EVENT_AFTER_DRAW, () => {
            const afterDraw = performance.now();
            this.gpuTime = afterDraw - afterRender;
            this.frameTime = performance.now() - beforeUpdate;
            this.cpuTime = this.frameTime - this.gpuTime;
        });
    }

    private unregisterEvents (): void {
        this._eventsToClose.forEach((e) => e());
        this._eventsToClose.length = 0;
    }

    public set enabled (enabled: boolean) {
        if (enabled === this._enabled) return;
        if (enabled)  this.registerEvents();
        else  this.unregisterEvents();
    }


    public get enabled () { return this._enabled; }
}

export const profiler = new Profiler();
