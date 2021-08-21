const Joi = require('joi');

module.exports = {
    profile: Joi.object().keys({
		status: Joi.string().required().label('status'),
		company: Joi.string().allow('').label('company'),
		website: Joi.string().allow('').label('website'),
		location: Joi.string().allow('').label('location'),
		bio: Joi.string().allow('').label('bio'),
		skills: Joi.string().required().label('skills'),
		githubusername: Joi.string().allow('').label('githubusername'),
		youtube: Joi.string().allow('').label('youtube'),
		facebook: Joi.string().allow('').label('facebook'),
		twitter: Joi.string().allow('').label('twitter'),
		instagram: Joi.string().allow('').label('instagram'),
		linkedin: Joi.string().allow('').label('linkedin')
	}),
	experience: Joi.object().keys({
		title: Joi.string().required().label('title'),
		company: Joi.string().required().label('company'),
		location: Joi.string().label('location'),
		from: Joi.date().required().label('from'),
		to: Joi.date().allow('').label('to'),
		current: Joi.boolean().allow('').label('current'),
		description: Joi.string().allow('').label('description')
	}),
	education: Joi.object().keys({
		school: Joi.string().required().label('title'),
		degree: Joi.string().required().label('company'),
		fieldofstudy: Joi.string().required().label('location'),
		from: Joi.date().required().label('from'),
		to: Joi.date().allow('').label('to'),
		current: Joi.boolean().allow('').label('current'),
		description: Joi.string().allow('').label('description')
	}),
};