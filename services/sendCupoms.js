const WA = require('../app/clientWA');
class SendCupoms
{
    /**
     * TODO: Refact, this can be a schedule not a endpoint
     * @param cupoms{string[]}
     */
    async execute(cupoms)
    {
        WA.then((client) => {
            client.on('message', msg => {
                if (msg.body == 'CUPOM') {
                    msg.reply(cupoms.join('\n'));
                }
            })
                .initialize();
        });

        return { "success": true }
    }
}

module.exports = { SendCupoms }