const InternalError = require('../InternalError');
const config = require('../config');
const DataBase = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsersController {
    static async registration(req, res) {
        try {
            let { login, password } = req.body;

            login = login.toLowerCase();
            password = await bcrypt.hash(password, 5);
            let sql = 'INSERT INTO `user` (`login`, `password`) VALUES (?, ?)';
            const results = await DataBase.query(sql, [login, password]);

            const token = jwt.sign({ userId: results.insertId }, config.secret_key, { expiresIn: '24h' });

            res.status(201).json({ success: true, login, token });
        } catch (e) {
            InternalError.error(res, e);
        }
    }

    static async login(req, res) {
        try {
            const { login } = req.body;

            const token = jwt.sign({ userId: req.userId }, config.secret_key, { expiresIn: '24h' });

            res.json({ success: true, login, token });
        } catch (e) {
            InternalError.error(res, e);
        }
    }

    static async getMe(req, res) {
        try {
            const sql = "SELECT `id`, `login` FROM `user` WHERE `id` = ?";
            const results = await DataBase.query(sql, [req.userId]);
            if (results.length === 0) {
                return res.status(404).json({ success: false, message: "This user doesn't exists" });
            }

            res.json({ ...results[0] });
        } catch (e) {
            InternalError.error(res, e);
        }
    }
}

module.exports = UsersController;