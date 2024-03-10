import mongoose from "mongoose";

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

// export function: collection name in MongoDB is: car, Schema name is: carSchema
export default mongoose.model("plane", planeSchema);