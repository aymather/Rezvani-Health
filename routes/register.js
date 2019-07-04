const express = require('express');
const router = express.Router();
const User = require('../config/models');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

router.get('/register', (req, res) => {
    res.render('Register');
})

router.post('/register', (req, res) => {
    const { firstname, lastname, username, email, password, password2 } = req.body;

    // Check that all fields are filled out
    if (!firstname || !lastname || !username || !email || !password || !password2){
        return res.status(400).json({ msg: "Please enter all fields." });
    }

    // Check that passwords match
    if (password !== password2){
        return res.status(400).json({ msg: "Passwords do not match." });
    }

    // Check password length
    if (password.length < 6){
        return res.status(400).json({ msg: "Password must be at least 6 characters." })
    }

    // Check if email or username already exists
    User.findOne({$or: [{ username: username }, { email: email }] })
        .then(user => {
            if(user){
                return res.status(400).json({ msg: "Username or email already exists." })
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
                    if(err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;

                        // Set password to hash
                        newUser.password = hash;

                        // Save user
                        newUser.save()
                            .then(user => {

                                jwt.sign(
                                    { id: user.id },
                                    config.get('jwtSecret'),
                                    { expiresIn: 3600 },
                                    (err, token) => {
                                        if(err) throw err;

                                        res.json({
                                            user: {
                                                token,
                                                id: user.id,
                                                username: user.username,
                                                firstname: user.firstname,
                                                lastname: user.lastname,
                                                email: user.email
                                            }
                                        });
                                    }
                                )
                            })
                            .catch(err => {
                                res.json({ msg: 'There was a problem saving the new user' });
                            })
                    })
                })
            }
        })
        .catch(error => {
            throw error;
        })
})

module.exports = router;