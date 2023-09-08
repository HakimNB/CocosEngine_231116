import { scaler, Scaler } from '../../adaptive-performance';
import { PhysicsSystem } from './physics-system';

@scaler('Physics')
class PhysicsScaler extends Scaler {
    fixedTimeStep: number = 1 / 20;

    constructor () {
        super();
        this.updateRange(0, 2);
    }

    onLevelChange (level: number): void {
        const phy = PhysicsSystem.instance;
        if (!phy || !phy.enable) return;
        switch (level) {
        case 0:
            phy.fixedTimeStep = 1 / 20;
            break;
        case 1:
            phy.fixedTimeStep = 1 / 30;
            break;
        default:
            phy.fixedTimeStep = 1 / 60;
        }
    }

    cost (): number {
        return this.levelFactor;
    }
}
