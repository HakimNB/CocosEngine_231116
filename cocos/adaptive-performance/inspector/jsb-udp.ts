/* eslint-disable @typescript-eslint/no-empty-function */

export class InspectorClient {
    private fd?: number;
    private checkInterval?: number;
    private host?: string = '192.168.52.139';
    private port?: number = 4000;
    private token?: string;

    constructor () {
    }

    init (): void {
        this.fd = jsb.listenUDP(9933);
        this.checkInterval = setInterval(() => {
            if (this.fd !== undefined && this.fd > 0) {
                const data = jsb.recvUDP(this.fd);
                if (data && data.length > 0) {
                    this.handleServer(data);
                }
            }
        }, 1500);
    }

    close (): void {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
        }
        if (this.fd) {
            jsb.unlistenUDP(this.fd);
        }
    }

    send (msg: string): void {
        if (this.host && this.port) {
            jsb.sendUDP(this.host, this.port, msg);
        }
    }

    private handleServer (list: { data: ArrayBuffer, ip: string, port: number }[]): void {
        const d = new TextDecoder();
        try {
            const data = list[list.length - 1];
            const str = d.decode(data.data);
            if (str.startsWith('cocos-adaptive-performance;')) {
                this.token = str.split(';')[1];
                /// TODO: validation ..
                this.host = data.ip;
                this.port = data.port;
            }
            // eslint-disable-next-line no-empty
        } catch (e) {

        }
    }
}
