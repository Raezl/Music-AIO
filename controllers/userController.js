const USER = require('../models/usersModel');
const userValidation = require('../validations/userValidation');
const HASH = require('../hash');


function findUserByEmail(data) {
    return new Promise((resolve, reject) => {
        const user = USER.findOne({ email: data })
        if (user) {
            resolve(user);
        }
        reject(new Error('not found'));
    })
}


//Find username
exports.login = function (req, res) {
    findUserByEmail(req.body.email).then(user => {
        if (user != null) {
            console.log(user._id);
            HASH.genHash(req.body.password).then(data => {
                console.log(data);
                HASH.verifyPassword(user.password, data).then(verified => {
                    if (verified === true) {
                        console.log(verified);
                        const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
                        res.header('auth-token', token).send('Authorised');
                    }
                })
            //Handle errors if password not matched
            }).catch(err =>{
                res.json({message: err});
            });
        }
    //Handle errors if user email is not in db
    }).catch(err =>{
        res.status(200).json({message: err});
    })
};

//Add new user 
exports.register = function (req, res) {

    const { error } = userValidation.registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check for existing user email
    USER.findOne({ email: req.body.email })
        .then(email => {
            if (email) return res.status(409).send('Email already exist');

            //Hash password 
            HASH.genHash(req.body.password).then(hash => {
                //add new user to db
                const user = new USER({
                    email: req.body.email,
                    password: hash
                });
                user.save()
                    .then(
                        res.status(200).json({ message: 'Success' })
                    )
                    .catch(err => {
                        res.status(200).json({ messege: err });
                    });
            });
        });
};


