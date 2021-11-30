const express = require('express');
const auth = require('../auth');
const router = express.Router();
const music = require('../controllers/musicController')


router.get('/', music.search);


module.exports = router;