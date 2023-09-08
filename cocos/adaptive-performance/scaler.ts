export abstract class Scaler {
    protected minLevel: number = 0;
    protected maxLevel: number = 3;
    protected defaultLevel: number = this.maxLevel;
    protected _currentLevel: number = this.maxLevel;
    private _stagedLevels: number[] = [];

    private _actived = false;
    private _interval: number = 0.2;
    private _lastScheduleTime = 0;

    protected updateRange (minLevel: number, maxLevel: number): void {
        this.minLevel = minLevel;
        this.maxLevel = maxLevel;
        this.defaultLevel = this.maxLevel; // default value
        if (this.minLevel < 0 || this.maxLevel < 0 || this.minLevel > this.maxLevel) {
            throw new Error(`Invalid minLevel: ${this.minLevel}, maxLevel: ${this.maxLevel}`);
        }
        /// clamp level
        const c = this._currentLevel;
        this.currentLevel = c > maxLevel ? maxLevel : (c < minLevel ? minLevel : c);
    }

    get interval (): number { return this._interval; }
    set interval (v: number) { this._interval = v; }

    get scalerName (): string {
        return (this.constructor as any)._scalerName as string;
    }

    markScheduleTime (t: number): void {
        this._lastScheduleTime = t;
    }

    allowScheduleInDuration (t: number): boolean {
        if (this._lastScheduleTime === 0) return true;
        return t - this._lastScheduleTime > this._interval;
    }

    get active (): boolean {
        return this._actived;
    }

    set active (act: boolean) {
        if (act === this._actived) return;
        this._actived = act;
        if (act) {
            // check previous level
            if (this._stagedLevels.length > 0) {
                // restore
                this.currentLevel = this._stagedLevels.pop()!;
            } else {
                this.currentLevel = this.defaultLevel;
            }
        } else {
            /// switch to boost mode when disable scaler?
            this._stagedLevels.push(this._currentLevel);
            this.currentLevel = this.maxLevel;
        }
    }

    public getMaxLevel (): number { return this.maxLevel; }
    public getMinLevel (): number { return this.minLevel; }
    public getCurrentLevel (): number { return this._currentLevel; }

    public boostOn (): void {
        if (!this._actived) return;
        this._stagedLevels.push(this.currentLevel);
        this.currentLevel = this.maxLevel;
    }
    public boostOff (): void {
        if (!this._actived) return;
        this.currentLevel = this._stagedLevels.pop()!;
    }

    private set currentLevel (level: number) {
        if (this._currentLevel === level) return;
        if (level > this.maxLevel) level = this.maxLevel;
        if (level < this.minLevel) level = this.minLevel;
        this._currentLevel = level;
        if (this._actived) {
            this.onLevelChange(level);
        }
    }
    private get currentLevel (): number { return this._currentLevel; }

    public increaseLevel (): boolean {
        return this.increaseLevelBy(1);
    }
    public decreaseLevel (): boolean {
        return this.decreaseLevelBy(1);
    }

    public increaseLevelBy (level: number): boolean {
        if (this._currentLevel === this.maxLevel) return false;
        this.currentLevel += level;
        return true;
    }
    public decreaseLevelBy (level: number): boolean {
        if (this._currentLevel === this.minLevel) return false;
        this.currentLevel -= level;
        return true;
    }

    get levelFactor (): number { return (this.currentLevel - this.minLevel) / (this.maxLevel - this.minLevel); }

    abstract onLevelChange(level: number): void;
    abstract cost(): number;
}
