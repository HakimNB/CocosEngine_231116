
import * as dgram from 'dgram';

const client = dgram.createSocket('udp4');

// const HOST = 'localhost';
const HOST = '127.0.0.1';
const PORT = 3011;
// const HOST = '192.168.52.165';
// const PORT = 6666;

export function sendLog(...args: any[]): void {
    client.send(args.map(x => x.toString()).join(' ') + '\n', PORT, HOST, (err) => {
        if (err) {
            console.error(`sendLog[${HOST}:${PORT}]: ` + err);
        }
    });
}