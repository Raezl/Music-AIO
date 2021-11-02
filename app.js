const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

//Routes
const playlistRoute = require('./routes/Playlist');
const spotifyRoute = require('./routes/spotify');

//Middleware
app.use(express.json());
app.use('/playlist', playlistRoute);
app.use('/spotify', spotifyRoute);


app.listen(3000);