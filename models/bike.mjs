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

// export function: collection name in MongoDB is: bike, Schema name is: bikeSchema
export default mongoose.model("bike", bikeSchema);