const { Session } = require("../repository/session");
const { mongoDb, mongoose } = require("../database/mongo");
const { WAWebJS } = require("whatsapp-web.js");

class SendCupoms
{
    /**
     *
     * @param cupoms{string[]}
     */
    async execute(cupoms)
    {
        await mongoDb;
        /**
         * @var { WAWebJS.Client }
         */
        const client = (new Session(mongoose)).getOrCreateSession();

        client.on('message', msg => {
            if (msg.body == 'CUPOM') {
                msg.reply(cupoms.join('\n'));
            }
        });

        return { "success": true }
    }
}

module.exports = { SendCupoms }