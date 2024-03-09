import express from "express";
// invoke express inside an "app" variable to create app server
    const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
// load dotenv
    dotenv.config();
import router from "./routes/cars.mjs";
import Car from "./models/carSchema.mjs"

// store port number in a 'PORT' variable
    // the port is unrelated to MONGODB. it's just used by this server as a tool to listen for incoming HTTP requests
const PORT = process.env.PORT || 3000
// create a variable for the MongoURI
const mongoURI = process.env.MONGO_URI



// establish connection to database in MongoDB using mongoose
async function plugMongoDB(){
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to the MongoDB database')
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`);
    }    
}
// store connection to database as db (global)
const db = mongoose.connection;


// middleware
// allow this server to accept json req as a body:
app.use(express.json())

app.use('/cars', router)

// error-handling
app.use((err, _req, res, _next) => {
    res.status(500).send(`sorry :( there's been an error. \n(${err})`)
    
})

// listeners
app.listen(PORT, () => {
    console.log(`Server started`)
})

plugMongoDB();


//========================
// Carschema testing area:
//========================

// run();
// async function run(){
//     const bmw = await Car.create({make: 'BMW', model: '335i', year: 2010, inProduction: false})
//     console.log(`Car saved!: \n ${bmw}`)
// }

// clean();
// async function clean(){
//     const car = await Car.deleteMany({make: 'BMW'})
//     console.log(car)
// }






// reference

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


// EXPRESS PRACTICE:

// app.use(logger)

// app.get('/', (req, res) => {
//     console.log('Home Page')
//     res.send('Home Page')
// })

// app.get('/cars', authenticate, (req, res) => {
//     console.log('Cars page')
//     res.json({ message: 'hello' })
// })

// // Middleware functions:
// function logger(req, res, next){
//     console.log('log')
//     next()
// }

// function authenticate(req, res, next){
//     console.log('authenticate')
//     if(req.query.admin === 'true') {
//         next()
//         return
//     }else{
//         res.send('Not authorized')
//     }
// }