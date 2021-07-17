const joi = require('joi');

const UserValidator = {
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
    }
}

module.exports = UserValidator