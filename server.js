require("dotenv").config()

const express = require('express')

const app = express();

app.use("/api", require("./routes/api"));
app.get('/', (req, res) => {
    res.send('Hello Node');
});


app.listen(3030, 'localhost')