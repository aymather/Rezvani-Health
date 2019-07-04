const express = require('express');
const router = express.Router();
const User = require('../config/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const authMiddleware = require('../middleware/auth');

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
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    firstname: user.firstname,
                                    lastname: user.lastname,
                                    email: user.email
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

router.get('/user', authMiddleware, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(500).json({ data: "Interal server error" })
        })
})

module.exports = router;