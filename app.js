require("dotenv").config();

const http = require("http");

const app = http.createServer((request, response) => {
    response.end("Hello server!");
});

app.listen(process.env.appPort, console.log("Server started..."));