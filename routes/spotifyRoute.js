const express = require('express');
const spotifyController = require('../controllers/spotifyController');
const userController = require('../controllers/userController');
const router = express.Router();
const auth = require('../auth');

//GET routes 

//authentication for spotify 
router.get('/oauth', spotifyController.spotify_authorise);



module.exports = router;