const express = require('express');
const playlist_controller = require('../controllers/playlistController');
const auth = require('../auth');
const router = express.Router();

//GET routes 
router.get('/', auth, playlist_controller.view_playlist);

//POST routes 
router.post('/', auth, playlist_controller.add_playlist);

module.exports = router;