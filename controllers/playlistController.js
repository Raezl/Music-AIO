const PLAYLIST =require('../models/Playlist');



exports.view_playlist = function(req, res){
    res.send('working');
};

exports.add_playlist = function(req, res){
    const playlist = new PLAYLIST({
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
    });
};