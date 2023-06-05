const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function connectWithDatabase(collectionName, operation){
    try {
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const usersCollection = db.collection(collectionName);
        const dbResponse = await operation(usersCollection);
        return dbResponse;
    } catch (error) {
        console.log(error.message); 
    }
}

async function sendReqToDatabase(collectionName, operation){
    const databaseAnswer = await connectWithDatabase(collectionName, operation).then().catch(console.error).finally(client.close());
    return databaseAnswer;
}

module.exports = {sendReqToDatabase, ObjectId};