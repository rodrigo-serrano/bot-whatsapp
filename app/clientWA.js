const { AuthStrategy } = require("../strategies/client/authStrategy");
const { WAWebJS, Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

/**
 * @type { Promise<WAWebJS.Client> }
 */
const client = (async () => {
    return (new Client({
        authStrategy: await (new AuthStrategy).get(),
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
    }))
        .once('qr', (qr) => qrcode.generate(qr, {small: true}))
        .once('loading_screen', (percent, message) => console.log(`${message} - ${percent}%`))
        .once('authenticated', session => console.info('Logged'))
})();

module.exports = { client }
