import { Client } from "whatsapp-web.js";
import * as qrcode from 'qrcode-terminal';
import Auth from "../strategies/client/auth";

export class WAClient {
    public static async getClient(): Promise<Client> {
        return (new Client({
            authStrategy: await (new Auth).get(),
            webVersionCache: {
                type: 'remote',
                remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
            },
            puppeteer: {
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--unhandled-rejections=strict',
                ],
            }
        })).once('qr', (qr) => qrcode.generate(qr, {small: true}))
            .once('loading_screen', (percent, message) => console.log(`${message} - ${percent}%`))
            .once('authenticated', session => console.info('Logged'));
    }
}