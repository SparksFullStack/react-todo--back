// this router handles all things related to creating accounts and authentication
const express = require('express');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res) => res.send('The auth router is working!'));

module.exports = router;