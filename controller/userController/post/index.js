'use strict';

const responseHelper = require('../../../services/customResponse');
const dbService = require('../../../services/database/services');
const userDbHandler = dbService.Profile;
const authDbHandler = dbService.User;
const postDbHandler = dbService.Post;

module.exports = {
	/**
    * Method to add user post
	*/
	addPost: async (req, res) => {
		let updateObj = req.body;
		let user = req.user;
		
		// log.info('Recieved request for User profile update:', user, updateObj);
		let userId = user;
		let responseData = {};

		try {
			//check if user ID is present in the database
			let User = await authDbHandler.getUserDetailsById(userId);		
			//return error if user data found is null
			if (!User) {
				responseData.msg = 'User not found';
				return responseHelper.error(res, responseData);
			} else {				
				const newPost = {
					text: updateObj.text,
					name: User.name,
					avatar: User.avatar,
					user: userId
				}
 
				const post = await postDbHandler.createPost(newPost);
				responseData.data = post
				responseData.msg = 'New post created successfully';
				return responseHelper.success(res, responseData);				
			}
		} catch (error) {
			responseData.msg = 'Failed to create new post';
			return responseHelper.error(res, responseData);
		}
	}, 

    /**
	* Method to get user post by Id
	*/
	postById: async (req, res) => {
		let postId = req.params.postId;
		// log.info('Recieved fetching user profile:', user);
		let responseData = {};
		try {
			//set the projection to fetch the limited fields
			let projection = {};
			//check if user id is present in the database, then only process the request
			let postData = await postDbHandler.getPostDetailsById(postId, projection);
    
			if (!postData) {
				responseData.msg = 'No user post found';
				return responseHelper.error(res, responseData);
			}
			// log.info('User profile found', userData);
			responseData.msg = 'User post fetched successfully';
			responseData.data = postData;
			return responseHelper.success(res, responseData);
		} catch (error) {
			// log.error('failed to get user profile with error::', error);
			responseData.msg = 'Failed to get user post';
			return responseHelper.error(res, responseData);
		}
	},

	/**
	* Method to get user all post
	*/
	allPost: async (req, res) => {
		let user = req.user;
		// log.info('Recieved fetching user profile:', user);
		let userId = user;
		let responseData = {};
		try {
			//set the projection to fetch the limited fields
			let query = {}
			let projection = {};
			//check if user id is present in the database, then only process the request
			let postData = await postDbHandler.getPostDetailsByQuery(query, projection);
    
			//if no user found, return error
			if (!postData) {
				responseData.msg = 'No user post found';
				return responseHelper.error(res, responseData);
			}
			// log.info('User profile found', userData);
			//update the response Data
			responseData.msg = 'Users posts fetched successfully';
			responseData.data = postData;
			return responseHelper.success(res, responseData);
		} catch (error) {
			console.log(error)
			// log.error('failed to get user profile with error::', error);
			responseData.msg = 'Failed to get user posts';
			return responseHelper.error(res, responseData);
		}
	},

	/**
	* Method to delete post 
	*/
	deletePost: async (req, res) => {
		let user = req.user;
		// log.info('Recieved fetching user profile:', user);
		let userId = user;
		let postId = req.params.postId;
		let responseData = {};
		try {
			//set the projection to fetch the limited fields
			let projection = {};
			//check if user id is present in the database, then only process the request
			let postData = await postDbHandler.getPostDetailsById(postId, projection);
            if(!postData){
				responseData.msg = 'Post not found';
				return responseHelper.error(res, responseData);				
			}

			if (postData.user.toString()!==userId) {
				responseData.msg = 'You are not authorized to delete this post';
				return responseHelper.error(res, responseData);
			}
			
			postData.remove();
			responseData.msg = 'Post deleted successfully';
			return responseHelper.success(res, responseData);
		} catch (error) {
			console.log(error)
			// log.error('failed to get user profile with error::', error);
			responseData.msg = 'Failed to delete post';
			return responseHelper.error(res, responseData);
		}
	},

	/**
    * Method to like the post
	*/
	likePost: async (req, res) => {
		let user = req.user;
		// log.info('Recieved request for User profile update:', user, updateObj);
		let userId = user;
		let postId = req.params.postId
		let responseData = {};
	  
		try {
			//check if user ID is present in the database, then only process the update profile request
			let post = await postDbHandler.getPostDetailsById(postId);
			if(!post){
				responseData.msg = 'Post not found';
				return responseHelper.error(res, responseData);	
			}

			if(post.likes.filter(like=>like?.user?.toString() === userId).length>0){
				responseData.msg = 'You like the post already';
				return responseHelper.error(res, responseData);	
			}
			else{
				post.likes.unshift({user:userId})
				const updatePost = await post.save()
				responseData.data = updatePost.likes
				responseData.msg = 'Like added successfully';
				return responseHelper.success(res, responseData);
			}
		} catch (error) {
			// log.error('failed to updated user profile with error::', error);
			responseData.msg = 'Failed to like the post';
			return responseHelper.error(res, responseData);
		}
	}, 

	/**
    * Method to unlike post
	*/
	unlikePost: async (req, res) => {
		let postId = req.params.postId;
		let user = req.user
		// log.info('Recieved request for User profile update:', user, updateObj);
		let userId = user;
		let responseData = {};
		
		try {
			//check if user ID is present in the database, then only process the update profile request
			let post = await postDbHandler.getPostDetailsById(postId);
			if(!post){
				responseData.msg = 'Post not found';
				return responseHelper.error(res, responseData);	
			}

			if(post.likes.filter(like=>like?.user?.toString() === userId).length===0){
				responseData.msg = 'Post has not been liked yet by you';
				return responseHelper.error(res, responseData);	
			}
			else{
				const removeIndex = post.likes.map(like=>like.user.toString()).indexOf(userId);
				post.likes.splice(removeIndex,1);
				await post.save();
				responseData.data = post.likes
				responseData.msg = 'Post unliked successfully';
				return responseHelper.success(res, responseData);
			}
		} catch (error) {
			console.log(error)
			// log.error('failed to updated user profile with error::', error);
			responseData.msg = 'Failed to unlike post';
			return responseHelper.error(res, responseData);
		}
	},

	/**
    * Method to add comment
	*/
	addComment: async (req, res) => {
		let postId = req.params.postId;
		let updateObj = req.body;
		let user = req.user;
		// log.info('Recieved request for User profile update:', user, updateObj);
		let userId = user;
		let responseData = {};

		try {
			//check if user ID is present in the database
			let User = await authDbHandler.getUserDetailsById(userId);		
			if (!User) {
				responseData.msg = 'User not found';
				return responseHelper.error(res, responseData);
			} 

			let post = await postDbHandler.getPostDetailsById(postId);
			if(!post){
				responseData.msg = 'Post not found';
				return responseHelper.error(res, responseData);	
			}
			
			const newComment = {
				text: updateObj.text,
				name: User.name,
				avatar: User.avatar,
				user: userId
			}

			post.comments.unshift(newComment);
			await post.save()
			responseData.data = post.comments
			responseData.msg = 'Comment added successfully';
			return responseHelper.success(res, responseData);				
		
		} catch (error) {
			console.log(error)
			responseData.msg = 'Failed to add comment';
			return responseHelper.error(res, responseData);
		}
	}, 

	/**
    * Method to remove comment
	*/
	removeComment: async (req, res) => {
		let postId = req.params.postId;
		let commId = req.params.commId;
		let user = req.user
		// log.info('Recieved request for User profile update:', user, updateObj);
		let userId = user;
		let responseData = {};
		
		try {
			//check if user ID is present in the database, then only process the update profile request
			let post = await postDbHandler.getPostDetailsById(postId);
			if(!post){
				responseData.msg = 'Post not found';
				return responseHelper.error(res, responseData);	
			}

			let comment = post.comments.find(comm=>comm._id.toString()===commId);
			if(!comment){
				responseData.msg = 'Comment not found';
				return responseHelper.error(res, responseData);	
			}

			if(comment.user.toString()!==userId){
				responseData.msg = 'Not authorized';
				return responseHelper.error(res, responseData);	
			}

			const removeIndex = post.comments.map(comm=>comm.user.toString()).indexOf(userId);
			post.comments.splice(removeIndex,1);
			await post.save();
			responseData.data = post.comments
			responseData.msg = 'Comment removed successfully';
			return responseHelper.success(res, responseData);
		} catch (error) {
			// log.error('failed to updated user profile with error::', error);
			responseData.msg = 'Failed to remove comment';
			return responseHelper.error(res, responseData);
		}
	},
}