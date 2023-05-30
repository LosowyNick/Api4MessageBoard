const fs = require('fs');
require("dotenv").config();

const logger = function(req, res, next){
    const logfilePath = process.env.LOGFILE_PATH;
    let msg = `${Date.now()}, ${req.method}, ${req.headers.host+req.originalUrl}\n`;
    var stream = fs.createWriteStream(logfilePath, {flags:'a'});
    stream.cork();
    stream.write(msg);
    process.nextTick(() => stream.uncork());

    next();
}

module.exports = { logger };