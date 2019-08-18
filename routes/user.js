const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../config/models');
const ouraConfig = require('../config/oura');

router.get('/user', authMiddleware, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .select('-groups')
        .select('-clients')
        .then(user => {
            res.json(user);
        })
        .catch(() => {
            res.status(500).json({ data: "Interal server error" })
        })
})

router.get(ouraConfig.authCallbackUri, (req, res) => {
    console.log('Triggered callback');
    res.json({ msg: 'Success' });
})

module.exports = router;