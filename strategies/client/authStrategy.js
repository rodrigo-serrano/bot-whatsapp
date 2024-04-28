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
        let clientId = 'we23Wdff';

        // let clientId = mcache.get('clientId');
        if (clientId) {
            return new LocalAuth({ clientId });
        }

        clientId = crypto.randomUUID();

        const auth = new LocalAuth({
            clientId
        });

        mcache.put('clientId', clientId);

        return auth;
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