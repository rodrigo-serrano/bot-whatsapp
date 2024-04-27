const express = require('express');
global.app = express();
app.use(express.json())
global.env = dotenv = require('dotenv').config().parsed;

require('./routes/send-message');
require('./routes/send-cupoms');

console.info(`SERVER STARTED ON ${env.PORT}`)
app.listen(env.PORT);