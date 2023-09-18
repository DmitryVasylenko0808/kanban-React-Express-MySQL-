const express = require('express');
const { registerValidation, loginValidation } = require('../middlewares/validations/authValidation');
const handleValidationErrors = require("../middlewares/handleValidationErrors");
const UsersController = require('../controllers/UsersController');
const checkAuth = require('../middlewares/checkauth');

const router = express.Router();

router.get('/me', checkAuth, UsersController.getMe)
router.post('/register', registerValidation, handleValidationErrors, UsersController.registration);
router.post('/login', loginValidation, handleValidationErrors, UsersController.login);

module.exports = router;