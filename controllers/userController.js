const USER = require('../models/usersModel');
const userValidation = require('../validations/userValidation');
const HASH = require('../hash');



//Find username
exports.login = function (req, res) {
    HASH.genHash(req.body.password).then(data => {
        HASH.verifyPassword(req.body.password, data).then(verify => {
            res.json({ data: data, verify: verify });
        })
    });
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
            const passwordHash = HASH.genHash(req.body.password);
            //add new user to db
            const user = new USER({
                email: req.body.email,
                password: passwordHash
            });
            user.save()
                .then(
                    res.status(200).json({ message: 'Success' })
                )
                .catch(err => {
                    res.status(200).json({ messege: err });
                });

        });
};


