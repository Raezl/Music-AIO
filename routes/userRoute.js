const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

//GET route
router.get('/login', ).post('/login', userController.login);

//POST Routes
router.post('/register', userController.register);

module.exports = router;