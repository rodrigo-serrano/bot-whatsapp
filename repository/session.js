const { Client, LocalAuth, LegacySessionAuth, RemoteAuth} = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { MongoStore } = require("wwebjs-mongo");

class Session {
    #store;

    constructor(mongoose)
    {
        this.#store = new MongoStore({ mongoose: mongoose });
    }

    getOrCreateSession()
    {
        let client = new Client({
            authStrategy: new RemoteAuth({
                store: this.#store,
                backupSyncIntervalMs: 300000,
                clientId: this.#store.clientId
            }),
            webVersionCache: {
                type: 'remote',
                remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
            },
            puppeteer: {
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            }
        });

        client.initialize();

        client.on('qr', code => {
            qrcode.generate(code, { small: true })
        });

        client.on('remote_session_saved', () => {
            console.log('logado')
        });

        return client;
    }
}

module.exports = { Session: Session }