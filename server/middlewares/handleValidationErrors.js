const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        const errorsData = errors.array().map(err => {
            return { path: err.path, message: err.msg };
        });
        const error = errorsData[0];
        return res.status(400).json({ error });
    }

    next();
}

module.exports = handleValidationErrors;