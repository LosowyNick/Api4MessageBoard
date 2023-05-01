const http = require("http");

const app = http.createServer((request, response) => {
    response.end("Hello server!");
});

app.listen(4700, console.log("Server started..."));