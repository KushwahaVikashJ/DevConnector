const Joi = require('joi');

module.exports = {
    login: Joi.object().keys({
		email: Joi.string().email().required().label('Email'),
		password: Joi.string().required().label('Password'),
	}),
	signup: Joi.object().keys({
		name: Joi.string().required().regex(/^[a-zA-Z. ]*$/).message("Name should accept only characters").min(3).label('Name'),
		email: Joi.string().email().required().label('Email'),
		password: Joi.string().min(6).required().label('Password'),		
	}),
};