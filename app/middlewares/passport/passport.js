'use strict';

const passport      = require('passport'),
      path          = require('path'),
      bcrypt        = require('bcrypt'),
      JwtStrategy   = require('passport-jwt').Strategy,
      ExtractJwt    = require('passport-jwt').ExtractJwt,
      db            = require(path.join(__dirname, "../../../config/database.js")),
      userModel     = require(path.join(__dirname, "../../models/userModel.js"));

let opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey : process.env.TOKEN_SECRET
}

module.exports = ()=>{
    passport.use(new JwtStrategy(opts, authenticate));
}

let authenticate = async (jwt_payload, done) => {
    let result = await userModel.getById(jwt_payload.data.id);
    return result.length > 0 ? done(null, result[0]) : done(new Error('not authenticated'), false);
};
