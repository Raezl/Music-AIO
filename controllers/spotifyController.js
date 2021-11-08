
require('dotenv').config();
const { default: axios } = require('axios');
const crypto = require('crypto');
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



exports.spotify_authorise = function (req, res) {
    let code = req.query.code || null;
    let state = req.query.state || null;

    if (state === null) {
        res.staus('401');
    } else {
        const body = {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.S_REDIRECT
        }
        const headers = {
            headers: {
                'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        axios.post('https://accounts.spotify.com/api/token', body, headers)
            .then((_res) => res.data.access_token)
            .then((token) => {
                console.log(token);
            })
    }
}