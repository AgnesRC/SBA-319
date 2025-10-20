import { ObjectId } from 'mongodb'
import db from '../db.js'

import airportData from '../data/airports.js'

async function displayAirports(req, res) {
    try {
        const collection = await db.collection("airports")
        await collection.insertMany(airportData)
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
        res.send('airports')
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message })
    }
}

async function updateAirport(req, res) {
    try {
        console.log('PUT')
        console.log(req.body)
        const collection = await db.collection("Airports")
        const result = await collection.replaceOne({ _id: new ObjectId(req.params.id) }, req.body)
        console.log(result)
        res.send(airports)
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
        res.send(airports)
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
        res.send(airports)
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message })
    }
}

export default {
    index: displayAirports,
    create: addAirport,
    update: updateAirport,
    delete: deleteAirport,
    seed: resetAirportData,
}