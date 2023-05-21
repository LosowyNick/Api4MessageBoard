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
    console.log(adverts);

    return adverts;
}

//main().then().catch(console.error).finally(client.close()); 

//db end

router.get('/', async (req, res) => {
    
    const adverts = await main().then().catch(console.error).finally(client.close()); 
    console.log(adverts);
    res.send(adverts);
    

    res.send("Lista ogłsozeń");
});

router.get('/:id', (req, res) => {
    res.send("Tu bedzie 1 ogłoszenie");
});

module.exports = router;