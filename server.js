require("dotenv").config()

const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())
app.use(session({
    secret: process.env.sessSecret,
    resave: false,
    saveUninitialized: true
}))
app.use("/", require("./routes"));
app.get("/start", (req, res) => {
    res.send('Hello Node');
});


app.listen(3030, 'localhost')