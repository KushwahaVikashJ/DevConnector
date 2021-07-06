'use strict';
const responseHelper = require('../../../services/customResponse');
const dbService = require('../../../services/database/services');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const userDbHandler = dbService.User;

let _encryptPassword = (password) => {
	let salt = 10;
	// generate a salt
	return new Promise((resolve,reject)=>{
		bcrypt.genSalt(salt, function(err, salt) {
			if (err) reject(err);
			// hash the password with new salt
			bcrypt.hash(password, salt, function(err, hash) {
				if (err) reject(err);
				// override the plain password with the hashed one
				resolve(hash);
			});
		});
	});
};

module.exports = {    
    /**
	* Method to handle user signup
	*/
	signup: async (req,res) => {
		let reqObj = req.body;
		let responseData = {};
		try {
			let query = { email: reqObj.email };
			//check if user email is present in the database, then reject the signup request
			let userData = await userDbHandler.getUserDetailsByQuery(query);
			//return error if user data found has length > 0
			if(userData.length) {
				responseData.msg = 'Email Id already exists';
				return responseHelper.error(res,responseData);
			}else {

				const avatar = gravatar.url(reqObj.email,{
					s:'200',
					r:'pg',
					d:'mm'
				})
				const hashPassword = await _encryptPassword(reqObj.password)
				const userObj = {
					name:reqObj.name,
					email:reqObj.email,
					avatar,
					password:hashPassword
				}
				//create a new user in the database
				let newUser = await userDbHandler.createUser(userObj);
				//patch token data obj
				responseData.data = newUser
				responseData.msg = 'your account has been created successfully!';
				return responseHelper.success(res,responseData);
			}
		}
		catch(error) {
			console.log(error);
			responseData.msg = 'failed to create user';
			return responseHelper.error(res,responseData);
		}
	},
}