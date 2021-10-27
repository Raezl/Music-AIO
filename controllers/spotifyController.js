
require('dotenv').config();
const crypto = require('crypto');
const querystring = require('querystring');
const client_id = process.env.SCLIENT_ID;
const redirect_uri = process.env.S_REDIRECT;


function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex');
};

function hashCode(code) {
    return crypto.createHash('sha256').update(code).digest('base64');
}

exports.getAuthorization = function (req, res) {
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
        }));
}

exports.callBack = function (req, res) {

    let code = req.query.code || null;
    let state = req.query.state || null;

    if (state === null) {
        res.redirect('/#' +
            new URLSearchParams({
                error: 'state_mismatch'
            }));
    } else {
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };
    }
}