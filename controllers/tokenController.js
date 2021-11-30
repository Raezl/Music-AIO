
const TOKENS = require('../models/extTokenModel');

exports.getToken = async function (data) {
    return await TOKENS.findOne({ source: data });
}

exports.setTokens = async function (data) {
    try {
        const newToken = {
            source: data.source,
            token: data.token,
            expires_in: data.expires_in
        }

        const tokenUpdate = await TOKENS.findOneAndUpdate({ source: data.source }, newToken, { upsert: true });

        if (tokenUpdate) console.log('Updated token: ' + data.token + 'exp: ' + data.expires_in);

    } catch (err) {
        console.log(err);
    }
}