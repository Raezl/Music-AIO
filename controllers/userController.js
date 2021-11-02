const USER = require('../models/usersModel');

//Find username
exports.login = function (req, res){
    res.send('log in');
};

//Add new user 
exports.register = function (req, res){
    const user = new USER({
        email: req.body.email,
        password: req.body.password
    });
    user.save()
    .then(data =>{
        res.json(data);
    })
    .catch(err => {
        res.json({messege: err});
    });
};

