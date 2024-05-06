import { Client, MessageMedia } from "whatsapp-web.js";
import { WAClient } from "../classes/WAClient"
import { ResponseDTO } from "../dto/http/responseDTO"
import { SendMessageDTO } from "../dto/sendMessage/sendMessageDTO"

export default class SendMessage
{
    constructor(
        public readonly data: SendMessageDTO
    ) {}

    public async execute(): Promise<ResponseDTO>
    {
        const client: Client = await WAClient.getClient();

        await client.once('ready', async () => {
            await this._sendMessage(client);
            await this._wait(2_000);
            await client.destroy();
        }).initialize();

        return {
            message: "Mensagem enviada",
            success: true
        };
    }

    private async _sendMessage(client: Client)
    {
        console.info('Sending message...')
        const media = await this._getMedia();
        const suffix = this._getSuffix();

        let sent = (media)
            ? await client.sendMessage(this.data.groupId, media, { caption: this.data.content.message + suffix })
            : await client.sendMessage(this.data.groupId, this.data.content.message + suffix);

        /**
         * delay app for wait message send before destroy client
         */
        console.log('Message sent with body:', sent.body)
    }

    private async _getMedia(): Promise<MessageMedia|null>
    {
        return (this.data.content?.image)
            ? await MessageMedia.fromUrl(this.data.content.image)
            : null;
    }

    private _getSuffix(): string
    {
        return (this.data.content?.suffix)
            ? `\n\n\n${this.data.content.suffix}`
            : '';
    }

    private _wait = (msec: number) => new Promise((resolve: any, _: any) => setTimeout(resolve, msec));
}