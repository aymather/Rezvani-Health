const express = require('express');
const router = express.Router();
const oura = require('oura');

router.get('/getactivitydata', (req, res) => {
    let client = new oura.Client(req.user.oura_api.oura_access_token);
    client.activity('2019-6-3', '2019-6-3')
        .then(activitydata => {
            console.log(activitydata);
        })
        .catch(err => {
            console.log(err);
        })
    res.redirect('/dashboard')
})

module.exports = router;