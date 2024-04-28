const WA = require('../external/clientWA');
const {MessageMedia} = require("whatsapp-web.js");

class SendMessage
{
    /**
     *
     * @param content {{ message: ?string, img: ?string }}
     * @param groupId
     */
    async execute(groupId, content)
    {
        WA.then(async (client) => {
            const media = await MessageMedia.fromUrl(content.img);
            await client.once('ready', async () => {
                console.log('Enviando mensagem...')
                const sent = await client.sendMessage(groupId, media, {
                    caption: content.message +
                        "\n\n\n\n Mande \"CUPOM\" para receber os cupons do dia"
                });
                console.log('Mensagem enviada', sent.body)
            })
                .initialize();
        })

        return { "success": true };
    }
}

module.exports = { SendMessage }
