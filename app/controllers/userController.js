'use strict';

const path      = require('path'),
      userModel = require(path.join(__dirname, '../models/userModel.js'));

module.exports.getUsers = async () => {
    return userModel.getAll();
}

module.exports.getUserById = async (id) => {
    return userModel.getById(id);
}

module.exports.createUser = async(req) => {
    return userModel.create(req);
}

module.exports.validate = userModel.validate;
