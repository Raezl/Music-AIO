const express = require('express');
const spotifyController = require('../controllers/spotifyController');
const router = express.Router();

//GET routes 
router.get('/oauth', spotifyController.spotify_oauth);
router.get('/oauth/authorise', spotifyController.spotify_authorise);



module.exports = router;