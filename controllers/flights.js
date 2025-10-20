import { ObjectId } from 'mongodb'
import db from '../db.js'

import flightData from '../data/flights.js'

async function displayFlights(req, res) {
    try {
        const collection = await db.collection("flights")
        const existingCount = await collection.countDocuments();
  
        if (existingCount === 0) {
        await collection.insertMany(travelersData);
        console.log("Inserted travelers data into collection");
      } else {
        console.log("Travelers data already exists");
      }

        const flights = await collection.find({}).toArray()
        res.send(flights)
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message })
    }
}

async function addFlight(req, res) {
    try {
        const collection = await db.collection("flights")
        await collection.insertOne(req.body)
        const flights = await collection.find({}).toArray()
        res.send(flights)
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message })
    }
}

async function updateFlight(req, res) {
    try {
        console.log('PUT')
        console.log(req.body)
        const collection = await db.collection("flights")
        const result = await collection.replaceOne({ _id: new ObjectId(req.params.id) }, req.body)
        console.log(result)
        res.send(result)
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message })
    }
}

async function deleteFlight(req, res) {
    try {
        const collection = await db.collection("flights")
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) })
        console.log(result)
        res.send(result)
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message })
    }
}

async function resetFlightData(req, res) {
    try {
        const collection = await db.collection("flights")
        const resultDelete = await collection.deleteMany({})
        const resultInsert = await collection.insertMany(flightData)
        console.log({ ...resultDelete, ...resultInsert })
        res.send({ ...resultDelete, ...resultInsert })
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message })
    }
}

export default {
    index: displayFlights,
    create: addFlight,
    update: updateFlight,
    delete: deleteFlight,
    seed: resetFlightData,
}