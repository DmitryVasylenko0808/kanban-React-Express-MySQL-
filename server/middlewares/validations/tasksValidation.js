const { body } = require("express-validator");

const tasksValidation = [
    body('title', 'Title is required').trim().notEmpty(),
    body('subtasks').custom(value => {
        if (value.length === 0) {
            throw new Error("Adding/editing the task without subtasks is denied");
        }

        return true;
    }),
    body('subtasks').custom(value => {
        if (value.some(v => v.title === "")) {
            throw new Error("Empty title of subtask/subtasks is denied");
        }

        return true;
    })
];

module.exports = {
    tasksValidation
};