import express, { Express, Router } from "express";
import dotenv from "dotenv";
import Routes from './routes/routes';
import Local from "./storage/local";

globalThis.__basedir = __dirname;
process.on('uncaughtException', (err) => console.log(err));
dotenv.config();

const app: Express = express();
app.use(express.json());

/**
 * Environments
 */
const PORT: number = Number(process.env.APP_PORT) ?? 3000;
const HOSTNAME: string = process.env.APP_HOSTNAME ?? 'localhost';
console.info("\x1b[33m%s\x1b[32m%s", "[SERVER] Loading envs ................ ", "OK");

/**
 * Routes
 */
const router = Router();
Routes(router);
app.use('/api/v1', router);
console.info("\x1b[33m%s\x1b[32m%s", "[SERVER] Loading routes .............. ", "OK");

/**
 * ??
 */
(new Local()).createSessionFile();

/**
 * Server
 */
app.listen(PORT, HOSTNAME, () => {
    console.info('\n\x1b[36m%s\x1b[32m%s\x1b[36m%s\x1b[32m%s', "WA running on hostname ", HOSTNAME, " and port ", PORT);
    // console.info("WA running at port: ", PORT)
}).on('error', (e) => { throw new Error(e.message) });