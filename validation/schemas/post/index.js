const Joi = require('joi');

module.exports = {
    post: Joi.object().keys({
		text: Joi.string().required().label('text'),
	}),
};