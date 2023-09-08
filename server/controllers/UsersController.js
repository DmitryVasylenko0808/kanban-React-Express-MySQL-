const InternalError = require('../InternalError');
const config = require('../config');
const DataBase = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsersController {
    static async registration(req, res) {
        try {
            let { login, password } = req.body;

            let sql = 'SELECT `login` FROM `user` WHERE `login` = ?';
            let results = await DataBase.query(sql, [login]);
            if (results.length !== 0) {
                return res.status(400).json({ success: false, message: 'This login is already exists' });
            }

            login = login.toLowerCase();
            password = await bcrypt.hash(password, 5);
            sql = 'INSERT INTO `user` (`login`, `password`) VALUES (?, ?)';
            results = await DataBase.query(sql, [login, password]);

            const token = jwt.sign({ userId: results.insertId }, config.secret_key, { expiresIn: '24h' });

            res.status(201).json({ success: true, login, token });
        } catch (e) {
            InternalError.error(res, e);
        }
    }

    static async login(req, res) {
        try {
            const { login, password } = req.body;

            let sql = 'SELECT * FROM `user` WHERE `login` = ?';
            const results = await DataBase.query(sql, [login]);
            if (results.length === 0) {
                return res.status(404).json({ success: false, message: "This login doesn't exists" });
            }

            const isValidPass = await bcrypt.compare(password, results[0].password);
            if (!isValidPass) {
                return res.status(403).json({ success: false, message: "Invalid login or password" });
            }

            const token = jwt.sign({ userId: results[0].id }, config.secret_key, { expiresIn: '24h' });

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