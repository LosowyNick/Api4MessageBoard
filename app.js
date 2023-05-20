require("dotenv").config();

const express = require('express');
const app = express();
app.disable("x-powered-by");

app.get("*", (req, res) => { //gwiazdki przesunac na koniec
    res.send("Hello server!");
});

app.listen(process.env.appPort, console.log("Server started..."));