const { Schema, model } = require('mongoose');

const PokemonSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    description: String,
    dateReleased: String,
    type: String,
    image: String
})

module.exports = model('User', PokemonSchema);