const express = require('express');
const TasksController = require("../controllers/TasksController");
const checkAuth = require("../middlewares/checkauth");

const router = express.Router();

router.get('/:boardId/:id', checkAuth, TasksController.get);
router.post('/create', checkAuth, TasksController.create);
router.delete('/:taskId', checkAuth, TasksController.delete);
router.patch('/toggle_subtask/:subtaskId', checkAuth, TasksController.toggleSubtask);
router.patch('/change_column/:id', checkAuth, TasksController.changeColumn);
router.put('/edit/:id', checkAuth, TasksController.edit);

module.exports = router;