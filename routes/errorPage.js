const express = require('express');
const router = express.Router();

router.get('*', (req, res) => {
    res.statusCode = 404;
    res.sendFile("custom404.png", {root: "./images"});
});

router.post('*', (req, res) => {
    res.statusCode = 405;
    res.end();
});

router.delete('*', (req, res) => {
    res.statusCode = 405;
    res.end();
});

router.patch('*', (req, res) => {
    res.statusCode = 405;
    res.end();
});

router.all('*', (req, res) => {
    res.statusCode = 400;
    res.end();
})

module.exports = router;