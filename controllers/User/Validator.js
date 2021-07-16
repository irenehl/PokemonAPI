const joi = require('joi');

const Validator = {
    registerValidator: data => {
        const validateSchema = joi.object({
            name: joi.string()
            .min(6)
            .required(),
            username: joi.string()
            .min(6)
            .required(),
            email: joi.string()
            .min(6)
            .required()
            .email(),
            password: joi.string()
            .min(6)
            .required(),
            admin: joi.boolean()
            .required()
        })

        return validateSchema.validateAsync(data)
    },

    loginValidator: data => {
        const ValidateSchema = joi.object({
            username: joi.string()
            .min(6),
            email: joi.string()
            .min(6)
            .email(),
            pasword: joi.string()
            .min(6)
            .required()
        })

        return validateSchema.validateAsync(data)
    }
}