const joi = require('joi');

const PokemonValidator = {
    createPokemon: data => {
        const validateSchema = joi.object({
            name: joi.string()
            .min(6)
            .required()
            .unique(),
            description: joi.string(),
            dateReleased: joi.string(),
            type: joi.string(),
            image: joi.string()
        })

        return validateSchema.validateAsync(data)
    },
    modifyPokemon: data => {
        const validateSchema = joi.object({
            name: joi.string(),
            description: joi.string(),
            dateReleased: joi.string(),
            type: joi.string(),
            image: joi.string()
        })

        return validateSchema.validateAsync(data)
    },
    removePokemon: data => {
        
    },
    likePokemon: data => {

    }
}

module.exports = PokemonValidator