import { ThermalLevel } from './enums';
import { generateSinLevels } from './dev';

export class ThermalManager {
    getThremalLevel (): ThermalLevel {
        //TODO
        // simulate
        return generateSinLevels();
    }
}
