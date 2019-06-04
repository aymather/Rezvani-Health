const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const User = require('../config/models');

router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('Profile', {
        user: req.user
    });
})

router.post('/profile', ensureAuthenticated, (req, res) => {
    const { firstname, lastname, gender, status, email, birthday, medications } = req.body;
    User.findOne({ username: req.user.username })
        .then(userdata => {
            userdata.firstname = firstname;
            userdata.lastname = lastname;
            userdata.gender = gender;
            userdata.status = status;
            userdata.email = email;
            userdata.birthday = birthday;
            userdata.medications = medications;
            userdata.save();
            res.render('Profile', {
                user: userdata
            })
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = router;