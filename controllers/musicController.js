const TOKEN = require('./tokenController');
const SPOTIFY = require('./spotifyController');

exports.search = async function (req, res) {
    try {
        //get API key for spotify 
        const spotify_token = await TOKEN.getToken('Spotify');
        
        //check for key expiration 
        if (Date.now() > spotify_token.expires_in) {
            SPOTIFY.spotify_authorise();
            spotify_token = TOKEN.getToken('Spotify');
        }
        //request information from spotify 
        const results = await SPOTIFY.search(spotify_token.token, req.query.name, req.query.filter);
        if (results) res.json(results.data);
    } catch (err) {
        //catch axios error messages
        if (err.response) {
            res.json({ error: err });
        }
        res.json(err.message);
    }
}