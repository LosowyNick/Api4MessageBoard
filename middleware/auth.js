const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const dbCollectionNames = require('../enums/db_collection_names');
const myDatabase = require("../my_modules/db_connector");
const sendReqToDatabase = myDatabase.sendReqToDatabase;
const ObjectId = myDatabase.ObjectId;

const userAuth = function (req, res, next){
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, jwtSecret, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        const advertId = req.params;
        const showOneAdvert = function(obj){
          return obj.findOne({ "_id": new ObjectId(advertId) });
        };
        const advert = await sendReqToDatabase(dbCollectionNames.adverts, showOneAdvert);
        if(advert != undefined || advert != null){
          const advertOwnerId = advert.userId;
          if (decodedToken.id !== advertOwnerId) { 
            return res.status(401).json({ message: "Not authorized" });
          } else {
            next();
          }
        }else{
          return res.status(404).json({ message: "Authorization not possible." });
        }
      }
    });
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" });
    }
  }

module.exports = { userAuth };