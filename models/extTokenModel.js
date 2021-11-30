const mongoose = require('mongoose');

const token_scheema = mongoose.Schema({
    source: String, 
    token: String, 
    expires_in : Number

});

module.exports = mongoose.model('AuthToken', token_scheema);