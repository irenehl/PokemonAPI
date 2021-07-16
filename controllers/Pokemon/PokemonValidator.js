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
            image: joi.string(),
            podekexNumber: joi.number(),
            abilities: joi.array(),
            gender: joi.array()
        })

        return validateSchema.validateAsync(data)
    },
    modifyPokemon: data => {
        const validateSchema = joi.object({
            name: joi.string(),
            description: joi.string(),
            dateReleased: joi.string(),
            type: joi.string(),
            image: joi.string(),
            podekexNumber: joi.number(),
            abilities: joi.array(),
            gender: joi.array()
        })

        return validateSchema.validateAsync(data)
    },
    removePokemon: data => {
        const validateSchema = joi.object({
            id: joi.string()
        })

        return validateSchema.validateAsync(data)
    },
    likePokemon: data => {
        const validateSchema = joi.object({
            id: joi.string()
        })

        return validateSchema.validateAsync(data)
    },
    likeManyPokemon: data => {
        const validateSchema = joi.object({
            id: joi.array()
        })

        return validateSchema.validateAsync(data)
    }
}

module.exports = PokemonValidator