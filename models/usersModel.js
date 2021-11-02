const mongoose = require('mongoose');


const user_schema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    sources:[{
        source: String,
        token: String,
    }]
})


module.exports = mongoose.model('Users', user_schema); 