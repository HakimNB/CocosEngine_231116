declare let astack: ArrayBuffer;
export namespace stack {

    export enum ArgumentType {
        FLOAT,
        INT32,
    };

    const intarr = new Int32Array(astack);
    const floatarr = new Float32Array(astack);

    export function pushInt(i: number) {
        intarr[intarr[0]] = i;
        intarr[0] += 1;
    } 

    export function pushFloat(f: number) {
        floatarr[intarr[0]] = f;
        intarr[0] += 1;
    }
    export function popInt(): number {
        intarr[0] -= 1;
        return intarr[intarr[0]];
    }
    export function popFloat(): number {
        intarr[0] -= 1;
        return floatarr[intarr[0]];
    }

    export function bindFunction( proto: any, fnName:string, returnType: ArgumentType[], ... argTypes: ArgumentType[][]) {
        let oldFunc = proto[fnName];
        let fnMap:{[key:number]:()=>void} = {};
        const signCnt = argTypes.length;
        for(let i = 0;i < signCnt ;i++) {
            const args = argTypes[i];
            fnMap[args.length] = function() {
                for(let i = arguments.length - 1; i >=0 ;i--) {
                    if(args[i] == ArgumentType.FLOAT) {
                        pushFloat(arguments[i]);
                    }else {
                        pushInt(arguments[i]);
                    }
                }
            }
        }
        proto[fnName] = function() {
            (fnMap[arguments.length]||fnMap[Object.keys(fnMap)[0]]).apply(this, Array.prototype.slice.apply(arguments));
            pushInt(arguments.length);
            oldFunc.apply(this);
            if(returnType.length > 0) {
                // TODO(PatriceJiang): only one argument suppoerted
                return returnType[0] == ArgumentType.FLOAT ? popFloat() : popInt();
            }
        };
    }
}
