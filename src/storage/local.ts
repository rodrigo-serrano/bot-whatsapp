import {existsSync, openSync, writeSync, closeSync, writeFileSync} from "fs"
export default class Local
{

    constructor(
        private readonly _sessionPath: string = `${__basedir}/store/session.json`
    ) {}

    public createSessionFile(): void
    {
        if(!existsSync(this._sessionPath))
        {
            let file: number = openSync(this._sessionPath, 'w');
            writeSync(file, '[]');
            closeSync(file);
        }
    }

    public getSessionFile(): string[]
    {
        return require(this._sessionPath);
    }

    public putClientSessionFile(clientId: string): boolean
    {
        try {
            const session: string[] = this.getSessionFile();
            session.push(clientId);
            writeFileSync(this._sessionPath, JSON.stringify(session));

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

}