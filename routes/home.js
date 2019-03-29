const express = require('express');
const router = express.Router();

// Handles Home Page

// GET
router.get('/', (req, res) => {
    res.render('home');
})

module.exports = router;