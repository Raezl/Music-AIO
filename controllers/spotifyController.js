
require('dotenv').config();
const { default: axios } = require('axios');
const crypto = require('crypto');
const { nextTick } = require('process');
const client_id = process.env.SCLIENT_ID;
const client_secret = process.env.SCLIENT_SECRET;
const redirect_uri = process.env.S_REDIRECT;


function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex');
};

function hashCode(code) {
    return crypto.createHash('sha256').update(code).digest('base64');
}

exports.spotify_oauth = function (req, res) {
    let state = generateRandomString(16);
    let scope = 'user-read-private playlist-read-private';

    res.redirect('https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state,
        })
    )
}



exports.spotify_authorise = function (req, res, next) {
    let code = req.query.code || null;
    let state = req.query.state || null;
    let error = req.query.error || null;

    if (error) {
        res.json({ error: error });
    } else {

        //Spotify api only accepts application/x-www-form-urlencoded 
        const data = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.S_REDIRECT
        })

        const headers = {
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'

        }

        //Post to '/api/token' with the code to get access token 
        axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: headers,
            data: data
        }).then(response => {
            req.data = {
                token: response.data.access_token,
                refresh_token: response.data.refresh_token
            }
            //Update user with new access and refresh tokens 
            return next();
        }).then(
            res.status(200).json({ message: 'Spotify authorised' })
        ).catch(err => {
            res.json({ error: err });
        });
    }
}