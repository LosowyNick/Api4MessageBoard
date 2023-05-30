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
    const titleRegExp = (req.query.title) ? new RegExp(".*"+encodeURIComponent(req.query.title)+".*","i") : ".*";
    const bodyRegExp = (req.query.body) ? new RegExp(".*"+encodeURIComponent(req.query.body)+".*","i") : ".*";
    const minPrice = myAwesomeFunctions.validateMinPrice(req.query.minprice);
    const maxPrice = myAwesomeFunctions.validateMaxPrice(req.query.maxprice);
    const minDate = (req.query.mindate) ? new Date(req.query.mindate+",00:00:00") : new Date("1970-01-01");
    const maxDate = (req.query.maxdate) ? new Date(req.query.maxdate+",23:59:59") : new Date("2970-01-01");
    const tagsRegExp = myAwesomeFunctions.prepareRegExpForTagsSearch(req.query.tags);
    const showAdverts = function(obj){
      return obj.find({$and:[{tags:{$regex: tagsRegExp}},{modified:{$gte: minDate, $lte: maxDate}},{title:{$regex : titleRegExp}},{body:{$regex : bodyRegExp}},{price: {$gte: minPrice, $lte: maxPrice}}]}).toArray();
    };
    const adverts = await sendReqToDatabase(dbCollectionNames.adverts, showAdverts); 
    res.send(adverts);
});

router.get("/:id", async (req, res, next) => { //kurde..... jak przekierowac blede ID do obrazka? takze za krotkie....
  
    const advertId = req.params;
    const showOneAdvert = function(obj){
      return obj.findOne({ "_id": new ObjectId(advertId) });
    };
  try{  
    const searchedAdvert = await sendReqToDatabase(dbCollectionNames.adverts, showOneAdvert); 
    if(searchedAdvert == null){
      next();
    } 
    myAwesomeFunctions.setProperAcceptHeader(res);
    res.send(searchedAdvert);
  }catch(err){
    next(err);
  } 
});

router.post("/", jsonParser, 
  (req, res, next) => {
    const validationResult = JsonValidator.AdvertJsonValidate(req.body);
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
    newAdvert.modified = newAdvert.added = new Date();
    const addNewAdvert = function(obj){
        return obj.insertOne(newAdvert);
    };
    const createdAdvert = await sendReqToDatabase(dbCollectionNames.adverts, addNewAdvert); 
    if(createdAdvert.acknowledged == true){
      res.statusCode = 201;
      res.send(createdAdvert.insertedId);
    }else{
      res.statusCode = 424;
      res.send("Advert creation has failed.");
    }
  }
);

router.delete("/:id", async (req, res) => {
  const advertId = req.params;
  const deleteOneAdvert = function(obj){
      return obj.deleteOne({ "_id": new ObjectId(advertId) });
  };
  const deletionStatus = await sendReqToDatabase(dbCollectionNames.adverts, deleteOneAdvert); 
  console.log(deletionStatus);
  if(deletionStatus.acknowledged == true){
    if(deletionStatus.deletedCount == 1){
      res.statusCode = 200;
      res.send("Advert has been deleted.");
    }else{
      res.statusCode = 204;
    }
  }else{
    res.statusCode = 424;
    res.send("Deletion has failed.");
  }
});

router.patch("/:id", jsonParser, 
  (req, res, next) => {
    const validationResult = JsonValidator.AdvertJsonValidate(req.body);
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
    const advertId = req.params;
    let advertForModification = req.body;
    myAwesomeFunctions.encodeStringsInJson(advertForModification);
    advertForModification.modified = new Date();
    const modifyAdvert = function(obj){
        return obj.updateOne({_id: new ObjectId(advertId)},{$set: advertForModification});
    };
    const modifiedAdvertStatus = await sendReqToDatabase(dbCollectionNames.adverts, modifyAdvert); 
    console.log(modifiedAdvertStatus);
    if(modifiedAdvertStatus.acknowledged == true){
      res.statusCode = 200;
      res.send("Advert updated successfully");
    }else{
      res.statusCode = 500;
      res.send("Advert update has failed.");
    }
  }
);

module.exports = router;