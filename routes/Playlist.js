const express = require('express');
const Playlist =require('../models/Playlist');
const router = express.Router();

//GET routes 
router.get('/', (req,res) => {
    res.send('Show Playlist');
});

//POST routes
router.post('', (req, res) =>{
    console.log(req.body);
});

module.exports = router;