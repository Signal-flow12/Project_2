const mongoose = require('mongoose')

const microphonesSchema = new mongoose.Schema(
{
    name: {
        required: [true, "All Fields Required"],
        type: String,
    },
    brand: {
        required: [true, "All Fields Required"],
        type: String,
    },
    image: {
        type: String,
        default: "."
    },
    price: {
        required: [true, "All Fields Required"],
        type: String,
    },
    description: {
        required: [true, "All Fields Required"],
        type: String,
    }
    
}, {timestamps: true}
)

const Microphones = mongoose.model('microphones', microphonesSchema)