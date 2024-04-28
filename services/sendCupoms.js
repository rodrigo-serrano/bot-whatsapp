const WA = require('../external/clientWA');
class SendCupoms
{
    /**
     *
     * @param cupoms{string[]}
     */
    async execute(cupoms)
    {
        WA.then((client) => {
            client.on('message', msg => {
                if (msg.body == 'CUPOM') {
                    msg.reply(cupoms.join('\n'));
                }
            });
        });

        return { "success": true }
    }
}

module.exports = { SendCupoms }