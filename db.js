import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI

const client = new MongoClient(connectionString)

let connection;

    try {
        connection = await client.connect()
        console.log('Connected to MongoDB');  
    } catch (error) {
        console.log(error);
    }

const db = connection.db("sba_travel")

export default db

