'use strict';
const request = require('request');
const config = require('config');

const responseHelper = require('../../../services/customResponse');
const dbService = require('../../../services/database/services');
const userDbHandler = dbService.Profile;
const authDbHandler = dbService.User;

module.exports = {
	/**
    * Method to update user profile
	*/
	updateProfile: async (req, res) => {
		let updateObj = req.body;
		let user = req.user;
		
		// log.info('Recieved request for User profile update:', user, updateObj);
		let userId = user;
		let responseData = {};

		const {
		company,
		website,
		location,
		bio,
		status,
		githubusername,
		skills,
		youtube,
		facebook,
		twitter,
		instagram,
		linkedin
		} = updateObj;
	
		// Build profile object
		const profileFields = {};
		profileFields.user = req.user;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;
		if (skills) {
		profileFields.skills = skills.split(',').map(skill => skill.trim());
		}
	
		// Build social object
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;
	  
		try {
			//check if user ID is present in the database, then only process the update profile request
			let updateUser = await userDbHandler.getProfileDetailsById(userId);
			//return error if user data found is null
			if (updateUser) {
				updateUser = await userDbHandler.updateProfileDetailsById(
					userId,
					profileFields
				);
				responseData.data = {userData:updateUser}
				responseData.msg = 'user profile updated successfully';
				return responseHelper.success(res, responseData);
			} else {
				
				updateUser = await userDbHandler.createProfile(
					profileFields
				);
				// log.info('failed to update use profile', updatedUser);
				responseData.data = {userData:updateUser}
				responseData.msg = 'new user profile created successfully';
				return responseHelper.success(res, responseData);
				
			}
		} catch (error) {
			// log.error('failed to updated user profile with error::', error);
			responseData.msg = 'failed to update user profile';
			return responseHelper.error(res, responseData);
		}
	}, 

    /**
	* Method to get user profile by userId
	*/
	profile: async (req, res) => {
		let user = req.params.user_id;
		// log.info('Recieved fetching user profile:', user);
		let userId = user;
		let responseData = {};
		try {
			//set the projection to fetch the limited fields
			let projection = {};
			//check if user id is present in the database, then only process the request
			let userData = await userDbHandler.getProfileDetailsById(userId, projection);
    
			//if no user found, return error
			if (!userData) {
				responseData.msg = 'no user profile found';
				return responseHelper.error(res, responseData);
			}
			// log.info('User profile found', userData);
			//update the response Data
			responseData.msg = 'user profile fetched successfully';
			responseData.data = { userData: userData };
			return responseHelper.success(res, responseData);
		} catch (error) {
			// log.error('failed to get user profile with error::', error);
			responseData.msg = 'failed to get user profile';
			return responseHelper.error(res, responseData);
		}
	},

	/**
	* Method to get all user profile
	*/
	allProfile: async (req, res) => {
		let user = req.user;
		// log.info('Recieved fetching user profile:', user);
		let userId = user;
		let responseData = {};
		try {
			//set the projection to fetch the limited fields
			let query = {}
			let projection = {};
			//check if user id is present in the database, then only process the request
			let userData = await userDbHandler.getProfileDetailsByQuery(query, projection);
    
			//if no user found, return error
			if (!userData) {
				responseData.msg = 'no user profile found';
				return responseHelper.error(res, responseData);
			}
			// log.info('User profile found', userData);
			//update the response Data
			responseData.msg = 'users profile fetched successfully';
			responseData.data = { userData: userData };
			return responseHelper.success(res, responseData);
		} catch (error) {
			console.log(error)
			// log.error('failed to get user profile with error::', error);
			responseData.msg = 'failed to get users profile';
			return responseHelper.error(res, responseData);
		}
	},

	/**
	* Method to delete user and profile 
	*/
	deleteProfile: async (req, res) => {
		let user = req.user;
		// log.info('Recieved fetching user profile:', user);
		let userId = user;
		let responseData = {};
		try {
			//set the projection to fetch the limited fields
			let projection = {};
			//check if user id is present in the database, then only process the request
			let userData = await userDbHandler.getProfileDetailsById(userId, projection);
    
			//if no user found, return error
			if (!userData) {
				responseData.msg = 'no user profile found';
				return responseHelper.error(res, responseData);
			}
			//delete profile
			await userDbHandler.deleteProfileById(userId);
			//delete user
			await authDbHandler.deleteUserById(userId);
			responseData.msg = 'user deleted successfully';
			return responseHelper.success(res, responseData);
		} catch (error) {
			console.log(error)
			// log.error('failed to get user profile with error::', error);
			responseData.msg = 'failed to delete user';
			return responseHelper.error(res, responseData);
		}
	},

	/**
    * Method to update user experience
	*/
	updateUserExperience: async (req, res) => {
		let updateObj = req.body;
		let user = req.user;
		
		// log.info('Recieved request for User profile update:', user, updateObj);
		let userId = user;
		let responseData = {};

		const {
			title,
			company,
			location,
			from,
			to,
			current,
			description
		} = updateObj;
	
		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
			description
		};
	  
		try {
			//check if user ID is present in the database, then only process the update profile request
			let updateUser = await userDbHandler.getProfileDetailsById(userId);
			
			//return error if user data found is null
			if (updateUser) {
				updateUser.experience.unshift(newExp)
				updateUser = await updateUser.save()
				responseData.data = {userData:updateUser}
				responseData.msg = 'user experience updated successfully';
				return responseHelper.success(res, responseData);
			} else {
				responseData.msg = 'failed to update user experience';
				return responseHelper.error(res, responseData);			
			}
		} catch (error) {
			console.log(error)
			// log.error('failed to updated user profile with error::', error);
			responseData.msg = 'failed to update user experience';
			return responseHelper.error(res, responseData);
		}
	}, 

	/**
    * Method to delete user experience
	*/
	deleteUserExperience: async (req, res) => {
		let expId = req.params.exp_id;
		let user = req.user
		// log.info('Recieved request for User profile update:', user, updateObj);
		let userId = user;
		let responseData = {};
		
		try {
			//check if user ID is present in the database, then only process the update profile request
			let updateUser = await userDbHandler.getProfileDetailsById(userId);
			
			//return error if user data found is null
			if (updateUser) {
				updateUser.experience = updateUser.experience.filter(exp => exp._id.toString() !== expId);
				await updateUser.save();
				responseData.data = {userData:updateUser}
				responseData.msg = 'user experience deleted successfully';
				return responseHelper.success(res, responseData);
			} else {
				responseData.msg = 'failed to delete user experience';
				return responseHelper.error(res, responseData);			
			}
		} catch (error) {
			console.log(error)
			// log.error('failed to updated user profile with error::', error);
			responseData.msg = 'failed to delete user experience';
			return responseHelper.error(res, responseData);
		}
	}, 

	/**
    * Method to update user education
	*/
	updateUserEducation: async (req, res) => {
		let updateObj = req.body;
		let user = req.user;
		
		// log.info('Recieved request for User profile update:', user, updateObj);
		let userId = user;
		let responseData = {};

		const {
		school,
		degree,
		fieldofstudy,
		from,
		to,
		current,
		description
		} = updateObj;
	
		const newEdu = {
		school,
		degree,
		fieldofstudy,
		from,
		to,
		current,
		description
		};
	  
		try {
			//check if user ID is present in the database, then only process the update profile request
			let updateUser = await userDbHandler.getProfileDetailsById(userId);
			
			//return error if user data found is null
			if (updateUser) {
				updateUser.education.unshift(newEdu)
				updateUser = await updateUser.save()
				responseData.data = {userData:updateUser}
				responseData.msg = 'user education updated successfully';
				return responseHelper.success(res, responseData);
			} else {
				responseData.msg = 'failed to update user education';
				return responseHelper.error(res, responseData);			
			}
		} catch (error) {
			console.log(error)
			// log.error('failed to updated user profile with error::', error);
			responseData.msg = 'failed to update user education';
			return responseHelper.error(res, responseData);
		}
	}, 

	/**
    * Method to delete user education
	*/
	deleteUserEducation: async (req, res) => {
		let eduId = req.params.edu_id;
		let user = req.user
		// log.info('Recieved request for User profile update:', user, updateObj);
		let userId = user;
		let responseData = {};
		
		try {
			//check if user ID is present in the database, then only process the update profile request
			let updateUser = await userDbHandler.getProfileDetailsById(userId);
			
			//return error if user data found is null
			if (updateUser) {
				updateUser.education = updateUser.education.filter(edu => edu._id.toString() !== eduId);
				await updateUser.save();
				responseData.data = {userData:updateUser}
				responseData.msg = 'user education deleted successfully';
				return responseHelper.success(res, responseData);
			} else {
				responseData.msg = 'failed to delete user education';
				return responseHelper.error(res, responseData);			
			}
		} catch (error) {
			console.log(error)
			// log.error('failed to updated user profile with error::', error);
			responseData.msg = 'failed to delete user education';
			return responseHelper.error(res, responseData);
		}
	},

	/**
	* Method to get user github repos
	*/
	userGitRepos: async (req, res) => {
		let username = req.params.username;
		// log.info('Recieved fetching user profile:', user);
		let responseData = {};
		try {
			const options = {
				uri:`https://api.github.com/users/${
				  username
				}/repos?per_page=1&sort=created:asc&client_id=${config.githubClientId
				}&client_secret=${config.githubSecret}`,
				method: 'GET',
				headers: { 'user-agent': 'node.js' }
			};

			request(options, (error, response, body) => {
				if (error) console.error(error);
			
				if (response.statusCode !== 200) {
					responseData.msg = 'No Github profile found';
					return responseHelper.error(res, responseData);
				}
				responseData.msg = 'Github profile fetched successfully';
				responseData.data = { userData: JSON.parse(body) };
				return responseHelper.success(res, responseData);
			})
		} catch (error) {
			// log.error('failed to get user profile with error::', error);
			responseData.msg = 'No Github profile found';
			return responseHelper.error(res, responseData);
		}
	},
}