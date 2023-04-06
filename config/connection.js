require('dotenv').config()
const mongoose = require('mongoose')

const connectionString = process.env.DATABASE_URL;

mongoose.connect(connectionString);

mongoose.connection.on('connected', () => {
    console.log(`${new Date().toLocalTimeString()}] - MongoDB Connected`)
})

mongoose.connection.on('error', (error) => {
    console.log('MongoDB connection error ', error)
})

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected')
})