const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../config/models');

router.post('/groupStage', authMiddleware, (req, res) => {
    const { group_id } = req.body;
    
    User.findById(req.user.id)
        .then(user => {
            
            var { sleep, readiness, activity } = user.groups.id(group_id).get_group_data();
            
            res.json({ 
                sleep,
                readiness,
                activity
            });
        })
        .catch(err => {
            res.status(500).json({ msg: "Internal server error"})
        })
})

module.exports = router;