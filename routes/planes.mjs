import express from 'express';
import Plane from '../models/plane.mjs';
import planeData from '../utilities/planeData.mjs';

const router = express.Router()

// My routes:

//C: create/post one (CUSTOM)
router.post("/", async (req, res) => {
    const plane = new Plane({
        make: req.body.make, 
        model: req.body.model, 
        year: req.body.year, 
        water: req.body.water,
    })
    try {
        const newPlane = await plane.save()
        res.status(201).json(newPlane)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

//C: create/post populate route
router.post("/populate", async (req, res) => {
    try {
        await Plane.insertMany(planeData)
        res.status(201).send('Database population with plane collection was succesful')
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

//R: read/get ALL
router.get('/', async (req, res) => {
    try {
        const plane = await Plane.find()
        res.json(plane)
        if(plane == null){res.status(404).send({ message: 'cannot find plane' })}
        }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

//R: read/get ONE
router.get('/:id', getPlane, async (req, res) => {
    try {
        res.send(res.plane)
    } catch (error) {
        res.status(500).json({ message: error.message })  
    }
})

//U: update/patch
router.patch("/:id", getPlane, async (req, res) => {
    if(req.body.make != null){
        res.plane.make = req.body.make
    }
    if(req.body.model != null){
        res.plane.model = req.body.model
    }
    if(req.body.year != null){
        res.plane.year = req.body.year
    }
    if(req.body.water != null){
        res.plane.water = req.body.water
    }
    try {
        const updatedCar = await res.plane.save()
        res.json(updatedCar)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//D: delete ALL
router.delete("/", async (req, res) => {
    try {
        await Plane.deleteMany()
        res.send({ message: 'You deleted EVERYTHING!' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//D: delete ONE
router.delete('/:id', getPlane, async (req, res) => {
    try {
       await res.plane.deleteOne()
       res.json({ message: 'plane removed'})
    } catch (error) {
        res.status(500).json({ message: 'sorry, there\'s been a server side error :('})
    }
})

// middleware

async function getPlane(req, res, next) {
    let plane
    try {
        plane = await Plane.findById(req.params.id)
        if(plane == null){res.status(404).send({ message: 'cannot find plane' })}
        }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.plane = plane
    // Go to next in line at the router this function was originally executed from:
    next()
}

//========================
// Carschema testing area:
//========================

// run();
// async function run(){
//     const bmw = await Plane.create({make: 'BMW', model: '335i', year: 2010, water: false})
//     console.log(`Plane saved!: \n ${bmw}`)
// }

// clean();
// async function clean(){
//     const plane = await Plane.deleteMany({make: 'Mazda'})
//     console.log(plane)
// }

export default router