'use strict';
const responseHelper = require('../../../services/customResponse');
const dbService = require('../../../services/database/services');
const jwtService = require('../../../services/jwt');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const authDbHandler = dbService.User;

/*******************
 * PRIVATE FUNCTIONS
********************/
/**
 * Method to Compare password
 */
let _comparePassword = (reqPassword,userPassword) => {
	return new Promise((resolve,reject)=>{
		//compare password with bcrypt method, password and hashed password both are required
		bcrypt.compare(reqPassword, userPassword, function(err, isMatch) {
			if (err) reject(err);
			resolve(isMatch);
		});
	});
};
/**
 * Method to generate jwt token
 */
let _generateUserToken = (tokenData) => {
	//create a new instance for jwt service
	let tokenService = new jwtService();
	let token = tokenService.createJwtAuthenticationToken(tokenData);
	return token;
};

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
	* Method to handle user login
	*/
	login: async (req,res) => {
		let reqObj = req.body;
		// log.info('Recieved request for User Login:',reqObj);
		let responseData = {};
		try {
			let query = {
				email: reqObj.email,
			};
			//check if user email is present in the database, then only login request will process
			let userData = await authDbHandler.getUserDetailsByQuery(query);
			
			//if no user found, return error
			if(!userData.length) {
				responseData.msg = 'Email Id doesn\'t exists';
				return responseHelper.error(res,responseData);
			}
			let reqPassword = reqObj.password;
			let userPassword = userData[0].password;
			//compare req body password and user password,
			let isPasswordMatch = await _comparePassword(reqPassword,userPassword);
			//if password does not match, return error
			if(!isPasswordMatch) {
				responseData.msg = 'incorrect password';
				return responseHelper.error(res,responseData);
			}
			//patch token data obj
			let tokenData = {
				_id: userData[0]._id,
				email : userData[0].email,
				name: userData[0].name
			};
			let jwtToken = await _generateUserToken(tokenData)

			responseData.data = {token:jwtToken, userId:userData[0]._id,name:userData[0].name,email:userData[0].email,avatar:userData[0].avatar}
			responseData.msg = `Welcome ${userData[0].name}`;
			return responseHelper.success(res,responseData);
		}
		catch(error) {
			// log.error('failed to get user signup with error::',error);
			responseData.msg = 'failed to get user login';
			return responseHelper.error(res,responseData);
		}
	},

    /**
	* Method to handle user signup
	*/
	signup: async (req,res) => {
		let reqObj = req.body;
		let responseData = {};
		try {
			let query = { email: reqObj.email };
			//check if user email is present in the database, then reject the signup request
			let userData = await authDbHandler.getUserDetailsByQuery(query);
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
				let newUser = await authDbHandler.createUser(userObj);
				//patch token data obj
				let tokenData = {
					_id: newUser._id,
					email : newUser.email,
					name: newUser.name
				};
				let jwtToken = await _generateUserToken(tokenData)

				responseData.data = {token:jwtToken, userData:newUser}
				responseData.msg = 'your account has been created successfully!';
				return responseHelper.success(res,responseData);
			}
		}
		catch(error) {
			responseData.msg = 'failed to create user';
			return responseHelper.error(res,responseData);
		}
	},

	/**
	* Method to get auth user 
	*/
	authUser: async (req, res) => {
		let user = req.user;
		// log.info('Recieved fetching user profile:', user);
		let userId = user;
		let responseData = {};
		try {
			//set the projection to fetch the limited fields
			let projection = {};
			//check if user id is present in the database, then only process the request
			let userData = await authDbHandler.getUserDetailsById(userId, projection);
    
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
}