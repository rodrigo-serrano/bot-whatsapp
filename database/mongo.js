const { mongoose } = require("mongoose");

const mongoDb = (env.MONGODB_URI) ? mongoose.connect(env.MONGODB_URI) : undefined;

module.exports = { mongoDb, mongoose }