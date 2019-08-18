const express = require('express');
const router = express.Router();
const User = require('../config/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/login', (req, res) => {
    
    const { username, password } = req.body;
    if(!username || !password){
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    User.findOne({ username })
        .then(user => {
            
            if(!user) return res.status(400).json({ msg: "User does not exist" });

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: "Invalid password"});
                
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) return res.status(500).json({msg: "Internal server error."});
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    firstname: user.firstname,
                                    lastname: user.lastname,
                                    email: user.email,
                                    groups: user.groups
                                }
                            })
                        }
                    )
                })
                .catch(err => {
                    return res.status(500).json({ msg: "Internal server error"});
                }) 
        })
        .catch(err => {
            return res.status(500).json({ msg: "Internal server error"});
        })
    
})

module.exports = router;