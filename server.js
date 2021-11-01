//require("dotenv").config()

const express = require('express')
const path = require("path")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { sequelize } = require("./models");

const app = express()

app.set("views", path.join(__dirname + "/views"))
app.set("view engine", "ejs")

sequelize.sync();
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: process.env.sessSecret,
    resave: false,
    saveUninitialized: true
}))
app.use("/", require("./routes"));
app.get("/start", (req, res) => {
    res.send('Hello Node');
});


app.listen(3000, 'localhost')