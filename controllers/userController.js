const USER = require('../models/usersModel');

//Find username
exports.login = function (req, res){
    res.status(200).send('log in');
};

//Add new user 
exports.register = function (req, res){
    const user = new USER({
        email: req.body.email,
        password: req.body.password
    });
    user.save()
    .then(
        res.status(200).send('User Registered')
    )
    .catch(err => {
        res.status(400).send(err);
    });
};

