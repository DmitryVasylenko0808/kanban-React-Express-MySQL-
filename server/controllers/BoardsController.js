const InternalError = require('../InternalError');
const DataBase = require('../db');

class BoardsController {
    static async getAll(req, res) {
        try {
            let sql = "SELECT `id`, `title` FROM `boards` WHERE `user_id` = ?";
            const results = await DataBase.query(sql, [req.userId]);
            if (results.length === 0) {
                return res.status(404).json({ success: false, message: 'Boards are not found' });
            }

            const boards = results;
            res.json({ success: true, boards });
        } catch (e) {
            InternalError.error(res, e);
        }
    }

    static async getOne(req, res) {
        try {
            let sql = "SELECT `tasks`.`id`, `columns`.id AS column_id, `columns`.title AS column_title, `tasks`.`title` AS task_title, COUNT(`subtasks`.`id`) AS subtasks, SUM(CASE WHEN `subtasks`.`status` = 1 THEN 1 ELSE 0 END) AS subtasks_completed FROM `tasks` INNER JOIN `subtasks` ON (`tasks`.`id` = `subtasks`.`task_id`) INNER JOIN `columns` ON (`tasks`.`column_id` = `columns`.`id`) WHERE `columns`.`board_id` = ? GROUP BY `tasks`.`id`, `columns`.`title`, `tasks`.`title`";
            let results = await DataBase.query(sql, [req.params.boardId]);
            const data = [];
            if (results.length !== 0) {
                let columns = [...new Set(results.map(task => task.column_id))];
                columns = columns.map(col => {
                    const { column_title } = results.find(task => task.column_id === col);
                    return { id: col, title: column_title };
                });

                for (let col of columns) {
                    let item = {
                        column_id: col.id,
                        column_title: col.title,
                        tasks: results.filter(task => task.column_id === col.id)
                    };
                    data.push(item);
                }
            }

            sql = "SELECT `columns`.`id`, `columns`.`title`, COUNT(`tasks`.`id`) AS tasks_count FROM `columns` LEFT JOIN `tasks` ON (`tasks`.`column_id` = `columns`.id) WHERE `columns`.`board_id` = ? GROUP BY `columns`.`id` HAVING tasks_count = 0";
            let columnsNoTask = await DataBase.query(sql, [req.params.boardId]);
            if (columnsNoTask.length !== 0) {
                for (let col of columnsNoTask) {
                    let item = {
                        column_id: col.id,
                        column_title: col.title,
                        tasks: []
                    };
                    data.push(item);
                }
            }

            if (results.length === 0 && columnsNoTask === 0) {
                return res.status(404).json({ success: false, message: "Tasks are not found" });
            }

            res.status(200).json({ success: true, data });
        } catch (e) {
            InternalError.error(res, e);
        }
    }

    static async getOneToEdit(req, res) {
        try {
            let sql = "SELECT `id`, `title` FROM `boards` WHERE `id` = ?";
            const board = await DataBase.query(sql, [req.params.id]);
            console.log(board[0]);
            const { id, title } = board[0];

            sql = "SELECT * FROM `columns` WHERE `board_id` = ?";
            const columns = await DataBase.query(sql, [req.params.id]);

            sql = "SELECT `tasks`.`id`, `tasks`.`title`, `tasks`.`description`, `tasks`.`column_id` FROM `columns` INNER JOIN `tasks` ON (`columns`.`id` = `tasks`.`column_id`) WHERE `columns`.`board_id` = ?";
            const tasks = await DataBase.query(sql, [req.params.id]);

            sql = "SELECT `subtasks`.`id`, `subtasks`.`title`, `subtasks`.`status`, `subtasks`.`task_id`  FROM `columns` INNER JOIN `tasks` ON (`columns`.`id` = `tasks`.`column_id`) INNER JOIN `subtasks` ON (`tasks`.`id` = `subtasks`.`task_id`) WHERE `columns`.`board_id` = ?";
            const subtasks = await DataBase.query(sql, [req.params.id]);

            res.status(200).json({ success: true, id, title, columns, subtasks, tasks });
        } catch (e) {
            InternalError.error(res, e);
        }
    }

    static async create(req, res) {
        try {
            let { title, columns } = req.body;

            let sql = "INSERT INTO `boards` (`title`, `user_id`) VALUES (?, ?)";
            const results = await DataBase.query(sql, [title, req.userId]);

            const boardId = results.insertId;
            columns = columns.map(col => {
                return [col, boardId];
            });
            sql = 'INSERT INTO `columns` (`title`, `board_id`) VALUES ?';
            const test = await DataBase.query(sql, [columns]);

            sql = "SELECT `id`, `title` FROM `boards` WHERE `id` = ?";
            const data = await DataBase.query(sql, [boardId]);

            res.json({ success: true, data: data[0] });
        } catch (e) {
            InternalError.error(res, e);
        }
    }

