const USER = require('../models/usersModel');
const userValidation = require('../validations/userValidation');
const HASH = require('../hash');
const jwt = require('jsonwebtoken')

//Find user detail by email
findUserByEmail = async (data) => {
    return USER.findOne({ email: data });
}


//Check for user and return jwt token
exports.login = async function (req, res) {
    try {
        const user = await findUserByEmail(req.body.email);
        if (user === null) throw 'Email not found';

        const hashedpassword = await HASH.genHash(req.body.password);

        if (HASH.verifyPassword(req.body.password, hashedpassword)) {
            //create jwt token 
            const token = jwt.sign();
            res.status(200).json({ message: 'Authenticated' });
        }
    } catch (err) {
        res.status(200).json({ message: err });
    }

};

//Add new user 
exports.register = async function (req, res) {
    try {
        const { error } = userValidation.registerValidation(req.body);
        if (error) throw error.message;

        const user = await findUserByEmail(req.body.email);
        if (user) throw 'Email exits';

        //Hash password  
        const hash = await HASH.genHash(req.body.password);
        //create new user 
        const newUser = new USER({
            email: req.body.email,
            password: hash
        });

        //add new user to db
        const registred = await newUser.save();
        if (registred) return res.status(200).json({ message: 'Authorised' });

    } catch (err) {
        res.status(200).json({ message: err });
    }
}


