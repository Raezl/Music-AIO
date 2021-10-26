const mongoose = require('mongoose');

//connect to db
mongoose.connect(process.env.DB_CONNECTION, () => 
    console.log('DB connected')
);

const IdSchema =  mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    playlistId:{
        type: String,
        required: true
    }
});

const Song = mongoose.Schema({
    source: String,
    url: String
});



const PlaylistSchema =  mongoose.Schema({
    id:{
        type: IdSchema
    },
    name: String,
    desc: String,
    songs: {
        type: [Song]
    }
});

module.exports = mongoose.model('Playlist', PlaylistSchema);