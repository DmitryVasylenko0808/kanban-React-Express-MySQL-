const { body } = require("express-validator");

const boardsValidation = [
    body('title', 'Title is required').trim().notEmpty(),
    body('columns').custom(value => {
        const columns = value[0].title ? value.map(v => v.title) : value;
        console.log(columns); 
        if (columns.some(col => col === "")) {
            throw new Error("Empty title of category/categories is denied");
        }

        return true;
    })
];

module.exports = {
    boardsValidation
};