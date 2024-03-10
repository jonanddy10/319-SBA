import mongoose from "mongoose";
import planeData from "../utilities/planeData.mjs"

// frame:
const planeSchema = new mongoose.Schema({
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
    water: {
        type: Boolean,
        required: true
    }
})

// export function: collection name in MongoDB is: plane, Schema name is: planeSchema
export default mongoose.model("plane", planeSchema);