// imports
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/fruits.mjs";

// variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes
app.use("./routes", router);

// error-handling
app.use((err, _req, res, next) => {
    res.status(500).send(`sorry :( there's been an error. \n(${err})`)
})

// listeners
app.listen(PORT, () => {
    console.log(`You are currently on port #${PORT}`);
})