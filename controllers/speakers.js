const express = require ('express');
const router = express.Router();
const { Speakers } = require('../models')
const  { Seed } = require('../models')
const { Cart } = require('../models')

router.get('', async (req, res, next) => {
    try{
        let myUser;
        if (req.session.currentUser) myUser = req.session.currentUser.username;
        const items = await Speakers.find({});
        res.render('speakers/index', {items, myUser})
    }catch(err) {
        console.log(err);
        next();
    }
})

router.get('/new', (req, res, next) => {
    let myUser;
    if (req.session.currentUser) myUser = req.session.currentUser.username;
    res.render('speakers/new', {myUser});
})

router.get('/seed', async (req, res, next) => {
    try{
        
        await Speakers.deleteMany({});
        await Speakers.insertMany(Seed)
        res.redirect('speakers')
    }catch (err) {
        console.log(err);
        next();
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        let myUser;
        if (req.session.currentUser) myUser = req.session.currentUser.username;
        const item = await Speakers.findById(req.params.id)
        res.render('speakers/show', {item, myUser})
    }catch(err) {
        console.log(err);
        next();
    }
})

router.post('', async (req, res, next) => {
    try{
        const item = await Speakers.create(req.body);
        res.redirect('/speakers')
    }catch(err) {
        console.log(err);
        next();
    }
})

router.get('/:id/edit', async (req, res, neext) => {
    try{
        let myUser;
        if (req.session.currentUser) myUser = req.session.currentUser.username;
        const item = await Speakers.findById(req.params.id);
        res.render('speakers/edit', {item, myUser});
    }catch(err) {
        console.log(err);
        next();
    }
})

router.put('/:id', async (req, res, next) => {
    try{
        const item = await Speakers.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/speakers/${req.params.id}`)
    }catch(err) {
        console.log(err);
        next();
    }
})

// Add to cart route
router.get('/:id/toCart', async (req, res, next) => {
    try {
        let item = await Speakers.findById(req.params.id)
        let cartItem = {
            name: item.name,
            brand: item.brand,
            image: item.image,
            price: item.price,
            description: item.description,
            location: `/speakers/${req.params.id}`,
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
        let myUser;
        if (req.session.currentUser) myUser = req.session.currentUser.username;
        const item = await Speakers.findById(req.params.id);
        res.render('speakers/delete.ejs', {item, myUser})
    } catch(err) {
        console.log(err);
        next();
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const item = await Speakers.findByIdAndDelete(req.params.id);
        res.redirect('/speakers');
    } catch(err) {
        console.log(err);
        next();
    }
})

module.exports = router; 