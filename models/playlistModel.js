const mongoose = require('mongoose');

//connect to db
mongoose.connect(process.env.DB_CONNECTION, () => 
    console.log('DB connected')
);


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