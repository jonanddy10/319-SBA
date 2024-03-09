import express from 'express';
import carSchema from '../models/carSchema.mjs';

const router = express.Router()

// My routes:

//C: create/post
router.post("/", async (req, res) => {
    const car = new carSchema({
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

//R: read/get
router.get("/", async (req, res) => {
    try {
        const cars = await carSchema.find();
        res.send(cars)
    } catch (error) {
        res.status(500).json({ message: error.message })  
    }
})

//U: update/patch
router.patch("/:id", async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

//D: delete
router.delete("/:id", async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

export default router