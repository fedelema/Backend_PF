const dotenv = require("dotenv");
dotenv.config();

const DB = process.env.PERS || "json"
const mongodb = {
    cnxStr: process.env.MONGO_URI_STRING || "mongodb://localhost:27017/test",
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
        serverSelectionTimeoutMS: 5000,
    }
}

module.exports = {
    DB,
    mongodb
}