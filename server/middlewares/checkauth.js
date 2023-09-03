const jwt = require("jsonwebtoken");
const config = require("../config");


const checkAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, config.secret_key);
            req.userId = decoded.userId;

            next();
        } catch(e) {
            console.log(e);
            return res.status(403).json({ success: false, message: 'Access denied' });
        }
    } else {
        return res.status(403).json({ success: false, message: 'Access denied' });
    }
}

module.exports = checkAuth;