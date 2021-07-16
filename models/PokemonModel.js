const { Schema, model } = require('mongoose');

const PokemonSchema = new Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },
    description: String,
    dateReleased: String,
    type: [String],
    image: String,
    pokedexNumber: Number,
    abilities: [String],
    gender: {
        type: String, 
        enum: ['male', 'female'],
        default: 'male'
    }
})

module.exports = model('User', PokemonSchema);