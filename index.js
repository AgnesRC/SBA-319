import express from 'express'
import 'dotenv/config'
import db from './db.js'

// import travelerRoutes from './routes/travelers.js'
// import flightRoutes from './routes/flights.js'
import airportRoutes from './routes/airports.js'

const app = express()
const port = process.env.PORT

app.use(express.urlencoded())
app.use(express.json())

// app.use("/travelers", travelerRoutes)
// app.use("/flights", flightRoutes)
app.use("/airports", airportRoutes)



app.listen(port, () => {
    console.log('Listening on port:', port);
})





// app.get("/", (req, res) => {
//     res.redirect("/airports")
// })
