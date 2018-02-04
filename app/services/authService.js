'use strict';
const passport    = require('passport'),
      path        = require('path'),
      jwt         = require('jsonwebtoken'),
      bcrypt      = require('bcrypt'),
      db          = require(path.join(__dirname, '../../config/database.js')),
      userModel   = require(path.join(__dirname, '../models/userModel.js')),
      mailer      = require('nodemailer')

module.exports.login = async (req, res) => {
    const identifier = req.body.identifier,
          pw    = req.body.password;

    // Valiate identifier
    let query = await userModel.getByUserNameOrEmail(identifier);
    if (query.length <= 0 ) {
        return res.status(404).json({msg: 'User not found.'});
    }

    let user = query[0];

    //validate password
    bcrypt.compare(pw, user.password, function(err, result) {
        if(result !== true) return res.json({success: false, msg: 'Incorrect password.'});

        let token = jwt.sign({data: user, timestamp : new Date()}, process.env.TOKEN_SECRET, {
          expiresIn: 3600 // 1 hour
        });
        res.json({
          success: true,
          token: 'JWT '+ token,
          user: {
              id : user.id,
              username: user.username
          }
        });
    });
}

module.exports.isLoggedIn = async(req,res,next) =>{
    passport.authenticate('jwt', {session:false}, (err, user, info) => {
        user ? refreshToken(res, user) : res.status(401).send(false);
    })(req,res,next)

    let refreshToken = (res, user) =>{
        user.token = jwt.sign({data: user, timestamp : new Date()}, process.env.TOKEN_SECRET, {
          expiresIn: 3600 // 1 hour
        });
        res.json({
          success: true,
          token: 'JWT '+ user.token,
          user: {
              id : user.id,
              username: user.username
          }
        });
    }
};

module.exports.sendPwRecoverMail = async(req, res, next) =>{
    var transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'imdariagotohell@gmail.com',
            pass: 'shoe0nhead'
        }
    });

    let mailOptions = {
        from: '<imdariagotohell@gmail.com>', // sender address
        to: 'lo.pennequin@gmail.com', // list of receivers
        subject: 'test nodemailer', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err);
        else
            console.log(info);
    });
};
