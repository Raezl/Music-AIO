const express = require('express');
const userController = require('../controllers/userController');
const { route } = require('./playlistRoute');
const router = express.Router();

//GET route
router.get('/login', userController.login);

//POST Routes
router.post('/register', userController.register);

module.exports = router;