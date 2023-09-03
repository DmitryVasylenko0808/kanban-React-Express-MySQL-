const express = require('express');
const UsersController = require('../controllers/UsersController');

const router = express.Router();

router.post('/register', UsersController.registration);
router.post('/login', UsersController.login);

module.exports = router;