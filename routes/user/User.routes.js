const express = require('express');
const router = express.Router();
const userAuthController = require('../../controller').userAuth;
const userProfileController = require('../../controller').userProfile;
const userPostController = require('../../controller').userPost;
const userValidationSchema = require('../../validation').authSchema;
const profileValidationSchema = require('../../validation').userSchema;
const postValidationSchema = require('../../validation').postSchema;
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

// User Profile Routes
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

// User Post Routes
router.post(
    '/user/post',userAuthenticated,
    validationMiddleware(postValidationSchema.post, 'body'),
    userPostController.addPost
);

router.get(
    '/user/post',userAuthenticated,
    userPostController.allPost
);

router.get(
    '/user/post/:postId',userAuthenticated,
    userPostController.postById
);

router.delete(
    '/user/post/:postId',userAuthenticated,
    userPostController.deletePost
);

router.put(
    '/user/post/like/:postId',userAuthenticated,
    userPostController.likePost
);

router.put(
    '/user/post/unlike/:postId',userAuthenticated,
    userPostController.unlikePost
);

router.post(
    '/user/post/comment/:postId',userAuthenticated,
    validationMiddleware(postValidationSchema.post, 'body'),
    userPostController.addComment
);

router.delete(
    '/user/post/comment/:postId/:commId',userAuthenticated,
    userPostController.removeComment
);

module.exports = router;