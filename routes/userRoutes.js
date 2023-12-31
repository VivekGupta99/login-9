const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Middleware
const userAuthenticate = require('../middleware/auth');

// Routes
router.post('/signup', userController.createUser)

router.post('/login', userController.loginUser);

module.exports = router;

