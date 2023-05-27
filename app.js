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

app.listen(process.env.APP_PORT, console.log("Server started..."));

/*
TODO:
- zabezpieczyć GET /adverts/:id przed wpisywaniem złego ID..krótkiego? jak to połączyć z domyślnym obrazkiem?
- status cody dodac do getów i innych...wszędzie!

RZECZOWNIKI W LICZBIE MNOGIEJ:
adverts

CRUD dla advert:
    CREATE: POST /adverts
    READ: GET /adverts ########## DONE
    READ: GET /adverts/:id ########## DONE
    UPDATE: PATCH /adverts/:id
    DELETE: DELETE /adverts/:id

    Listowanie advertsów z wyszukiwaniem
    GET /adverts?cat1={query_cat1}&cat2={query_cat2}

INNE

CRUD dla users
    READ: GET /users
    READ: GET /users/:id

*/