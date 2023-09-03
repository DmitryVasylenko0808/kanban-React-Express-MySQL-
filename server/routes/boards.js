const express = require('express');
const BoardsController = require('../controllers/BoardsController');
const checkAuth = require('../middlewares/checkauth');

const router = express.Router();

router.get('/', checkAuth, BoardsController.getAll);
router.get('/:boardId', checkAuth, BoardsController.getOne);
router.get(`/for_editing/:id`, checkAuth, BoardsController.getOneToEdit)
router.post('/create', checkAuth, BoardsController.create);
router.post('/create_column', checkAuth, BoardsController.createColumn);
router.delete('/:boardId', checkAuth, BoardsController.delete);
router.put('/edit/:id', checkAuth, BoardsController.edit);

module.exports = router;