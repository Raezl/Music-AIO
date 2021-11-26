const express = require('express');
const spotifyController = require('../controllers/spotifyController');
const userController = require('../controllers/userController');
const router = express.Router();
const auth = require('../auth');

//GET routes 

//authentication for spotify 
router.get('/oauth', auth, spotifyController.spotify_oauth);
//callback function
router.get('/oauth/authorise', auth, spotifyController.spotify_authorise, userController.updateUser);



module.exports = router;