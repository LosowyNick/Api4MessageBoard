const express = require('express');
const router = express.Router();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function connectWithDatabase(collectionName, operation){
    await client.connect();

    const db = client.db(process.env.DB_NAME);
    const usersCollection = db.collection(collectionName);

    //const dbResponse = await usersCollection.find().toArray();
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
    const operation = 1;

    const advertId = req.params;

    const advert = await sendReqToDatabase(collectionName, operation); 
    res.send(advert);
});

module.exports = router;