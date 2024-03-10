import express from 'express';
import Car from '../models/carSchema.mjs';

const router = express.Router()

// My routes:

//C: create/post one
router.post("/", async (req, res) => {
    const car = new Car({
        make: req.body.make, 
        model: req.body.model, 
        year: req.body.year, 
        inProduction: req.body.inProduction,
    })
    try {
        const newCar = await car.save()
        res.status(201).json(newCar)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

//R: read/get ALL
router.get('/', async (req, res) => {
    try {
        const car = await Car.find()
        res.json(car)
        if(car == null){res.status(404).send({ message: 'cannot find car' })}
        }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

//R: read/get ONE
router.get('/:id', getCar, async (req, res) => {
    try {
        res.send(res.car)
    } catch (error) {
        res.status(500).json({ message: error.message })  
    }
})

//U: update/patch
router.patch("/:id", getCar, async (req, res) => {
    if(req.body.make != null){
        res.car.make = req.body.make
    }
    if(req.body.model != null){
        res.car.model = req.body.model
    }
    if(req.body.year != null){
        res.car.year = req.body.year
    }
    if(req.body.inProduction != null){
        res.car.inProduction = req.body.inProduction
    }
    try {
        const updatedCar = await res.car.save()
        res.json(updatedCar)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//D: delete ALL
router.delete("/", async (req, res) => {
    try {
        await Car.deleteMany()
        res.send({ message: 'You deleted EVERYTHING!' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//D: delete ONE
router.delete('/:id', getCar, async (req, res) => {
    try {
       await res.car.deleteOne()
       res.json({ message: 'car removed'})
    } catch (error) {
        res.status(500).json({ message: 'sorry, there\'s been a server side error :('})
    }
})

// middleware

async function getCar(req, res, next) {
    let car
    try {
        car = await Car.findById(req.params.id)
        if(car == null){res.status(404).send({ message: 'cannot find car' })}
        }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.car = car
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