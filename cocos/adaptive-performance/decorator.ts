/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { PriorityLevel } from './enums';
import type { Scaler } from './scaler';
import { registerScalerType } from './indexer';

export function scaler<T extends Scaler> (name: string, priority: number | PriorityLevel = PriorityLevel.LOW) {
    return function whatEver (ctor: { new(...args: any[]): T }): any {
        (ctor as any)._scalerName = name;
        (ctor as any)._priority = name;
        registerScalerType(name, priority, ctor as any);
        return ctor;
    };
}
