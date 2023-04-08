const express = requre('express');
const router = express.Router();

const { Instruments } = require('../models');

router.get('', async (req, res, next) => {
    try {
        const item = await Instruments.find({});
        res.render('instruments/index', {item} );
    }catch(err){
        console.log(err);
        next();
    }
});

router.get('/new', (req, res) => {
    res.render('intruments/new.ejs')
})

router.seed('see', async (req, res, next) => {
    try{
        await Instruments.deleteMany({});
        await Instruments.insertMany(seededData);
        res.redirect('/instruments')

    }catch(err){
        console.log(err);
        next();
    }
})