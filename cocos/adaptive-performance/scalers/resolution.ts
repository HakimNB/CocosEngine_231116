import { scaler } from '../decorator';
import { Scaler } from '../scaler';
import { logger } from '../logger';
import { director } from '../../game';

@scaler('Resolution')
class ResolutionScaler extends Scaler {
    private maxWidth: number;
    private maxHeight: number;
    constructor () {
        super();
        this.updateRange(0, 20);
        const win = director.root?.curWindow;
        this.maxWidth = win!.width;
        this.maxHeight = win!.height;
    }

    onLevelChange (level: number): void {
        const scales = (level - this.minLevel) / (this.maxLevel - this.minLevel) * 0.7  + 0.3;
        const w = Math.floor(this.maxWidth * scales);
        const h = Math.floor(this.maxHeight * scales);
        const root = director.root!;
        root.resize(w, h);
        // window.devicePixelRatio = scales;
        logger.debug(`run resolution level ${level}`);
    }

    cost (): number {
        return this.levelFactor;
    }
}
