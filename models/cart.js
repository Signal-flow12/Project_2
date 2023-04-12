const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name required"]
        },
        image: {
            type: String
        },
        catLocation: {
            type: String,
            required: [true, "Link Required"]
        },
        price: {
            type: Number,
            required: [true, "Price Required"]
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