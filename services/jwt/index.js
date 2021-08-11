'use strict';
const jwt = require('jsonwebtoken');
const config = require('config');
/*******************************************
 * SERVICE FOR HANDLING JWT TOKEN GENERATION
 *******************************************/
class JwtService {
	/**
	 * Method to Generate sign new Jwt token using Json web token for user login
	 */
	createJwtAuthenticationToken(tokenData) {
		return jwt.sign(
			tokenData,
			config.jwtsecret.secretKey,
			{
				algorithm: config.jwtsecret.algorithm,
				expiresIn: config.jwtsecret.expiresIn,
				issuer: config.jwtsecret.issuer,
				audience: config.jwtsecret.audience
			});
	}
}
module.exports = JwtService;