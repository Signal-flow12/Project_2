const express = require('express');
const router = express.Router();
const { Instruments } = require('../models');
const  { Seed } = require('../models');
const { default: mongoose } = require('mongoose');
const { Cart } = require('../models')

//Index route home page
router.get('', async (req, res, next) => {
    try {
        const item = await Instruments.find({});
        res.render('instruments/index', {items: item} );
    }catch(err){
        console.log(err);
        next();
    }
});

router.get('/new', (req, res) => {
    res.render('instruments/new.ejs')
})

//seed route reset data
router.get('/seed', async (req, res, next) => {
    try{
        await Instruments.deleteMany({});
        await Instruments.create(Seed);
        res.redirect('/instruments')

    }catch(err){
        console.log(err);
        next();
    }
})

//show route
router.get('/:id', async (req, res, next) => {
    try {
        const item = await Instruments.findById(req.params.id);
        res.render('instruments/show', {item})
    } catch (err) {
        console.log(err)
        next();
    }
})

//post route
router.post('', async (req, res, next) => {
    try{
        const item = await Instruments.create(req.body);
        res.redirect('/instruments')
    } catch(err) {
        console.log(err);
        next();
    }
})

//Edit/Get route 
router.get('/:id/edit', async (req, res, next) => {
    try {
        const item = await Instruments.findById(req.params.id);
        res.render('instruments/edit', {item})
    }catch(err) {
        console.log(err);
        next();
    }
})

//Put route shows newely edited item
router.put('/:id', async (req, res, next) => {
    try {
        const item = await Instruments.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/instruments/${req.params.id}`)
    } catch(err) {
        console.log(err);
        next();
    }
})

//Add to cart route
router.post('/:id/toCart', async (req, res, next) => {
    try {
        const catalogueItem = await Instruments.findById(req.params.id)
        const cartItem = {
            
        }
    } catch(err) {
        console.log(err)
        next()
    }
})

//Get route for delete
router.get('/:id/delete', async (req, res, next) => {
    try{
        const item = await Instruments.findById(req.params.id);
        res.render('instruments/delete', {item})
    } catch(err) {
        console.log(err);
        next();
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const item  = await Instruments.findByIdAndDelete(req.params.id)
        res.redirect('/instruments');
    } catch(err) {
        console.log(err);
        next();
    }
})
//exports router to server
module.exports = router;