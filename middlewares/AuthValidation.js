const joi = require('joi');

// Backend validation for signup
const signupValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(4).max(20).required(),
        lastname: joi.string().min(4).max(20).required(),
        email: joi.string().email().required(),
        phone: joi.string().pattern(/^\d{10}$/).required(),
        dob: joi.date().iso().required(),
        gender: joi.string().valid('male', 'female', 'other').required(),
        password: joi.string().min(8).required(),
        country: joi.string().required(),
        state: joi.string().allow(""),
        pincode: joi.string().pattern(/^\d{5,6}$/).required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: 'Bad request',
            errors: error.details.map((err) => err.message), 
        });
    }
    next();
};
const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required()
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: 'Bad request',
            errors: error.details.map((err) => err.message), 
        });
    }
    next();
};

module.exports = {signupValidation,loginValidation};
