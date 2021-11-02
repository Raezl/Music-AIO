const mongoose = require('mongoose');

//connect to db
mongoose.connect(process.env.DB_CONNECTION, () => 
    console.log('DB connected')
);

const SONG = mongoose.Schema({
    source: String,
    url: String
});



const PLAYLIST_SCHEMA =  mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    name: String,
    desc: String,
    songs:[SONG]   
});

module.exports = mongoose.model('Playlist', PLAYLIST_SCHEMA);