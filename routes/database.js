const express = require('express');
const router = express.Router();
const User = require('../config/models');
const { ensureAuthenticated } = require('../config/auth');

// Handles requests to database page

// GET
router.get('/database', ensureAuthenticated, (req, res) => {
    var data;
    if(req.query.client){
        data = JSON.parse(req.query.client)[0];
    } else {
        data = null;
    }
    res.render('QueryDatabase', {client: data});
})

// POST
router.post('/database', (req, res) => {
    var username = req.body.username;
    User.find({username: username})
        .then(data => {
            res.redirect(`/database?client=${JSON.stringify(data)}`);
        })
        .catch(err => {
            res.redirect('/database');
            console.log(err);
        })
    
}) 

module.exports = router;