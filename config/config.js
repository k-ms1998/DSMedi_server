//require("dotenv").config()

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: "mysql",
        mongoUri: process.env.mongodb_uri
    },
    production: {
        username: "root",
        password: "0000",
        database: "DSMedi",
        host: "localhost",
        dialect: "mysql",
        mongoUri: "mongodb://localhost:27017/dsmedi"
    }
}
