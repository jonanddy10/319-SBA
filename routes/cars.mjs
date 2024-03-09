import express from 'express';
import carSchema from '../models/carSchema.mjs';

const router = express.Router();

// My routes:

//C: create/post
router.post("/:id", async (req, res) => {
    try {
        
    } catch (error) {
        
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