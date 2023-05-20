const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const currentFullDate = new Date();
    res.send(`${currentFullDate.toLocaleDateString()}, ${currentFullDate.toLocaleTimeString()}`);
});

module.exports = router;