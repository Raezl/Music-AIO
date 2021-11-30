
const TOKENS = require('../models/extTokenModel');

exports.getToken = function (id) {
    return TOKENS.findOne({ source: id });
}

exports.setTokens = async function (data) {

    try {
        const newToken = {
            source: data.source,
            token: data.token,
            expires_in: data.expires_in
        }

        const tokenUpdate = await TOKENS.findOneAndUpdate({ source: data.source }, newToken, { upsert: true });

        if (tokenUpdate) console.log('Updated token');

    } catch (err) {
        console.log(err);
    }
}