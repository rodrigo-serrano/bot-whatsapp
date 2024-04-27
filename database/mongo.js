const mongoose = require("mongoose");

const mongoDb = mongoose.connect(env.MONGODB_URI);

module.exports = { mongoDb, mongoose }