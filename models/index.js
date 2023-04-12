require('../config/connection')

module.exports = {
    Instruments: require('./instruments'),
    Microphones: require('./microphones'),
    Speakers: require('./speakers'),
    Cart: require('./cart'),
    Seed: require('./seed')
}