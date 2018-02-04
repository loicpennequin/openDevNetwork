'use strict';
/**
* Define all REST api routes.
*
* @author Daria
*/

const router              = require('express').Router(),
      privateRouter       = require('express').Router(),
      logger              = require('winston'),
      path                = require('path'),
      passport            = require('passport'),
      userCtrl            = require(path.join(__dirname, '../controllers/userController.js')),
      ctrl                = require(path.join(__dirname, '../middlewares/controllerHandler/controllerHandler.js')),
      authService         = require(path.join(__dirname, '../services/authService.js')),
      mailer          = require('nodemailer');

function logRequest(req, res, next) {
  logger.info('REST API call : ' + req.url);
  next();
}

module.exports = function(app){

    //public routes
    router.post('/users', userCtrl.validate, ctrl(userCtrl.createUser, (req, res, next) => [req]));
    router.post('/login', authService.login);
    router.get('/loggedin', (req,res,next) => {
        passport.authenticate('jwt', {session:false}, (err, user, info) => {
            user ? res.send(true) : res.send(false);
        })(req,res,next)
    });
    router.post('/useravailable', ctrl(userCtrl.existByUsername, (req,res,next) => [req.body.value]));
    router.post('/emailavailable', ctrl(userCtrl.existByEmail, (req,res,next) => [req.body.value]));
    router.get('/test'), async (req,res,next)=>{
        let testAccount = await mailer.createTestAccount();

        _transporter = mailer.createTransport({
            host: smtp.ethereal.email,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });

        let mailOptions = {
            from: '<foo@example.com>', // sender address
            to: 'bar@example.com', // list of receivers
            subject: 'recover password', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        });
    }

    // private routes
    privateRouter.get('/users/:id', ctrl(userCtrl.getUserById, (req, res, next) => [req.params.id]));
    privateRouter.get('/users', ctrl(userCtrl.getUsers));

    app.use('/api', logRequest, router);
    // app.use('/api', logRequest, passport.authenticate('jwt', {session:false}), privateRouter);
};
