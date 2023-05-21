const express = require('express');
const router = express.Router();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function connectWithDatabase(collectionName, operation){
    await client.connect();

    const db = client.db(process.env.DB_NAME);
    const usersCollection = db.collection(collectionName);
    const dbResponse = await operation(usersCollection);

    return dbResponse;
}

async function sendReqToDatabase(collectionName, operation){
    const databaseAnswer = await connectWithDatabase(collectionName, operation).then().catch(console.error).finally(client.close());
    return databaseAnswer;
}

const collectionName = "adverts";

router.get('/', async (req, res) => {
    const showAllAdverts = function(obj){
        return obj.find().toArray();
    };
    const adverts = await sendReqToDatabase(collectionName, showAllAdverts); 
    res.send(adverts);
});

router.get('/:id', async (req, res) => {
    //6469df0760c6ad7d1423548c
    const advertId = req.params; //zabezpieczyc na wypadek zlego ID
    const showOneAdvert = function(obj){
        return obj.findOne({ "_id": new ObjectId(advertId) });
    };
    const advert = await sendReqToDatabase(collectionName, showOneAdvert); 
    res.send(advert);
});

module.exports = router;