const express = require('express');
const router = express.Router();
const get_data = require('../backend_funcs/get_data');

router.get('/groups', (req, res) => {
    res.render('Groups', {
        user: req.user
    });
})

router.post('/groups', (req, res) => {

    let { group_name } = req.body;
    
    req.user.groups.push({
        name: group_name
    })
    
    req.user.save((err, user) => {
    
        // Handle error
        if(err) { console.log(err) };

        // Render
    res.render('Groups', {
            user: user
    })

    });
    
    
})

router.get('/groups/view/:group_id', (req, res) => {
    
    var { group_id } = req.params,
        group_view;

    req.user.groups.map(group => {
        if(group._id == group_id){
            group_view = group;
        }
})

    res.render('ViewGroup', {
        user: req.user,
        group: group_view
    })
})

router.get('/groups/delete/:group_id', (req, res) => {

    // Extract group_id from url
    let { group_id } = req.params;
    req.user.groups._id[group_id].remove();
    for(group in req.user.groups){
        console.log(group);
        if(group._id == group_id){
            group.remove();
        }
    }

})

module.exports = router;