const express = require('express');
const router = express.Router();

router.all('*', (req, res) => {
    res.statusCode = 404;
    res.sendFile("custom404.png", {root: "./images"});
});

module.exports = router;