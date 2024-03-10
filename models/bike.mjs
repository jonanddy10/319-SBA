import mongoose from "mongoose";

// frame:
const bikeSchema = new mongoose.Schema({
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
})

// export function: collection name in MongoDB is: car, Schema name is: carSchema
export default mongoose.model("bike", bikeSchema);