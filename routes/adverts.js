const express = require('express');
const router = express.Router();

//DB start
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function main(){
    await client.connect();

    const db = client.db(process.env.DB_NAME);
    const usersCollection = db.collection("adverts");

    let adverts = await usersCollection.find().toArray();

    return adverts;
}

//db end

router.get('/', (req, res) => {
    const adverts = main().then().catch(console.error).finally(client.close()); //naprawić
    console.log(adverts);
    res.send(adverts);
});

router.get('/:id', (req, res) => {
    res.send("Tu bedzie 1 ogłoszenie");
});

module.exports = router;