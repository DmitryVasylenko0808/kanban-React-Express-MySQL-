const InternalError = require('../InternalError');
const config = require('../config');
const DataBase = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class TasksController {
    static async get(req, res) {
        try {
            let sql = "SELECT `tasks`.`id` AS taskId, `tasks`.title AS taskTitle, `tasks`.description, `tasks`.column_id AS columnId, `subtasks`.`id` AS subtaskId, `subtasks`.`title` AS subtaskTitle, `subtasks`.`status` FROM `tasks` INNER JOIN `subtasks` ON (`tasks`.`id` = `subtasks`.`task_id`) WHERE `tasks`.`id` = ?";
            const results = await DataBase.query(sql, [req.params.id]);
            if (results.length === 0) {
                return res.json({ success: false, message: 'Task is not found' });
            }

            const data = { 
                id: results[0].taskId,
                title: results[0].taskTitle,
                description: results[0].description,
                columnId: results[0].columnId,
                subtasks: results.map(item => { 
                    return { 
                        id: item.subtaskId,
                        title: item.subtaskTitle,
                        status: item.status 
                    } 
                })
            };

            sql = "SELECT `id`, `title` FROM `columns` WHERE `board_id` = ?"
            let columns = await DataBase.query(sql, [req.params.boardId]);

            res.json({ success: true, data, columns });
        } catch (e) {
            InternalError.error(res, e);
        }
    }

    static async create(req, res) {
        try {
            let { title, desc, columnId, subtasks } = req.body;

            let sql, results;
            if (desc) {
                sql = "INSERT INTO `tasks` (`title`, `description`, `column_id`) VALUES (?, ?, ?)";
                results = await DataBase.query(sql, [title, desc, columnId]);
            } else {
                sql = "INSERT INTO `tasks` (`title`, `column_id`) VALUES (?, ?)";
                results = await DataBase.query(sql, [title, columnId]);
            }

            const taskId = results.insertId;
            subtasks = subtasks.map(s => [s.title, s.status, taskId]);
            sql = "INSERT INTO `subtasks` (`title`, `status`, `task_id`) VALUES ?"
            await DataBase.query(sql, [subtasks]);

            res.status(200).json({ success: true, taskId });
        } catch (e) {
            InternalError.error(res, e);
        }
    }

    static async delete(req, res) {
        try {
            let sql = "DELETE FROM `subtasks` WHERE `task_id` = ?";
            await DataBase.query(sql, [req.params.taskId]);

            sql = "DELETE FROM `tasks` WHERE `id` = ?";
            const results = await DataBase.query(sql, [req.params.taskId]);
            if (results.affectedRows === 0) {
                return res.status(400).json({ success: false, message: 'Cannot delete the task' });
            }

            res.json({ success: true });
        } catch (e) {
            InternalError.error(res, e);
        }
    }

    static async toggleSubtask(req, res) {
        try {
            let sql = "UPDATE `subtasks` SET `status` = ? WHERE `id` = ?";
            const results = await DataBase.query(sql, [req.body.status, req.params.subtaskId]);

            sql = "SELECT * FROM `subtasks` WHERE `id` = ?";
            const subtask = await DataBase.query(sql, [req.params.subtaskId]);


            res.json({ success: true, subtask: subtask[0] });
        } catch (e) {
            InternalError.error(res, e);
        }
    }

    static async changeColumn(req, res) {
        try {
            let sql = "UPDATE `tasks` SET `column_id` = ? WHERE `id` = ?";
            await DataBase.query(sql, [req.body.columnId, req.params.id]);

            sql = "SELECT * FROM `tasks` WHERE `id` = ?";
            const results = await DataBase.query(sql, [req.params.id]);

            res.json({ success: true, task: results[0] });
        } catch (e) {
            InternalError.error(res, e);
        }
    }

    static async edit(req, res) {
        try {
            const { id } = req.params;
            let { title, description, columnId, subtasks } = req.body;

            let sql = "UPDATE `tasks` SET `title` = ?, `description` = ?, `column_id` = ? WHERE `id` = ?";
            await DataBase.query(sql, [title, description, columnId, id]);

            sql = "DELETE FROM `subtasks` WHERE `task_id` = ?";
            await DataBase.query(sql , [id]);

            subtasks = subtasks.map(s => [s.title, s.status, id]);
            sql = "INSERT INTO `subtasks` (`title`, `status`, `task_id`) VALUES ?";
            await DataBase.query(sql, [subtasks]);

            res.json({ success: true });
        } catch (e) {
            InternalError.error(res, e);
        }
    }
}

module.exports = TasksController;