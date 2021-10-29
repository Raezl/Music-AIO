
require('dotenv').config();
const { rejects } = require('assert');
const crypto = require('crypto');
const { resolve } = require('path');
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
    let code_challenge = hashCode(generateRandomString(128));
    let scope = 'user-read-private playlist-read-private';

    res.redirect('https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state,
            code_challenge_method: 'S256',
            code_challenge: code_challenge
        })), function(req, res){
            let code = req.query.code || null;
            let state = req.query.state || null;
            console.log(code);
        };
}



exports.spotify_authorise = function (req, res) {
}

exports.spotify_token = function (req, res) {

}