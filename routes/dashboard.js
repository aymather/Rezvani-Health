const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    console.log(req.user);
    res.render('dashboard');
})

module.exports = router;