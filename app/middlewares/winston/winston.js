'use strict';
/**
 * Configure winston logging module.
 *
 * @author Daria
 */

const winston = require('winston');

module.exports = () => {
    // remove the default logger
    winston.remove(winston.transports.Console);

    // Add console logger only for development.
    if(process.env.LOG_CONSOLE === "true"){
        winston.add(winston.transports.Console, {
            level: 'debug',
            colorize: true,
        });
    }
};
