const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Tu bedo ogłoszenia");
});

router.get('/:id', (req, res) => {
    res.send("Tu bedzie 1 ogłoszenie");
});

module.exports = router;