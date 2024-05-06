import { AuthStrategy, LocalAuth, RemoteAuth } from "whatsapp-web.js";
import { writeFileSync } from "fs";
import { MongoStore } from "wwebjs-mongo";
import { mongoDb } from "../../storage/mongo";
import * as mongoose from "mongoose";
import * as crypto from "crypto";
import Local from "../../storage/local";

export default class Auth
{
    public async get(): Promise<AuthStrategy>
    {
        return await (this._appSession() === 'local')
            ? this._localAuth()
            : this._remoteAuth();
    }

    private _appSession(): string
    {
        const appSession = process.env.APP_SESSION ?? '';
        return ['local', 'remote'].includes(appSession)
            ? appSession
            : 'local';
    }

    private _localAuth(): LocalAuth
    {
        const session: string[] = (new Local()).getSessionFile();

        let clientId: any;

        if (session.length !== 0) {
            clientId = session[0];
            return new LocalAuth({ clientId });
        }

        clientId = crypto.randomUUID();

        (new Local()).putClientSessionFile(clientId);

        return new LocalAuth({
            clientId
        });
    }

    private async _remoteAuth(): Promise<RemoteAuth>
    {
        let store: any;
        await mongoDb;
        store = (new MongoStore({ mongoose }));

        return new RemoteAuth({
            store: store,
            backupSyncIntervalMs: 300_000,
            clientId: store?.clientId
        })
    }
}