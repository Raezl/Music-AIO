const express = require('express');
const spotify_controller = require('../controllers/spotifyController');
const router = express.Router();

//GET routes 
router.get('/oauth', spotify_controller.spotify_oauth);
router.get('/oauth/authorise', spotify_controller.authorise);
router.get('/oauth/status', spotify_controller.authorise);

module.exports = router;