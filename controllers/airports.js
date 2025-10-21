import { ObjectId } from 'mongodb'
import db from '../db.js'

import airportData from '../data/airports.js'

async function displayAirports(req, res) {
    try {
        const collection = await db.collection("airports")
        const existingCount = await collection.countDocuments();

        if (existingCount === 0) {
        await collection.insertMany(airportData);
        console.log("Inserted travelers data into collection");
      } else {
        console.log("Travelers data already exists");
      }

        const airports = await collection.find({}).toArray()
        res.send(airports)
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message })
    }
}

async function addAirport(req, res) {
    try {
        const collection = await db.collection("airports")
        await collection.insertOne(req.body)
        const airports = await collection.find({}).toArray()
        res.send(airports)
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message })
    }
}

async function updateAirport(req, res) {
    try {
        console.log('PUT')
        console.log(req.body)
        const collection = await db.collection("airports")
        const result = await collection.replaceOne({ _id: new ObjectId(req.params.id) }, req.body)
        console.log(result)
        res.send(result)
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message })
    }
}

async function deleteAirport(req, res) {
    try {
        const collection = await db.collection("airports")
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) })
        console.log(result)
        res.send(result)
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message })
    }
}

async function resetAirportData(req, res) {
    try {
        const collection = await db.collection("airports")
        const resultDelete = await collection.deleteMany({})
        const resultInsert = await collection.insertMany(airportData)
        console.log({ ...resultDelete, ...resultInsert })
        res.send({ ...resultDelete, ...resultInsert })
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message })
    }
}

//Index Creation
async function createIndexes() {  
    try {
        const airports = db.collection("airports");

        await airports.createIndex({ code: 1 });
        await airports.createIndex({ city: 1 });
    } catch (err) {
        console.error("Error creating indexes:", err);
    }
    }



export default {
    index: displayAirports,
    create: addAirport,
    update: updateAirport,
    delete: deleteAirport,
    seed: resetAirportData,
    createIndex: createIndexes,
}