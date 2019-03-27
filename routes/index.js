const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
    res.render('home');
})

module.exports = router;