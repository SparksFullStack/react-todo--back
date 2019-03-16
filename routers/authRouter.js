// this router handles all things related to creating accounts and authentication
// * TODO
// create user route
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
    const { username, password, securityQuestionAnswer } = req.body;
    const newUser = new UserModel({ username, password, securityQuestionAnswer });
    const { _id } = newUser;
    
    newUser.save(err => {
        if (err) return res.status(500).json({ registerError: "There was an error when trying to register you, please try again"});
        
    })
})


module.exports = router;