const express = require('express');
const router = express.Router();
const User = require('../config/models');

// Handles Home Page

// GET
router.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    User.find()
        .then(user => {
            res.json(user);
        })
})

module.exports = router;