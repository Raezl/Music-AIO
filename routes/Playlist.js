const express = require('express');
const Playlist =require('../models/Playlist');
const router = express.Router();

//GET routes 
router.get('/', (req,res) => {
    res.send('Show Playlist');
});

//POST routes
router.post('/', (req, res) =>{
    const playlist = new Playlist({
        userId: req.body.userId,
        name: req.body.name,
        desc: req.body.desc,
        songs: [
            {source : req.body.source , url : req.body.url}
        ]
    });
    playlist.save()
    .then(data => {
        res.json(data);
    })
    .catch( err => {
        res.json({message: err});
    });
});

module.exports = router;