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
      authService         = require(path.join(__dirname, '../services/authService.js'));

module.exports = function(app){

    //public routes
    router.post('/users', userCtrl.validate, ctrl(userCtrl.createUser, (req, res, next) => [req]));
    router.post('/login', authService.login);
    router.get('/loggedin', passport.authenticate('jwt', {session:false}, (error, user, info, status) => {
        console.log(info);
    }));

    // private routes
    privateRouter.get('/users/:id', ctrl(userCtrl.getUserById, (req, res, next) => [req.params.id]));
    privateRouter.get('/users', ctrl(userCtrl.getUsers));

    app.use('/api', router);
    app.use('/api', passport.authenticate('jwt', {session:false}), privateRouter);
};