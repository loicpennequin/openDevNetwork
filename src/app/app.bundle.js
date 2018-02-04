'use strict';
//polyfills
require('babel-polyfill');
//libs
var jquery = require('jquery');
global.$ = global.jQuery = jquery;
require('underscore');
var _ = require('underscore');
global._ = _;

require('angular');
require('angular-messages');
require('angular-resource');
require('angular-animate');
require('@uirouter/angularjs');
require('angular-async-await');
require('angular-ui-tinymce');

//main module
require('./app.js');
require('./app.routes.js');
require('./app.config.js');

//modules
require('./modules/core/core.js');
require('./modules/core/services/authService.js')
require('./modules/core/core.templates.js');
require('./modules/pages/pages.js');
require('./modules/pages/pages.templates.js');
require('./modules/pages/components/odnLogin/odnLoginForm/odnLoginForm.component.js')
require('./modules/pages/components/odnLogin/odnLogin.component.js')
require('./modules/pages/components/odnDashboard/odnDashboard.component.js')
require('./modules/pages/components/odnHome/odnRegisterForm/odnRegisterForm.component.js')
require('./modules/pages/components/odnHome/odnHome.component.js')
