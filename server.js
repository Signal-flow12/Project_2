const express = require('express');
const app = express();
const PORT = 4000;
const methodOverride = require('method-override');
const instrumentsController = require('./controllers/instruments');
const microphonesController = require('./controllers/microphones');
const speakersController = require('./controllers/speakers');
const cartController = require('./controllers/cart')
const userController = require('./controllers/users')
const session = require('express-session');
const MongoStore = require('connect-mongo')
const { Instruments } = require('./models');
const { Microphones } = require('./models');
const { Speakers } = require('./models');

//middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(
    session({
        store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        },
    }) 
);

// app.use((req, res, next) => {
//     const guest = [
//         {href: '/login', title: 'login'},
//         {href: '/signup', title: 'signup'}
//     ];
//     const loggedIn = [
//         {href: '/intruments', title: 'Intruments'}
//     ];
//     let user;
//     function isLoggedIn() {
//         res.locals.username = req.session.currentUser.username;
//         res.locals.routes = loggedIn;
//     }
//     function guestUser() {
//         res.locals.routes = guest;
//     }
//     req.session.currentUser ? isLoggedIn() : guestUser;
// })


app.use('', userController)
app.use('/instruments', instrumentsController);
app.use('/microphones', microphonesController);
app.use('/speakers', speakersController);
app.use('/cart', cartController)

app.get('/', async (req, res, next) => {
    try {
        let ranInstrument;
        let ranMicrophone;
        let ranSpeaker;

        const instruments = await Instruments.find({});
        ranInstrument = instruments[Math.floor(Math.random() * instruments.length - 1)]
        //console.log("ranInstrument:" + ranInstrument)

        const microphones = await Microphones.find({});
        ranMicrophone = Math.floor[Math.random() * microphones.length - 1]
        console.log('ranMicrophone' + ranMicrophone)
        //console.log(microphones)

        const speakers = await Speakers.find({});
        ranSpeaker = Math.floor[Math.random() * speakers.length - 1]

        // console.log(speakers)

        res.render('./index', {ranInstrument, ranMicrophone, ranSpeaker} )


    } catch(err) {
        console.log(err)
        next();
    }});

app.get('/*', (req, res) => {
    res.render('404.ejs');
})

app.listen(PORT, () => {
    console.log(`Spinning tracks on port ${PORT}`)
})