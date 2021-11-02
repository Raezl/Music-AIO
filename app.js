const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

//Routes
const playlistRoute = require('./routes/playlistRoute');
const spotifyRoute = require('./routes/spotifyRoute');
const userRoute = require('./routes/userRoute');


//Middleware
app.use(express.json());
app.use('/playlist', playlistRoute);
app.use('/spotify', spotifyRoute);
app.use('/user', userRoute);


app.listen(3000);