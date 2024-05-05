const WA = require('../app/clientWA');
const { MessageMedia } = require("whatsapp-web.js");

class SendMessage
{
    data;

    /**
     * @param data{{ groupId: string, content: { message: ?string, img: ?string } }}
     */
    constructor(data) {
        this.data = data;
    }

    async execute()
    {
        const media = await this.#_getMedia();
        const suffix = this.#_getSuffix();

        let client = await WA.client;

        await client.once('ready', async () => {
            console.info('Sending message...')

            let sent = (media)
                ? await client.sendMessage(this.data.groupId, media, { caption: this.data.content.message + suffix })
                : await client.sendMessage(this.data.groupId, this.data.content.message + suffix);

            /**
             * delay app for wait message send before destroy client
             */
            await this.#_wait(2_000);
            console.log('Message sent with body:', sent.body)

            await client.destroy();
        }).initialize();

        return { "success": true };
    }

    #_getMedia = async () =>  (this.data.content?.img)
        ? await MessageMedia.fromUrl(this.data.content.img)
        : null;

    #_getSuffix = () => (this.data.content?.suffix)
        ? `\n\n\n${this.data.content.suffix}`
        : '';

     #_wait = (msec) => new Promise((resolve, _) => setTimeout(resolve, msec));
}

module.exports = { SendMessage }
