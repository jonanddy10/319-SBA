import mongoose from "mongoose";
import data from "../utilities/carData.mjs"

// frame:
const carSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    inProduction: {
        type: Boolean,
        required: true
    }
})

// export function: collection name in MongoDB is: car, Schema name is: carSchema
export default mongoose.model("Car", carSchema);