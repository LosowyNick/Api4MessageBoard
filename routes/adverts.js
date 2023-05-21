const express = require('express');
const router = express.Router();

const myDatabase = require("../my_modules/db_connector");
const sendReqToDatabase = myDatabase.sendReqToDatabase;
const ObjectId = myDatabase.ObjectId;

const collectionName = "adverts";

router.get('/', async (req, res) => {
    const showAllAdverts = function(obj){
        return obj.find().toArray();
    };
    const adverts = await sendReqToDatabase(collectionName, showAllAdverts); 
    res.send(adverts);
});

router.get('/:id', async (req, res) => {
    const advertId = req.params;
    const showOneAdvert = function(obj){
        return obj.findOne({ "_id": new ObjectId(advertId) });
    };
    const advert = await sendReqToDatabase(collectionName, showOneAdvert); 
    res.send(advert);
});

module.exports = router;