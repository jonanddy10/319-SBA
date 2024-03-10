import express from 'express';
import Bike from '../models/bike.mjs';
import bikeData from '../utilities/bikeData.mjs';

const router = express.Router()

// My routes:

//C: create/post one (CUSTOM)
router.post("/", async (req, res) => {
    const bike = new Bike({
        make: req.body.make, 
        model: req.body.model, 
        year: req.body.year
    })
    try {
        const newBike = await bike.save()
        res.status(201).json(newBike)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

//C: create/post populate route
router.post("/populate", async (req, res) => {
    try {
        await Bike.insertMany(bikeData)
        res.status(201).send('Database population with bike collection was succesful')
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

//R: read/get ALL
router.get('/', async (req, res) => {
    try {
        const bike = await Bike.find()
        res.json(bike)
        if(bike == null){res.status(404).send({ message: 'cannot find bike' })}
        }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

//R: read/get ONE
router.get('/:id', getBike, async (req, res) => {
    try {
        res.send(res.bike)
    } catch (error) {
        res.status(500).json({ message: error.message })  
    }
})

//U: update/patch
router.patch("/:id", getBike, async (req, res) => {
    if(req.body.make != null){
        res.bike.make = req.body.make
    }
    if(req.body.model != null){
        res.bike.model = req.body.model
    }
    if(req.body.year != null){
        res.bike.year = req.body.year
    }
    try {
        const updatedBike = await res.bike.save()
        res.json(updatedBike)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//D: delete ALL
router.delete("/", async (req, res) => {
    try {
        await Bike.deleteMany()
        res.send({ message: 'You deleted EVERYTHING!' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//D: delete ONE
router.delete('/:id', getBike, async (req, res) => {
    try {
       await res.bike.deleteOne()
       res.json({ message: 'bike removed'})
    } catch (error) {
        res.status(500).json({ message: 'sorry, there\'s been a server side error :('})
    }
})

// middleware

async function getBike(req, res, next) {
    let bike
    try {
        bike = await bike.findById(req.params.id)
        if(bike == null){res.status(404).send({ message: 'cannot find bike' })}
        }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.bike = bike
    // Go to next in line at the router this function was originally executed from:
    next()
}

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
//     const car = await Car.deleteMany({make: 'Mazda'})
//     console.log(car)
// }

export default router