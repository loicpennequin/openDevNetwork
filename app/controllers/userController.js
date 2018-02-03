'use strict';

const path      = require('path'),
      userModel = require(path.join(__dirname, '../models/userModel.js'));

module.exports.getUsers = () => {
    return userModel.getAll();
}

module.exports.getUserById = (id) => {
    return userModel.getById(id);
}

module.exports.createUser = (req) => {
    return userModel.create(req);
}

module.exports.existByUsername = async (username) => {
    let exists = await userModel.getByUserName(username);
    return {available : exists.length <= 0};
}

module.exports.existByEmail = async (email) => {
    let exists = await userModel.getByEmail(email);
    return {available : exists.length <= 0};
}

module.exports.validate = userModel.validate;
