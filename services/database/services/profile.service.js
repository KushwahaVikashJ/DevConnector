'use strict';
const profileModel = require('../models/Profile');
let instance;
/*********************************************
 * METHODS FOR HANDLING USER MODEL QUERIES
 *********************************************/
class Profile {
    constructor() {
        if (instance) {
            return instance;
        }
        this.instance = this;
        this._profileController = profileModel;
    }
    createProfile(userObj) {
        let model = new this._profileController(userObj);
        return model.save(userObj);
    }
    getProfileDetailsById(userId, projection) {
        if (projection) {
            return this._profileController.findOne({ user: userId }, projection).populate('user',{password:0});
        }
        return this._profileController.findOne({ user: userId }).populate('user',{password:0});
    }
    getProfileDetailsByQuery(query, projection = {}) {
        return this._profileController.find(query, projection).populate('user',{password:0}).sort({_id:-1});
    }
    getProfileCount(query, projection = {}) {
        return this._profileController.find(query, projection).countDocuments();
    }
    // getProfileDetailsByQuery(query, skip, limit, projection = {}) {
    //     return this._profileController.find(query, projection).sort({_id:-1}).skip(skip).limit(limit);
    // }
    updateProfileDetailsById(userId, updatedObj) {
        return this._profileController.findOneAndUpdate({user:userId},{ $set: updatedObj },{new:true});
    }
    updateProfileByQuery(query, updatedObj, option) {
        return this._profileController.updateMany(query, { $set: updatedObj }, option);
    }
    deleteProfileById(userId) {
        return this._profileController.findOneAndRemove({user:userId});
    }
}

module.exports = new Profile();