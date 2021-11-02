const express = require('express');
const app = express();
require('dotenv/config');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION)
    .then(
        () => console.log('DB connected'),
        err => console.log(err)
    ).catch(err => {
        console.log(err)
    }
    );

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