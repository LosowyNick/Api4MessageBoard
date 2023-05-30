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
        stream.cork();
        stream.write(msg);
        process.nextTick(() => stream.uncork());
    }
    next();
}

module.exports = { logger };