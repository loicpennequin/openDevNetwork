'use strict';

const path                              = require('path'),
      sql                                = require(path.join(__dirname, "../../config/database.js")),
      logger                            = require('winston'),
      passport                          = require('passport'),
      bcrypt                            = require('bcrypt'),
      { body, check, validationResult } = require('express-validator/check'),
      { matchedData }                   = require('express-validator/filter');


const getByEmail = async (email) => {
    let db = new sql();
    let user = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
    await db.close();
    return user;
};

const getByUserName = async (username) => {
    let db = new sql();
    let user = await db.query(`SELECT * FROM users WHERE username = '${username}'`);
    await db.close();
    return user;
};

const getByUserNameOrEmail = async (identifier) => {
    let db = new sql();
    let user = await db.query(`SELECT * FROM users WHERE username = '${identifier}' OR email = '${identifier}'`);
    await db.close();
    return user;
};

module.exports.getAll = async () => {
    let db = new sql();
    let users = await db.query(`SELECT * FROM users`);
    await db.close();
    return users;
};

module.exports.getById = async (id) => {
    let db = new sql();
    let user = await db.query(`SELECT * FROM users WHERE id = ${id}`);
    await db.close();
    return user;
};

module.exports.getByUserName = getByUserName;

module.exports.getByEmail = getByEmail;

module.exports.getByUserNameOrEmail = getByUserNameOrEmail;

module.exports.create = async (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        throw { status: 422, message : errors.array() };
    }
    let hash = await bcrypt.hash(req.body.password, 10),
        post = {
            username : req.body.username,
            email : req.body.email,
            password : hash,
        },
        db = new sql(),
        query = await db.query(`INSERT INTO users SET ?`, post);

    return;
};

module.exports.validate = [
    check('email')
        .isEmail().withMessage('the email field must be a valid email address')
        .trim()
        .custom( async value => {
            let exists = await getByEmail(value)

            if (exists.length > 0) throw new Error('This email is already in use.');
            return value
        }),
    check('username')
        .isLength({min: 4, max: 20}).withMessage('you username must be between 4 and 20 characters')
        .custom( async value => {
            let exists = await getByUserName(value)

            if (exists.length > 0) throw new Error('This username is already in use.');
            return value
        }),
    check('password')
        .isLength({min: 6, max: 20}).withMessage("Your password must be between 6 and 20 characters long.")
        .custom((value, {req}) => {
            if (value !== req.body.passwordMatch) throw new Error("Your passwords don't match.");
            return value
        })
];
