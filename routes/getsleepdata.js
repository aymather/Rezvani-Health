const express = require('express');
const router = express.Router();
const oura = require('oura');

router.get('/getsleepdata', (req, res) => {
    let client = new oura.Client(req.user.oura_api.oura_access_token);
    client.sleep('2018-10-26', '2018-11-1')
        .then(sleepdata => {
            console.log(sleepdata);
        })
        .catch(err => {
            console.log(sleepdata);
        })
    res.redirect('/dashboard')
})

module.exports = router;