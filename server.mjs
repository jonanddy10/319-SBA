import express from "express";
// invoke express inside an "app" variable to create app server
    const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
// load dotenv
    dotenv.config();
import router from "./routes/cars.mjs"

// store port number in a 'PORT' variable
    // the port is unrelated to MONGODB. it's just used by this server as a tool to listen for incoming HTTP requests
const PORT = process.env.PORT || 3000
// create a variable for the MongoURI
const mongoURI = process.env.MONGO_URI



// establish connection to database in MongoDB using mongoose
async function plugMongoDB(){
    try {
        // test.routeName in MongoDB
        await mongoose.connect(mongoURI);
        console.log('Connected to the MongoDB database')
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`);
    } 
    // store connection to database as db
    // const db = mongoose.connection;   
}

// middleware
// allow this server to accept json req as a body:
app.use(express.json())
// allow express to use the 'router' within the path: /cars
app.use('/cars', router)

// gloabal error-handling
app.use((err, _req, res, _next) => {
    res.status(500).send(`sorry :( there's been an error. \n(${err})`)   
})

// listeners
app.listen(PORT, () => {
    console.log(`Server started`)
})

plugMongoDB();

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