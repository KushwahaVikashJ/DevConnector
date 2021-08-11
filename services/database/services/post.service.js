'use strict';
const postModel = require('../models/Post');
let instance;
/*********************************************
 * METHODS FOR HANDLING USER MODEL QUERIES
 *********************************************/
class Post {
    constructor() {
        if (instance) {
            return instance;
        }
        this.instance = this;
        this._postController = postModel;
    }
    createPost(postObj) {
        let model = new this._postController(postObj);
        return model.save(postObj);
    }
    getPostDetailsById(userId, projection) {
        if (projection) {
            return this._postController.findOne({ _id: userId }, projection);
        }
        return this._postController.findOne({ _id: userId });
    }
    getPostDetailsByQuery(query, projection = {}) {
        return this._postController.find(query, projection).sort({date:-1});
    }
    getPostCount(query, projection = {}) {
        return this._postController.find(query, projection).countDocuments();
    }
    // getPostDetailsByQuery(query, skip, limit, projection = {}) {
    //     return this._postController.find(query, projection).sort({_id:-1}).skip(skip).limit(limit);
    // }
    updatePostDetailsById(userId, updatedObj) {
        return this._postController.findByIdAndUpdate(userId, { $set: updatedObj });
    }
    updatePostByQuery(query, updatedObj, option) {
        return this._postController.updateMany(query, { $set: updatedObj }, option);
    }
    deletePostById(userId) {
        return this._postController.findByIdAndRemove({_id:userId});
    }
}
module.exports = new Post();