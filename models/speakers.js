const mongoose = require('mongoose')

const speakersSchema = new mongoose.Schema(
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
        type: Number,
    },
    description: {
        required: [true, "All Fields Required"],
        type: String,
    }
    
}, {timestamps: true}
)

const Speakers = mongoose.model('speakers', speakersSchema)

module.exports = Speakers