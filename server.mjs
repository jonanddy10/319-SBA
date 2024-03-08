import express from "express";
// invoke express inside an "app" variable
    const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
// load dotenv
    dotenv.config();
import router from "./routes/routes.mjs";
import Car from "./models/carSchema.mjs"

// store port number in a 'PORT' variable
    // the port is unrelated to MONGODB. it's just used by this server as a tool to listen for incoming HTTP requests
const PORT = process.env.PORT || 3000
// establish connection to database in MongoDB using mongoose
const mongoURI = process.env.MONGO_URI

plugMongoDB();
async function plugMongoDB(){
    try {
        await mongoose.connect(mongoURI);
        console.log('You are connected to the MongoDB database!')
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`);
    }
}
// store connection to database as db
const db = mongoose.connection;

// async () => {
//     await db.createCollection('cars', {
//         validator: {
//             $jsonSchema: {
//                 bsonType: 'object',
//                 title: 'Car Validation',
//                 required: ['make', 'model', 'year', 'inProduction'],
//                 properties: {
                    
//                 }
//             }
//         }
//     })
// }

// middleware
// parse incoming json into javascript objects to make it accessible for route handlers
// app.use(express.json());
// // routes
// app.use("./routes", router);

// error-handling
app.use((err, _req, res) => {
    res.status(500).send(`sorry :( there's been an error. \n(${err})`)
    
})

// listeners
app.listen(PORT, () => {
    console.log(`You are listening on port #${PORT}`);
})

run();
async function run(){
    const bmw = await Car.create({make: 'BMW', model: '335i', year: 2010, inProduction: false})
    console.log(`Car saved!: \n ${bmw}`)
    
}

// clean();
// async function clean(){
//  const car = await Car.deleteMany({make: 'BMW'})
//  console.log(car)
// }