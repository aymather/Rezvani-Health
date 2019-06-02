const express = require('express');
const router = express.Router();
const rp = require('request-promise');

router.get('/auth', (req, res) => {
    console.log('hi');
    console.log(req.body);
    res.render('Auth');
})

module.exports = router;