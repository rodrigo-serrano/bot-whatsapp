const WA = require('../app/clientWA');
const { MessageMedia } = require("whatsapp-web.js");

class SendMessage
{
    /**
     * TODO: Check content before send message
     * @param content {{ message: ?string, img: ?string }}
     * @param groupId
     */
    async execute(groupId, content)
    {
        WA.then(async (client) => {

            // const media = await MessageMedia.fromUrl(content.img);
            await client.once('ready', async () => {
                console.info('Sending message...')
                // const sent = await client.sendMessage(groupId, media, {
                //     caption: content.message +
                //         "\n\n\n\n Mande \"CUPOM\" para receber os cupons do dia"
                // });
                const sent = await client.sendMessage(groupId, content.message);

                /**
                 * delay app for wait message send before destroy client
                 */
                await this.#wait(1000);
                console.log('Message sent with body:', sent.body)

                await client.destroy();
            }).initialize().catch(_ => _);
        })

        return { "success": true };
    }

    #wait = (msec) => new Promise((resolve, _) => setTimeout(resolve, msec));
}

module.exports = { SendMessage }
