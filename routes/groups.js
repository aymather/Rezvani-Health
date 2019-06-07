const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const User = require('../config/models');

router.get('/groups', ensureAuthenticated, (req, res) => {
    res.render('Groups', {
        user: req.user
    });
})

router.post('/groups', ensureAuthenticated, (req, res) => {

    let { group_name } = req.body;
    
    req.user.groups.push({
        name: group_name
    })
    
    req.user.save();
    
    res.render('Groups', {
        user: req.user
    })
})

router.get('/groups/view/:group_id', ensureAuthenticated, (req, res) => {
    
    res.redirect('/groups');
})

router.get('/groups/delete/:group_id', ensureAuthenticated, (req, res) => {

    let { group_id } = req.params;
    req.user.groups._id[group_id].remove();
    for(group in req.user.groups){
        console.log(group);
        if(group._id == group_id){
            group.remove();
        }
    }
    console.log(req.user);
    res.render('Groups', {
        user: req.user
    })
})

module.exports = router;