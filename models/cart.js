const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
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
        },
        location: {
            required: [true, "Location Reference Required"],
            type: String
        },
        count: {
            type: Number,
            required: true,
            default: 1
        }

    }, {timestamps: true}
);

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart