const express = require('express');
const router = express.Router();
const oura = require('oura');
const ouraConfig = require('../config/oura');
const url = require('url');

// Build options object for authentication
let options = {
    clientId: ouraConfig.clientId,
    clientSecret: ouraConfig.clientSecret,
    redirectUri: ouraConfig.authCallbackUri
}

let authClient = oura.Auth(options);
let auth_uri = authClient.code.getUri();

// This is the redirect path from the oura auth API
let redirect_path = url.parse(options.redirectUri).pathname;

router.get('/newmember/:group_id/:member_id', (req, res) => {

    // Get id's from query params
    var { group_id, member_id } = req.params;

    // Get member information from db
    var member = req.user.groups.id(group_id).members.id(member_id);

    // Build the state object
    var stateObj = {
        group_id: group_id,
        member_id: member_id
    }

    res.render('MemberFinished', {
        user: req.user,
        member: member,
        auth_uri: auth_uri,
        stateObj: JSON.stringify(stateObj)
    })
})

router.get(redirect_path, (req, res) => {

    // Get the user_id from the state echoed from the redirect_uri
    const { group_id, member_id } = JSON.parse(req.query.state);

    // Trade the authorization code for an access_token
    authClient.code.getToken(req.originalUrl)
        .then((data) => {

            // Extract access_token and refresh_token from response
            const { accessToken, refreshToken } = data;

            // Get the user that we just created from the database
            var member = req.user.groups.id(group_id).members.id(member_id);

            // Put the tokens in the database
            member.oura_api.oura_access_token = accessToken;
            member.oura_api.oura_refresh_token = refreshToken;

            // Save the model
            req.user.save();

        })
        .then(() => {
            res.redirect(`/groups/view/${group_id}`);
        })
        .catch(err => {
            console.log(err);
        })

})

module.exports = router;