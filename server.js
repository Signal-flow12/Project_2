const express = require('express')
const app = express()
const PORT = 4000
const methodOverride = require('method-override')

//middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(express.static('public'))



app.get('/', (req, res) => {
    res.send('Music shopping app')
})


app.listen(PORT, () => {
    console.log(`Spinning tracks on port ${PORT}`)
})