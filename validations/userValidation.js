//user validations using joi package
const joi = require('joi');

exports.registerValidation = (data) => {
    user = joi.object({
        email: joi
        .string()
        .required()
        .email(),
        
        password: joi
        .string()
        .required()
        .min(8)
    });
    return user.validate(data);
}