const express = require('express');
const spotify_controller = require('../controllers/spotifyController');
const router = express.Router();

//GET routes 
router.get('/', spotify_controller.getAuthorization);
router.get('/callback', spotify_controller.callBack);

module.exports = router;