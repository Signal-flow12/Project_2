const express = require ('express');
const router = express.Router();
const { Microphones } = require('../models');
const  { Seed } = require('../models');
const { Cart } = require('../models')

//Index
router.get('', async (req, res, next) =>{
    try{
        const items = await Microphones.find({});
        res.render('microphones/index', {items});
    }catch(err) {
        console.log(err);
        next();
    }
})
//New route
router.get('/new', (req, res) => {
    res.render('microphones/new')
})

router.get('/seed', async (req, res, next) => {
    try{
        await Microphones.deleteMany({});
        await Microphones.insertMany(Seed)
        res.redirect('microphones')
    }catch (err) {
        console.log(err);
        next();
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const item = await Microphones.findById(req.params.id);
        res.render('microphones/show', {item});
    }catch (err) {
        console.log(err);
        next();
    }
})

router.post('', async (req, res, next) => {
    try{
        const item = await Microphones.create(req.body)
        res.redirect('/microphones')
    }catch (err) {
        console.log(err);
        next();
    }
})

router.get('/:id/edit', async (req, res, next) => {
    try{
        const item = await Microphones.findById(req.params.id);
        res.render('microphones/edit', {item})
    }catch(err) {
        console.log(err);
        next();
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const item = await Microphones.findByIdAndUpdate(req.params.id, req.body)
        res.redirect(`/microphones/${req.params.id}`)
    }catch(err) {
        console.log(err);
        next();
    }
})

// Add to cart route
router.get('/:id/toCart', async (req, res, next) => {
    try {
        let item = await Microphones.findById(req.params.id)
        let cartItem = {
            name: item.name,
            brand: item.brand,
            image: item.image,
            price: item.price,
            description: item.description,
            location: `/microphones/${req.params.id}`,
            count: 1
        }
        const inCart = await Cart.exists({location: cartItem.location})
        if(inCart == null){
           await Cart.create(cartItem)
           res.redirect('/cart')
        } else {
            let itemV = await Cart.findOne({location: cartItem.location})
            itemV.count += 1
         await Cart.findOneAndUpdate({location: cartItem.location}, itemV)
         res.redirect('/cart')
        }
    } catch(err) {
        console.log(err)
        next()
    }
})

router.get('/:id/delete', async (req, res, next) => {
    try {
        const item = await Microphones.findById(req.params.id);
        res.render('microphones/delete', {item})
    }catch(err) {
        console.log(err);
        next();
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const item = await Microphones.findByIdAndDelete(req.params.id);
        res.redirect('/microphones')
    }catch(err) {
        console.log(err);
        next();
    }
})

module.exports = router;