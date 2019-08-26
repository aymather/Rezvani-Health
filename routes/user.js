const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../config/models');

router.get('/user', authMiddleware, (req, res) => {
    User.findById(req.user.id)
        .select('-retreats')
        .then(user => {
            res.json(user);
        })
        .catch(() => {
            res.status(500).json({ data: "Interal server error" })
        })
})

module.exports = router;