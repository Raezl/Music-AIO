const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');




//Routes
const PlaylistRoute = require('./routes/Playlist');

//Middleware
app.use(express.json());
app.use('/Playlist', PlaylistRoute);


app.listen(3000);