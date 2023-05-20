require("dotenv").config();
const express = require("express");
const app = express();
app.disable("x-powered-by");

const heartbeat = require("./routes/heartbeat");

app.use("/heartbeat",  heartbeat);

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
    READ: GET /advert/:id
    UPDATE: PATCH /adverts/:id
    DELETE: DELETE /adverts/:id

    Listowanie advertsów z wyszukiwaniem
    GET /adverts?cat1={query_cat1}&cat2={query_cat2}

INNE
CRUD dla heartbeat
    READ: GET /heartbeat

CRUD dla users
    READ: GET /users
    READ: GET /user/:id
*/