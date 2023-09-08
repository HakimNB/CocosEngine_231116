
import { PassThrough } from 'stream';
import { ThermalLevel } from '../enums';

const startTime = (new Date).getTime();

function getPastTime() {
    const nowTime = (new Date).getTime();
    const past = (nowTime - startTime) / 1000;
    return past;
}

export function generateSinLevels() {
    const s = Math.sin(getPastTime()/5) / 2 + 0.5;
    if (s > 0.8) {
        return ThermalLevel.Critical;
    }
    if (s > 0.5) {
        return ThermalLevel.WarningLevel2;
    }
    if (s > 0.3) {
        return ThermalLevel.WarningLevel1;
    }
    return ThermalLevel.NoWarning;
}

export function generateFramTime(): {frameTime:number, cpuTime:number, gpuTime:number} {        
    const fx = (x:number) => Math.cos(x / 10) * 30 + 32;
    const tx = (x:number) => (Math.sin(x * 3.3)/2 + 0.5) * 0.9 + 0.1;
    const pastTime = getPastTime();
    const frameTime = fx(pastTime);
    const cpuTime = frameTime * tx(pastTime);
    const gpuTime = frameTime - cpuTime;
    return {frameTime, gpuTime, cpuTime};
}