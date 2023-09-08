const express = require('express');
const UsersController = require('../controllers/UsersController');
const checkAuth = require('../middlewares/checkauth');

const router = express.Router();

router.get('/me', checkAuth, UsersController.getMe)
router.post('/register', UsersController.registration);
router.post('/login', UsersController.login);

module.exports = router;