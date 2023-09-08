import * as dgram from 'dgram';

export class InspectorClient {
    private host: string;
    private port: number;
    private pendingMessages: string[];
    private _connected = false;
    private _socket?: dgram.Socket;

    constructor (host: string, port: number) {
        this.host = host;
        this.port = port;
        this.pendingMessages = [];
    }

    connect (): void {
        this._connected = true;
        this._socket = dgram.createSocket('udp4');
    }

    send (message: string): void {
        if (!this._connected) {
            this.pendingMessages.push(message);
            return;
        }
        if (this.pendingMessages.length > 0) {
            const pending = this.pendingMessages;
            this.pendingMessages = [];
            pending.forEach((m) => this.doSend(m));
        }
        this.doSend(message);
    }

    private doSend (message: any) {
        this._socket.send(message, this.port, this.host, (err) => {
            if (err) {
                console.error(`inspect send: ${err}`);
            }
        });
    }

    on (msgType: string, callback: (data) => {}) {

    }
}
