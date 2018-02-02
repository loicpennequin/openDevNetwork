'use strict';
const passport    = require('passport'),
      path        = require('path'),
      jwt         = require('jsonwebtoken'),
      bcrypt      = require('bcrypt'),
      db          = require(path.join(__dirname, '../../config/database.js')),
      userModel   = require(path.join(__dirname, '../models/userModel.js'))

module.exports.login = async (req, res) => {
    const username = req.body.username,
          pw    = req.body.password;

    // Valiate username
    let query = await userModel.getByUserName(username);
    if (query.length <= 0 ) {
        return res.json({success: false, msg: 'User not found.'});
    }

    let user = query[0];

    //validate password
    bcrypt.compare(pw, user.password, function(err, result) {
        if(result !== true) return res.json({success: false, msg: 'Incorrect password.'});

        let token = jwt.sign({data: user}, process.env.TOKEN_SECRET, {
          expiresIn: 86400 // 1 day
        });

        delete user.password;
        res.json({
          success: true,
          token: 'JWT '+token,
          user: user
        });
    });
}
