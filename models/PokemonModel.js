const { Schema, model } = require('mongoose');

const PokemonSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    dateReleased: Date,
    type: [String],
    image: String,
    pokedexNumber: {
        type: Number,
        unique: true,
    },
    ability: String,
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male',
    },
});

module.exports = model('Pokemon', PokemonSchema);
