import express from 'express'
import 'dotenv/config'
import db from './db.js'

import travelerRoutes from './routes/travelers.js'
import flightRoutes from './routes/flights.js'
import airportRoutes from './routes/airports.js'

const app = express()
const port = process.env.PORT

app.use(express.urlencoded())
app.use(express.json())

app.use("/travelers", travelerRoutes)
app.use("/flights", flightRoutes)
app.use("/airports", airportRoutes)

const flightSchema = {
    $jsonSchema: {
      bsonType: "object",
      title: "Flight Validation",
      required: ["airline", "origin", "destination"],
      properties: {
        airline: {
          bsonType: "string",
          description: "'airline' is required, and must be a string",
        },
        origin: {
          bsonType: "string",
          pattern: "^[A-Z]{3}$",
        description: "'origin' must be a 3-letter airport code (e.g., 'JFK')",
        },
        destination: {
          bsonType: "string",
          pattern: "^[A-Z]{3}$",
        description: "'destination' must be a 3-letter airport code (e.g., 'JFK')"
        },
      },
    },
  };


const collections = await db.listCollections({ name: "flights" }).toArray();

if (collections.length === 0) {
  await db.createCollection("flights", {
    validator: flightSchema,
    validationAction: "error",
  });
} else {
  await db.command({
    collMod: "flights",
    validator: flightSchema,
    validationAction: "error",
  });
}


app.listen(port, () => {
    console.log('Listening on port:', port);
})
