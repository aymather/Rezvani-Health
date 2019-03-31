const express = require('express');
const router = express.Router();
const Client = require('../config/models');

// Handles requests to database page

// GET
router.get('/database', (req, res) => {
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
    var client = req.body.username;
    Client.find({username: client})
        .then(data => {
            res.redirect(`/database?client=${JSON.stringify(data)}`);
        })
        .catch(err => {
            res.redirect('/database');
            console.log(err);
        })
    
}) 

module.exports = router;