const express = require('express');
const app = express();
const PORT = 4000;
const methodOverride = require('method-override');
const instrumentsController = require('./controllers/instruments');
const microphonesController = require('./controllers/microphones');
const speakersController = require('./controllers/speakers');
const cartController = require('./controllers/cart')

//middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));



app.get('/', (req, res) => {
    res.send('Music shopping app')
})

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