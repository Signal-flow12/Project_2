const express = require (express);
const router = express.Router();
const { Speakers } = require('../Models')
const  { Seed } = require('../models')

router.get('', async (req, res, next) => {
    try{
        const items = await Speakers.find({});
        res.render('speakers/index', {items})
    }catch(err) {
        console.log(err);
        next();
    }
})

router.get('/new', (req, res, next) => {
    res.render('speakers/new');
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
        const item = await Speakers.findById(req.params.id)
        res.render('speakers/show', {item})
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



    







module.exports = router;