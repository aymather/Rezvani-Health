const express = require('express');
const router = express.Router();
const oura = require('oura');
const url = require('url');
const User = require('../config/models');
const ouraConfig = require('../config/oura');
const { ensureAuthenticated } = require('../config/auth');

let options = {
    clientId: ouraConfig.clientId,
    clientSecret: ouraConfig.clientSecret,
    redirectUri: ouraConfig.authCallbackUri
}

let authClient = oura.Auth(options);
let authUri = authClient.code.getUri()

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        user: req.user,
        auth_uri: authUri
    });
})

router.get(url.parse(options.redirectUri).pathname, ensureAuthenticated, (req, res) => {
    authClient.code.getToken(req.originalUrl)
        .then(data => {
            
            // Extract the data
            const { accessToken, refreshToken } = data;
            
            // Place the data into the database
            User.findOne({ username: req.user.username })
                .then(user => {
                    
                    // save the access/refresh tokens
                    user.oura_api.oura_access_token = accessToken;
                    user.oura_api.oura_refresh_token = refreshToken;
                    user.save();
                    // get userinfo from api
                    let client = new oura.Client(accessToken);
                    client.personalInfo()
                        .then(userdata => {
                            const { user_id, age, weight, gender, email } = userdata;
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                })

        })
        .then(() => {
            res.render('dashboard', {
                user: req.user,
                auth_uri: authUri
            });
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = router;