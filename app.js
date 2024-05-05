const express = require('express');
global.app = express();
app.use(express.json());
global.env = dotenv = require('dotenv').config().parsed;
global.__basedir = __dirname;

/**
 * Get error without crash
 * Added for puppeteer
 */
process.on('uncaughtException', (err) => console.log(err));


/**
 * Initilize session file
 */
require('./app/sessionFile');


/**
 * Reg routes here
 */
require('./routes/send-message');
require('./routes/send-cupoms');

app.get('/api/v1', (req, res) => res.send("Hello world !!!!"));
console.info("[SERVER] Loading routes .............. OK");

/**
 * Initilize envs
 */
const port = env.APP_PORT ?? 3000;
const hostname = env.APP_HOSTNAME ?? "localhost"
env.APP_SESSION = (['local', 'remote'].includes(env.APP_SESSION))
    ? env.APP_SESSION
    : 'local';
console.info("[SERVER] Initialize environments ..... OK");

/**
 * Start server
 */
console.log('\n\n\x1b[36m%s\x1b[0m', `[SERVER] Started on ${hostname}:${port}`);
app.listen(port, hostname);