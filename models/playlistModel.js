const mongoose = require('mongoose');

const song = mongoose.Schema({
    source: String,
    url: String
});



const playlist_schema =  mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    name: String,
    desc: String,
    songs:[song]   
});

module.exports = mongoose.model('Playlist', playlist_schema);