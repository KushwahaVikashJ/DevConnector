const express = require('express');
const router = express.Router();
const userAuthController = require('../../controller').userAuth;
const userProfileController = require('../../controller').userProfile;
const userValidationSchema = require('../../validation').authSchema;
const profileValidationSchema = require('../../validation').userSchema;
const userAuthenticated = require('../../services/middleware/userAuthenticate');
const validationMiddleware = require('../../utils/validationMiddleware');

// Unauthorized Routes
router.post(
    '/user/login',
    validationMiddleware(userValidationSchema.login, 'body'),
    userAuthController.login
);

router.post(
    '/user/signup',
    validationMiddleware(userValidationSchema.signup, 'body'),
    userAuthController.signup
);

// Middlerware for Handling Request Authorization
// router.use('/', userAuthenticated);

// Authorized Routes
router.get(
    '/user/auth',userAuthenticated,
    userAuthController.authUser
)

router.get(
    '/user/profile/allProfile',
    userProfileController.allProfile
)

router.get(
    '/user/profile/:user_id',
    userProfileController.profile
)

router.post(
    '/user/profile',userAuthenticated,
    validationMiddleware(profileValidationSchema.profile, 'body'),
    userProfileController.updateProfile
);

router.delete(
    '/user/profile',userAuthenticated,
    userProfileController.deleteProfile
);

router.put(
    '/user/profile/experience',userAuthenticated,
    validationMiddleware(profileValidationSchema.experience, 'body'),
    userProfileController.updateUserExperience
);

router.delete(
    '/user/profile/experience/:exp_id',userAuthenticated,
    userProfileController.deleteUserExperience
);

router.put(
    '/user/profile/education',userAuthenticated,
    validationMiddleware(profileValidationSchema.education, 'body'),
    userProfileController.updateUserEducation
);

router.delete(
    '/user/profile/education/:edu_id',userAuthenticated,
    userProfileController.deleteUserEducation
);

router.get(
    '/user/profile/github/:username',
    userProfileController.userGitRepos
);

module.exports = router;