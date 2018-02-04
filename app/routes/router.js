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
      mailer              = require('nodemailer');

function logRequest(req, res, next) {
  logger.info('REST API call : ' + req.url);
  next();
}

module.exports = function(app){
    //public routes
    router.post('/users', userCtrl.validate, ctrl(userCtrl.createUser, (req, res, next) => [req]));
    router.post('/login', authService.login);
    router.get('/loggedin', authService.isLoggedIn);
    router.post('/useravailable', ctrl(userCtrl.existByUsername, (req,res,next) => [req.body.value]));
    router.post('/emailavailable', ctrl(userCtrl.existByEmail, (req,res,next) => [req.body.value]));
    router.get('/pwrecover', authService.sendPwRecoverMail);

    // private routes
    privateRouter.get('/users/:id', ctrl(userCtrl.getUserById, (req, res, next) => [req.params.id]));
    privateRouter.get('/users', ctrl(userCtrl.getUsers));

    app.use('/api', logRequest, router);
    app.use('/api', logRequest, passport.authenticate('jwt', {session:false}), privateRouter);
};
