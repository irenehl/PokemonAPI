const joi = require('joi');

const PokemonValidator = {
    createPokemonValidator: (data) => {
        const validateSchema = joi.object({
            name: joi.string()
                .min(6)
                .required(),

            description: joi.string()
                .required(),

            'date-released': joi.date()
                .required(),

            type: joi.array()
                .required(),

            image: joi.string(),

            'pokedex-number': joi.number()
                .required(),

            ability: joi.string()
                .required(),

            gender: joi.string()
                .valid('male', 'female')
                .required(),
        });

        return validateSchema.validateAsync(data);
    },

    modifyPokemonValidator: (data) => {
        const validateSchema = joi.object({
            name: joi.string(),
            description: joi.string(),
            dateReleased: joi.string(),
            type: joi.string(),
            image: joi.string(),
            pokedexNumber: joi.number(),
            abilities: joi.array(),
            gender: joi.string(),
        });

        return validateSchema.validateAsync(data);
    },

    removePokemon: (data) => {
        const validateSchema = joi.object({
            id: joi.string(),
        });

        return validateSchema.validateAsync(data);
    },

    likePokemon: (data) => {
        const validateSchema = joi.object({
            id: joi.string(),
        });

        return validateSchema.validateAsync(data);
    },
};

module.exports = PokemonValidator;
