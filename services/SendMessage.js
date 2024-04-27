const { Session } = require("../repository/session");
const { WAWebJS, MessageMedia } = require("whatsapp-web.js");
const { mongoDb, mongoose } = require('../database/mongo.js')
const qrcode = require("qrcode-terminal");

class SendMessage
{
    /**
     *
     * @param content {{ message: ?string, img: ?string }}
     * @param groupId
     */
    async execute(groupId, content)
    {
        await mongoDb;
        const session = new Session(mongoose);
        /**
         * @var { WAWebJS.Client }
         */
        const client = session.getOrCreateSession();

        client.on('loading_screen', (percent, message) => console.info(`Loading ${percent}% - ${message}`));

        const media = await MessageMedia.fromUrl(content.img);
        client.once('ready', async () => {
            console.log('Enviando mensagem...')
            const sent = await client.sendMessage(groupId, media, {
                caption: content.message +
                 "\n\n\n\n Mande \"CUPOM\" para receber os cupons do dia"
            });
            console.log('Mensagem enviada', sent.body)
        });

        return { "success": true };

        // "🚨️ OLHA ESSA PROMOÇÃO !! \n " +
        // "Notebook Dell Inspiron I15-I1300-M30S 15.6\" \n " +
        // " - Full HD 13ª \n" +
        // " - Intel Core i7 \n" +
        // " - 16GB \n" +
        // " - 1TB SSD \n" +
        // " - NVIDIA MX550 \n\n" +
        // "De ~R$ 6.129,00~ \n" +
        // "Por *R$ 5.822,55* \n\n" +
        // "💵️ https://www.magazineluiza.com.br/notebook-dell-inspiron-i15-i1300-m30s-15-6-full-hd-13a-gen-intel-core-i7-16gb-1tb-ssd-nvidia-mx550-win-11-prata/ \n\n\n" +
        // "Mande \"CUPOM\" para receber os cupons do dia \n\n\n" +
    }
}

module.exports = { SendMessage }
