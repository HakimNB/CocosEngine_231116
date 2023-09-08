/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-empty-function */
// import {sendLog as doLog} from './logger-udp';

// const doLog = console.log;
const doLog = (...args: any[]): void => { };

export namespace logger {
     export function debug (...args: any[]): void {
         doLog('[debug]', ...args);
     }
     export function info (...args: any[]): void {
         doLog('[info]', ...args);
     }
     export function warn (...args: any[]): void {
         doLog('[warn]', ...args);
     }
     export function error (...args: any[]): void {
         doLog('[error]', ...args);
     }
}
