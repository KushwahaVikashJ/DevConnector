const Joi = require('joi');

module.exports = {
    profile: Joi.object().keys({
		status: Joi.string().required().label('status'),
		company: Joi.string().label('company'),
		website: Joi.string().label('website'),
		location: Joi.string().label('location'),
		bio: Joi.string().label('bio'),
		skills: Joi.string().required().label('skills'),
		githubusername: Joi.string().label('githubusername'),
		youtube: Joi.string().label('youtube'),
		facebook: Joi.string().label('facebook'),
		twitter: Joi.string().label('twitter'),
		instagram: Joi.string().label('instagram'),
		linkedin: Joi.string().label('linkedin')
	}),
	experience: Joi.object().keys({
		title: Joi.string().required().label('title'),
		company: Joi.string().required().label('company'),
		location: Joi.string().label('location'),
		from: Joi.string().required().label('from'),
		to: Joi.string().label('to'),
		current: Joi.boolean().label('current'),
		description: Joi.string().label('description')
	}),
	education: Joi.object().keys({
		school: Joi.string().required().label('title'),
		degree: Joi.string().required().label('company'),
		fieldofstudy: Joi.string().required().label('location'),
		from: Joi.string().required().label('from'),
		to: Joi.string().label('to'),
		current: Joi.boolean().label('current'),
		description: Joi.string().label('description')
	}),
};