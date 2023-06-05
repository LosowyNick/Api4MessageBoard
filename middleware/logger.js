const fs = require('fs');
require("dotenv").config();

const yargs = require("yargs");
const args = yargs.argv;
const debug = args.debug;

const logger = function(req, res, next){
    if(debug != undefined){
        const logfilePath = process.env.LOGFILE_PATH;
        let msg = `${Date.now()}, ${req.method}, ${req.headers.host+req.originalUrl}\n`;
        var stream = fs.createWriteStream(logfilePath, {flags:'a'});
        try {
            stream.cork();
            stream.write(msg);
            process.nextTick(() => stream.uncork());
        } catch (error) {
            console.log("Problem with writing to the file log.");
            console.log(error);
        }
    }
    next();
}

module.exports = { logger };