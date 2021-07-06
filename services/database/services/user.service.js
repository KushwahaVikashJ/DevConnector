'use strict';
const userModel = require('../models/User');
let instance;
/*********************************************
 * METHODS FOR HANDLING USER MODEL QUERIES
 *********************************************/
class User {
    constructor() {
        if (instance) {
            return instance;
        }
        this.instance = this;
        this._userController = userModel;
    }
    createUser(userObj) {
        let model = new this._userController(userObj);
        return model.save(userObj);
    }
    getUserDetailsById(userId, projection) {
        if (projection) {
            return this._userController.findOne({ _id: userId }, projection);
        }
        return this._userController.findOne({ _id: userId });
    }
    getUserDetailsByQuery(query, projection = {}) {
        return this._userController.find(query, projection).sort({_id:-1});
    }
    getUsersCount(query, projection = {}) {
        return this._userController.find(query, projection).countDocuments();
    }
    getUsersDetailsByQuery(query, skip, limit, projection = {}) {
        return this._userController.find(query, projection).sort({_id:-1}).skip(skip).limit(limit);
    }
    updateUserDetailsById(userId, updatedObj) {
        return this._userController.findByIdAndUpdate(userId, { $set: updatedObj });
    }
    updateUserByQuery(query, updatedObj, option) {
        return this._userController.updateMany(query, { $set: updatedObj }, option);
    }
    deleteUserById(userId) {
        return this._userController.findByIdAndRemove(userId);
    }
}
module.exports = new User();