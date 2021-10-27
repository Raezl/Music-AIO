const express = require('express');
const playlist_controller = require('../controllers/playlistController');
const router = express.Router();

//GET routes 
router.get('/', playlist_controller.view_playlist);

//POST routes 
router.post('/', playlist_controller.add_playlist);

module.exports = router;