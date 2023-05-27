const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const myDatabase = require("../my_modules/db_connector");
const sendReqToDatabase = myDatabase.sendReqToDatabase;
const ObjectId = myDatabase.ObjectId;
const myAwesomeFunctions = require("../my_modules/my_awesome_functions");
const JsonValidator = require("../my_modules/json_validators");
const dbCollectionNames = require('../enums/db_collection_names');


router.get("/", async (req, res) => {
    const showAllAdverts = function(obj){
        return obj.find().toArray();
    };
    const adverts = await sendReqToDatabase(dbCollectionNames.adverts, showAllAdverts); 
    res.send(adverts);
});

router.get("/:id", async (req, res) => {
    const advertId = req.params;
    const showOneAdvert = function(obj){
        return obj.findOne({ "_id": new ObjectId(advertId) });
    };
    const advert = await sendReqToDatabase(dbCollectionNames.adverts, showOneAdvert); 
    myAwesomeFunctions.setProperAcceptHeader(res);
    res.send(advert);
});

router.post("/", jsonParser, 
  (req, res, next) => {
    const validationResult = JsonValidator.newAdvertJsonValidate(req.body);
    if(validationResult[0] === true){
      next();
    }else{
      res.statusCode = 400;
      res.send(validationResult[1][0].stack)
    }
  },
  async (req, res, next) => {
    const showOneUser = function(obj){
      return obj.findOne({ "_id": new ObjectId(req.body.userId) });
    };
    const userFromDatabase = await sendReqToDatabase(dbCollectionNames.users, showOneUser);
    if(userFromDatabase != undefined){
      next();
    }else{
      res.statusCode = 401;
      res.send("User not found.");
    }
  },
  async (req, res) => {
    let newAdvert = req.body;
    myAwesomeFunctions.encodeStringsInJson(newAdvert);
    newAdvert.modified = newAdvert.added = {"$timestamp": Date.now()}; //ehh ...zmienic wszedzie na to ISO jednak...i typ w bazie tez poprawic
    console.log(newAdvert);//do usuniecia
    const addNewAdvert = function(obj){
        return obj.insertOne({newAdvert});
    };
    //const newAdvertId = await sendReqToDatabase(dbCollectionNames.adverts, addNewAdvert); 
    //console.log(newAdvertId); //usunac
    res.send("Dodanie ogloszenia2"); //jaka odpowiedz dać? tylko ID? a moze tez TRUE? a w przypadku niepowodzenia?
  }
);

module.exports = router;