const Playlist = require('../models/playlistModel');



//View user created playlists
exports.view_playlist = function(req, res){
    res.send('working');
};


//Add new user playlist 
exports.add_playlist = function(req, res){
    const playlist = new Playlist({
        userId: req.body.userId,
        name: req.body.name,
        desc: req.body.desc,
        songs: req.body.songs.map(song => {
            return{
                source : song.source,
                url : song.url
            };
        })
    });

    playlist.save()
    .then(data => {
        res.json(data);
    })
    .catch( err => {
        res.json({message: err});
        console.log(err.stack);
    });
    
};