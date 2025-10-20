import { ObjectId } from 'mongodb'
import db from '../db.js'

import travelersData from '../data/Travelers.js'

async function displayTravelers(req, res) {
    try {
        const collection = await db.collection("travelers")
        await collection.insertMany(travelersData)
        const travelers = await collection.find({}).toArray()
        res.send(travelers)
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message })
    }
}

async function addTraveler(req, res) {
    try {
        const collection = await db.collection("travelers")
        await collection.insertOne(req.body)
        res.send('travelers')
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message })
    }
}

async function updateTraveler(req, res) {
    try {
        console.log('PUT')
        console.log(req.body)
        const collection = await db.collection("travelers")
        const result = await collection.replaceOne({ _id: new ObjectId(req.params.id) }, req.body)
        console.log(result)
        res.send(travelers)
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message })
    }
}

async function deleteTraveler(req, res) {
    try {
        const collection = await db.collection("travelers")
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) })
        console.log(result)
        res.send(travelers)
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message })
    }
}

async function resetTravelersData(req, res) {
    try {
        const collection = await db.collection("travelers")
        const resultDelete = await collection.deleteMany({})
        const resultInsert = await collection.insertMany(travelersData)
        console.log({ ...resultDelete, ...resultInsert })
        res.send(travelers)
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message })
    }
}

export default {
    index: displayTravelers,
    create: addTraveler,
    update: updateTraveler,
    delete: deleteTraveler,
    seed: resetTravelersData,
}