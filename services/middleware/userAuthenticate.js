const jwt = require('jsonwebtoken');
const config = require('config');
const responseHelper = require('../customResponse');

module.exports = function(req,res,next) {
 //Get token from header
 const token = req.header('token')
 let responseData = {};
 //Check if not token
 if(!token){
    responseData.msg = 'No token, authorization denied';
    return responseHelper.error(res,responseData);
 }

 //Verify token
 try{
     const decoded = jwt.verify(token,config.jwtsecret.secretKey);
     req.user = decoded._id;
     next()
 }catch(err){
    responseData.msg = 'Token is not valid';
    return responseHelper.error(res,responseData);
 }
}
