require("dotenv").config();
const express = require("express");
const app = express();
app.disable("x-powered-by");
const heartbeat = require("./routes/heartbeat");
const adverts = require("./routes/adverts");
const loggerMiddleware = require("./middleware/logger");
const errorPage = require("./routes/errorPage");
const loginPage = require("./routes/loginPage");

app.use(loggerMiddleware.logger);
app.use("/heartbeat",  heartbeat);
app.use("/adverts",  adverts);
app.use("/login", loginPage);
app.use("*", errorPage);

app.listen(process.env.APP_PORT, console.log("Server started..."));

/*
TODO:
- status cody dodac do getów i innych...wszędzie!
- czy userID powinno znajdować się w szablonie? i wysyłanych dokumentach? - już sam nie wiem
- DELETE advert gdy podajemy zly id - brak ODP :( - headery? ->raczej ogarnac statusami
- UPDATE advert - jw ...problem gdy podajemy zle ID - ->raczej ogarac statusami
- przejzec statusy z tego tutoriala o hashowaniu i logowaniu bo koles tez mogl sie pomylic, wybierajac takie

RZECZOWNIKI W LICZBIE MNOGIEJ:
adverts

CRUD dla advert:
    CREATE: POST /adverts  ########## DONE
    READ: GET /adverts ########## DONE
    READ: GET /adverts/:id ########## DONE
    UPDATE: PATCH /adverts/:id ########## DONE
    DELETE: DELETE /adverts/:id ########## DONE

    Listowanie advertsów z wyszukiwaniem
    GET /adverts?cat1={query_cat1}&cat2={query_cat2} ########## DONE

INNE

CRUD dla users
    READ: GET /users
    READ: GET /users/:id

*/