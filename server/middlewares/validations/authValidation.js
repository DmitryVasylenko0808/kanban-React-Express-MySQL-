const { body } = require("express-validator");
const DataBase = require("../../db");
const bcrypt = require("bcrypt");

const registerValidation = [
    body('login', 'Login is required').trim().notEmpty(),
    body('login', 'Login must have more than 2 charcters').trim().isLength({ min: 3 }),
    body('login').custom(async value => {
        let sql = 'SELECT `login` FROM `user` WHERE `login` = ?';
        const results = await DataBase.query(sql, [value]);

        if (results.length !== 0) {
            throw new Error('This login is already exists');
        }

        return true;
    }),
    body('password', 'Password is required').trim().notEmpty(),
    body('password', 'Password must have more than 7 characters').trim().isLength({ min: 8 }),
    body('passwordConfirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords don't match");
        }

        return true;
    })
];

const loginValidation = [
    body('login', 'Login is required').trim().notEmpty(),
    body('login').custom(async (value, { req }) => {
        let sql = 'SELECT * FROM `user` WHERE `login` = ?';
        const results = await DataBase.query(sql, [value]);

        if (results.length === 0) {
            throw new Error("This login doesn't exists");
        }
        req.userPassword = results[0].password;
        req.userId = results[0].id;

        return true;
    }),
    body('password', 'Password is required').trim().notEmpty(),
    body('password').custom(async (value, { req }) => {
        const isValidPass = await bcrypt.compare(value, req.userPassword)
        if (!isValidPass) {
            throw new Error('Invalid login or password');
        }

        return true;
    })
];

module.exports = {
    registerValidation,
    loginValidation
};