import mongoose from "mongoose";

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

// export function: collection name in MongoDB: car, Schema name: carSchema
export default mongoose.model("car", carSchema);