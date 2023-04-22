const express = require('express');
const router = express.Router();
const { Cart } = require('../models')

router.get('/', async (req, res, next) => {
    try {
        let myUser;
        if (req.session.currentUser) myUser = req.session.currentUser.username;
        const item = await Cart.find({})
        res.render('cart', {items: item, myUser})
    } catch(err) {
        console.log(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        let myUser;
        if (req.session.currentUser) myUser = req.session.currentUser.username;
        const item = await Cart.findById(req.params.id)
        updatedItem = item
        updatedItem.count = req.body.count
        await Cart.findByIdAndUpdate(req.params.id, updatedItem)
        res.redirect('/cart')
    } catch(err) {
        console.log(err)
        next()
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const removedItem = await Cart.findByIdAndDelete(req.params.id)
        res.redirect('/cart')
    } catch(err) {
        console.log(err)
        next()
    }
})

module.exports = router