require("dotenv").config();
const express = require("express");
const app = express();
app.disable("x-powered-by");
const heartbeat = require("./routes/heartbeat");
const adverts = require("./routes/adverts");
const loggerMiddleware = require("./middleware/logger");
const errorPage = require("./routes/errorPage");
const loginPage = require("./routes/loginPage");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(loggerMiddleware.logger);
app.use("/heartbeat",  heartbeat);
app.use("/adverts",  adverts);
app.use("/login", loginPage);
app.use("*", errorPage);

app.listen(process.env.APP_PORT, console.log("Server started..."));

/*
TODO:
- status cody dodac do getów i innych...wszędzie!
- czy userID powinno znajdować się w szablonie? i wysyłanych dokumentach? - już sam nie wiem; teraz jak mam logowanie to w sumie moge sam to pole wypelniac
- DELETE advert gdy podajemy zly id - brak ODP :( - headery? ->raczej ogarnac statusami
- UPDATE advert - jw ...problem gdy podajemy zle ID - ->raczej ogarac statusami
- przejzec statusy z tego tutoriala o hashowaniu i logowaniu bo koles tez mogl sie pomylic, wybierajac takie
- obsluga bledów - przejrzec
- dodac więcej ogłoszeń do bazy
- statusy przy wyszukiwaniach???
- zly ID w delete wywala aplikacje:D
- zli ID przy modification wywala apke

*/