const express = require('express');
const router = express.Router();
const oura = require('oura');

router.get('/getreadinessdata', (req, res) => {
    let client = new oura.Client(req.user.oura_api.oura_access_token);
    client.readiness('2019-6-3', '2019-6-3')
        .then(readinessdata => {
            console.log(readinessdata);
        })
        .catch(err => {
            console.log(err);
        })
    res.redirect('/dashboard')
})

module.exports = router;