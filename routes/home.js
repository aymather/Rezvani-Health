const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Handles Home Page

// GET
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('home', {
        user: req.user
    });
})

module.exports = router;