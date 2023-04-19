const express = require('express');
const router = express.Router();
const {Users} = require('../models');
const bcrypt = require('bcrypt');

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.get('/signup', (req, res) => {
    res.render('users/signup');
})

router.post('/login', async (req, res, next) => {
    try{
        let user;
        const userExist = await Users.exists({email: req.body.email});
        if(userExist) {
            user = await Users.findOne({email: req.body.email});
            //console.log(user)
        } else {
            return res.redirect('/login');
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            req.session.currentUser = {
                id: user._id,
                username: user.username
            };
            //console.log(req.session);
            //Where do we want to redirect upon sign in. Right now it is the home page.
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    } catch(err) {
        console.log(err);
        next();
    }
});

router.post('/signup', async(req, res, next) => {
    try {
        const newUser = req.body;
        const rounds = process.env.SALT_ROUNDS
        const salt = await bcrypt.genSalt(parseInt(rounds));
        console.log(`This is my ${salt}`);
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;
        await Users.create(newUser);
        res.redirect('/login', {user: req.session.currentUser.username})
    } catch(err) {
        console.log(err);
        next();
    }
})

router.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/login');
})

module.exports = router;