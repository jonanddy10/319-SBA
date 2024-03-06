import express from "express";
import mongoose from "mongoose";
import Car from '../models/carSchema.mjs';

const app = express.Router();

// My routes:

//C: create/post
app.post("/", async (req, res) => {
    try {
        let newCar = new Car(req.body);
        await newCar.save();

        res.json(newCar);
    } catch (error) {
        console.error(err);
        res.status(500).json({ msg: 'Error on the server-side'})
    }
});

//R: read/get
app.get("/:id", async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

//U: update/patch
app.patch("/:id", async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

//D: delete
app.delete("/:id", async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

export default app;