    static async createColumn(req, res) {
        try {
            let { title, boardId } = req.body;

            let sql = 'INSERT INTO `columns` (`title`, `board_id`) VALUES (?, ?)';
            await DataBase.query(sql, [title, boardId]);

            res.json({ success: true });
        } catch (e) {
            InternalError.error(res, e);
        }
    }

    static async delete(req, res) {
        try {
            let sql = "DELETE FROM `subtasks` WHERE `subtasks`.`task_id` IN (SELECT `tasks`.`id` FROM `tasks` INNER JOIN `columns` ON (`tasks`.`column_id` = `columns`.`id`) WHERE `columns`.`board_id` = ?)";
            await DataBase.query(sql, [req.params.id]);
            sql = "DELETE FROM `tasks` WHERE `column_id` IN (SELECT `id` FROM `columns` WHERE `board_id` = ?)";
            await DataBase.query(sql, [req.params.id]);
            sql = "DELETE FROM `columns` WHERE `board_id` = ?";
            await DataBase.query(sql, [req.params.boardId]);

            sql = "DELETE FROM `boards` WHERE `id` = ?";
            const results = await DataBase.query(sql, [req.params.boardId]);

            if (results.affectedRows === 0) {
                return res.status(400).json({ success: false, message: 'Cannot delete the board' });
            }

            res.json({ success: true });
        } catch (e) {
            InternalError.error(res, e);
        }
    }

    static async edit(req, res) {
        try {
            const { id } = req.params;
            let { title, columns, tasks, subtasks } = req.body;

            let sql = "DELETE FROM `subtasks` WHERE `subtasks`.`task_id` IN (SELECT `tasks`.`id` FROM `tasks` INNER JOIN `columns` ON (`tasks`.`column_id` = `columns`.`id`) WHERE `columns`.`board_id` = ?)";
            await DataBase.query(sql, [id]);
            sql = "DELETE FROM `tasks` WHERE `column_id` IN (SELECT `id` FROM `columns` WHERE `board_id` = ?)";
            await DataBase.query(sql, [id]);
            sql = "DELETE FROM `columns` WHERE `board_id` = ?";
            await DataBase.query(sql, [id]);

            sql = "UPDATE `boards` SET `title` = ? WHERE `id` = ?";
            await DataBase.query(sql, [title, id]);

            let columnsOld = columns.filter(col => (col.id !== undefined && col.id !== null));
            if (columnsOld.length !== 0) {
                columnsOld = columnsOld.map(col => [col.id, col.title, id]);
                if (columnsOld.length !== 0) {
                    sql = "INSERT INTO `columns` (`id`, `title`, `board_id`) VALUES ?";
                    await DataBase.query(sql, [columnsOld]);
                }
            }

            let columnsNew = columns.filter(col => (col.id === undefined || col.id === null));
            if (columnsNew.length !== 0) {
                columnsNew = columnsNew.map(col => [col.title, id]);
                if (columnsNew.length !== 0) {
                    sql = "INSERT INTO `columns` (`title`, `board_id`) VALUES ?";
                    await DataBase.query(sql, [columnsNew]);
                }
            }

            sql = "SELECT `id` FROM `columns` WHERE `board_id` = ?";
            let columnsIds = await DataBase.query(sql, [id]);
            columnsIds = columnsIds.map(col => col.id);

            sql = "INSERT INTO `tasks` (`id`, `title`, `description`, `column_id`) VALUES ?";
            tasks = tasks
                .filter(task => columnsIds.includes(task.column_id))
                .map(task => [task.id, task.title, task.description, task.column_id]);
            if (tasks.length !== 0) await DataBase.query(sql, [tasks]);

            sql = "SELECT `tasks`.`id` FROM `columns` INNER JOIN `tasks` ON (`tasks`.`column_id` = `columns`.`id`) WHERE `columns`.`board_id` = ?";
            let tasksIds = await DataBase.query(sql, [id]);
            tasksIds = tasksIds.map(col => col.id);

            sql = "INSERT INTO `subtasks` (`id`, `title`, `status`, `task_id`) VALUES ?";
            subtasks = subtasks
                .filter(subtask => tasksIds.includes(subtask.task_id))
                .map(subtask => [subtask.id, subtask.title, subtask.status, subtask.task_id]);
            if (subtasks.length !== 0) await DataBase.query(sql, [subtasks]);

            res.json({ success: true });
        } catch (e) {
            InternalError.error(res, e);
        }
    }
}

module.exports = BoardsController;