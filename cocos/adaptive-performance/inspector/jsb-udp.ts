/* eslint-disable @typescript-eslint/no-empty-function */
export class InspectorClient {
    private host: string;
    private port: number;

    constructor (host: string, port: number) {
        this.host = host;
        this.port = port;
    }

    connect (): void { }

    send (msg: string): void {
        jsb.sendUDP(this.host, this.port, msg);
    }
}
