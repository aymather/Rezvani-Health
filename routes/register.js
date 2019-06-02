const express = require('express');
const router = express.Router();
const User = require('../config/models');
const bcrypt = require('bcryptjs');

router.get('/register', (req, res) => {
    res.render('Register');
})

router.post('/register', (req, res) => {
    const { firstname, lastname, username, email, password, password2 } = req.body;
    var messages = [];

    // Check that all fields are filled out
    if (!firstname || !lastname || !username || !email || !password || !password2){
        messages.push({msg: 'Please make sure that all fields are filled out.'})
    }

    // Check that passwords match
    if (password !== password2){
        messages.push({msg: 'Passwords do not match.'})
    }

    // Check password length
    if (password.length < 6){
        messages.push({msg: 'Password should be at least 6 characters.'})
    }

    if (messages.length > 0){
        res.render('register', {
            messages,
            firstname,
            lastname,
            username,
            email,
            password,
            password2
        })
    } else {

        // Check if email or username already exists
        User.findOne({$or: [{ username: username }, { email: email }] })
            .then(user => {
                if(user){
                    messages.push({ msg: 'Either your email or username is already registered with an account.' })
                    res.render('register', {
                        messages,
                        firstname,
                        lastname,
                        username,
                        email,
                        password,
                        password2
                    })
                } else {

                    // Create User
                    const newUser = new User({
                        firstname: firstname,
                        lastname: lastname,
                        username: username,
                        email: email,
                        password: password
                    })

                    // Encrypt the password
                    bcrypt.genSalt(10, (err, salt) => {
                        if(err) console.log(err);
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err){ console.log(err); };

                            // Set password to hash
                            newUser.password = hash;

                            // Save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in.')
                                    res.redirect('/login');
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        })
                    })
                }
            })
            .catch(error => {
                throw error;
            })
    }
})

module.exports = router;