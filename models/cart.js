const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name required"]
        },
        catalogueID: {
            type: String,
            required: [true, "ID Required"]
        }

    }, {timestamps: true}
);

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart