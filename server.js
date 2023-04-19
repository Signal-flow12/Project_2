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

app.get('/', (req, res) => {
    res.send('Music shopping app')
})

app.use('', userController)
app.use('/instruments', instrumentsController);
app.use('/microphones', microphonesController);
app.use('/speakers', speakersController);
app.use('/cart', cartController)


app.get('/*', (req, res) => {
    res.render('404.ejs');
})

app.listen(PORT, () => {
    console.log(`Spinning tracks on port ${PORT}`)
})