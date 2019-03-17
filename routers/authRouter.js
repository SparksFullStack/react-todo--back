// this router handles all things related to creating accounts and authentication
// * TODO
// sign in route
// sign out route
// forgot password route

const express = require('express');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const { JWT_SECRET } = process.env;

const router = express.Router();

router.get('/', (req, res) => res.send('The auth router is working!'));

router.post('/register', (req, res) => {
    const { email, password, securityQuestionAnswer } = req.body;
    const newUser = new UserModel({ email, password, securityQuestionAnswer });
    const { _id } = newUser;
    
    newUser.save(err => {
        if (err) return res.status(500).json({ registerError: "There was an error when trying to register the user" });
        
        JWT.sign({ email, password, securityQuestionAnswer, _id }, JWT_SECRET, { expiresIn: "6hr", algorithm: 'HS256'}, (err, token) => {
            if (err) return res.status(500).json({ registerError: "There was an error when trying to generate a JWT for the user" });
            else res.status(200).json({ JWT: token });
        })
    })
});

router.post('/login', (req, res) => {
    const credentials = req.body;

    UserModel.findOne({ email: credentials.email })
        .then(userRecord => {
            if (!userRecord) return res.status(404).json('No user with that email was found');

            const { email, password, securityQuestionAnswer } = userRecord;
            if (bcrypt.compareSync(credentials.password, password)) {
                JWT.sign({ email, password, securityQuestionAnswer }, JWT_SECRET, { expiresIn: "6hr", algorithm: 'HS256' }, (err, decoded) => {
                    if (err) return res.status(500).json({ loginError: "There was an error when trying to generate a JWT for the user" });
                    res.status(200).json({ JWT: decoded });
                });
            } else res.status(401).json({ loginError: "The password provided didn't match the user record, please try again" });
        });
});


module.exports = router;