'use strict';
/**
 * Open Dev Network App.
 *
 * @author Daria (https://github.com/loicpennequin)
 */

/*  =============================================================================
    Dependencies
    ============================================================================= */
 require('dotenv').config({
     path : 'config/.env'
 });

 const fs                  = require('fs'),
       path                = require('path'),
       logger              = require('winston'),
       express             = require('express'),
       bodyParser          = require('body-parser'),
       cookieParser        = require('cookie-parser'),
       session             = require('express-session'),
       passport            = require('passport');

/*  =============================================================================
    Configure logs
    ============================================================================= */
require(path.join(__dirname, '/app/middlewares/winston/winston.js'))();

/*  =============================================================================
    Express
    ============================================================================= */
const app                   = express(),
      http                  = require('http').Server(app);

/*  =============================================================================
    Configure session
    ============================================================================= */
const MySQLStore            = require('express-mysql-session')(session),
      sessionStore          = new MySQLStore({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME
      }),
      sessionParams         = session({
          secret: process.env.SESSION_SECRET,
          name: 'tactics.obsidev',
          resave : false,
          store: sessionStore,
          saveUninitialized : false,
      });

/*  =============================================================================
  Configure passport
  ============================================================================= */
require(path.join(__dirname, '/app/middlewares/passport/passport.js'))();

/*  =============================================================================
    App Configure
    ============================================================================= */
app.disable('x-powered-by');
app.use(require(path.join(__dirname, '/app/middlewares/allowCors/allowCors.js')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/public')));

/*  =============================================================================
    Configure routes
    ============================================================================= */
require(path.join(__dirname, '/app/routes/router.js'))(app);

app.all('/*', function(req,res,next){
  res.sendFile('app.html', {root: path.join(__dirname, '/public') })
})

/*  =============================================================================
    Configure socket.io
    ============================================================================= */
// let io = require(path.join(__dirname, '/server_app/socketio/io.js')).init(http);

/*  =============================================================================
    Start App
    ============================================================================= */

http.listen(process.env.PORT, ()=>{
  logger.info('===============================')
  logger.info('serveur lancé sur le port ' + process.env.PORT)
  logger.info('===============================')
});
