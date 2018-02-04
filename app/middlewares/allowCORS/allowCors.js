'use strict';
/**
 * Define an allow Cross Origin Request middleware.
 * Mainly used in dev environment.
 *
 * @author Jun Thong
 */

/**
 * Define the middleware.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 */
module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    next();
};
