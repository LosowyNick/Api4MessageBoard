const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

const myDatabase = require("../my_modules/db_connector");
const sendReqToDatabase = myDatabase.sendReqToDatabase;
const ObjectId = myDatabase.ObjectId;

const manageHeaders = require("../my_modules/manage_headers");

const collectionName = "adverts";

router.get("/", async (req, res) => {
    const showAllAdverts = function(obj){
        return obj.find().toArray();
    };
    const adverts = await sendReqToDatabase(collectionName, showAllAdverts); 
    res.send(adverts);
});

router.get("/:id", async (req, res) => {
    const advertId = req.params;
    const showOneAdvert = function(obj){
        return obj.findOne({ "_id": new ObjectId(advertId) });
    };
    const advert = await sendReqToDatabase(collectionName, showOneAdvert); 
    manageHeaders.setProperAcceptHeader(res);
    res.send(advert);
});

router.post("/", jsonParser, 
  async (req, res, next) => {
    //ogarnąć walidator
    console.log(req.body); //usunac
    next();
  },
  async (req, res) => {
    const newAdvert = req.body;
    //trzeba dolozyc tez pola, generowane automatycznie...np. tsy
    const addNewAdvert = function(obj){
        return obj.insertOne({newAdvert});
    };
    const newAdvertId = await sendReqToDatabase(collectionName, addNewAdvert); 
    console.log(newAdvertId); //usunac
    res.send("Dodanie ogloszenia2"); //jaka odpowiedz dać? tylko ID? a moze tez TRUE? a w przypadku niepowodzenia?
  }
);

module.exports = router;