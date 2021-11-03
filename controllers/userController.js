const USER = require('../models/usersModel');
const userValidation = require('../validations/userValidation');



//Find username
exports.login = function (req, res){
    res.send('log in');
};

//Add new user 
exports.register = function (req, res){
    
    const {error} = userValidation.registerValidation(res);
    if(error) return res.status(400).send(error.details[0].message);

    const user = new USER({
        email: req.body.email,
        password: req.body.password
    });
    user.save()
    .then(data =>{
        res.status('200').json(data);
    })
    .catch(err => {
        res.json({messege: err});
    });
};


