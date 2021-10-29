const express = require('express');
const spotify_controller = require('../controllers/spotifyController');
const router = express.Router();

//GET routes 
router.get('/oauth', spotify_controller.spotify_oauth);
router.get('/oauth/authorise', spotify_controller.spotify_authorise);

//POST
router.post('/token', spotify_controller.spotify_token);


module.exports = router;