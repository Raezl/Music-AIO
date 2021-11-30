
require('dotenv').config();
const TOKENS = require('../controllers/tokenController');
const { default: axios } = require('axios');
const client_id = process.env.SCLIENT_ID;
const client_secret = process.env.SCLIENT_SECRET;


exports.spotify_authorise = function (req, res) {

    //Spotify api only accepts application/x-www-form-urlencoded 
    const data = new URLSearchParams({
        grant_type: 'client_credentials',
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
        const expire_date = (Date.now() + (response.data.expires_in * 1000));
        const newToken = {
            source: 'Spotify',
            token: response.data.access_token,
            expires_in: expire_date
        }
        return newToken;
    }).then((token)=>{
        //Update token
        TOKENS.setTokens(token);
    }).catch(err => {
        res.json({ error: err });
    });

}


