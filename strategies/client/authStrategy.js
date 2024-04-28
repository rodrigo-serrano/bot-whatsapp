const { WAWebJS, RemoteAuth, LocalAuth } = require("whatsapp-web.js");
const { MongoStore } = require("wwebjs-mongo");
const { mongoose } = require('../../database/mongo.js')
const crypto = require('crypto');
const {mongoDb} = require("../../database/mongo");

class AuthStrategy
{
    /**
     * @returns { WAWebJS.RemoteAuth|WAWebJS.LocalAuth }
     * @constructor
     */
    async get()
    {
        return await (env.APP_SESSION === 'local')
            ? this.#localAuth()
            : this.#remoteAuth();
    }

    #localAuth()
    {
        const session = require(sessionPath);

        /**
         * For now, only one session is accepted
         * TODO: Multi-device
         */
        let clientId;

        if (session.length !== 0) {
            clientId = session[0];
            return new LocalAuth({ clientId });
        }

        try {
            clientId = crypto.randomUUID();
            return new LocalAuth({
                clientId
            });

        } catch (e) {
            console.error(e);
        } finally {
            session.push(clientId);
            fs.writeFileSync(sessionPath, JSON.stringify(session));
        }
    }

    async #remoteAuth()
    {
        let store;
        try {
            await mongoDb;
            store = (new MongoStore({ mongoose }));
        } catch (e) {
            console.error(e);
        }

        return new RemoteAuth({
            store: store,
            backupSyncIntervalMs: 300000,
            clientId: store.clientId
        })
    }
}

module.exports = { AuthStrategy }