const express = require('express');
const spotify_controller = require('../controllers/spotifyController');
const router = express.Router();

//GET routes 
router.get('/auth', spotify_controller.getAuthorization);
router.get('/token', spotify_controller.callBack);

module.exports = router;