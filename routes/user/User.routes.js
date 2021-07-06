const express = require('express');
const router = express.Router();
const userAuthController = require('../../controller').userAuth;
const userValidationSchema = require('../../validation').authSchema;
const validationMiddleware = require('../../utils/validationMiddleware');

// @route  Authentication

router.post(
    '/user/signup',
    validationMiddleware(userValidationSchema.signup, 'body'),
    userAuthController.signup
);

module.exports = router;