require("dotenv").config();
const express = require("express");
const app = express();
app.disable("x-powered-by");

const heartbeat = require("./routes/heartbeat");
const adverts = require("./routes/adverts");

app.use("/heartbeat",  heartbeat);
app.use("/adverts",  adverts);

app.all("*", (req, res) => { //gwiazdki przesunac na koniec
    res.send("Hello server!"); //i tu bedzie ten domyślny obrazek z błedem
});

app.listen(process.env.appPort, console.log("Server started..."));

/*
RZECZOWNIKI W LICZBIE MNOGIEJ:
adverts

CRUD dla advert:
    CREATE: POST /adverts
    READ: GET /adverts
    READ: GET /adverts/:id
    UPDATE: PATCH /adverts/:id
    DELETE: DELETE /adverts/:id

    Listowanie advertsów z wyszukiwaniem
    GET /adverts?cat1={query_cat1}&cat2={query_cat2}

INNE

CRUD dla users
    READ: GET /users
    READ: GET /users/:id

*/