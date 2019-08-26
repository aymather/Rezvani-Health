const express = require('express');
const router = express.Router();
const User = require('../config/models');
const authMiddleware = require('../middleware/auth');
const retreatIdMiddleware = require('../middleware/retreatId');

router.get('/getgroups', authMiddleware, retreatIdMiddleware, (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            var group_data = user.retreats.id(req.retreat_id).groups.map(group => {
                return {
                    members: group.members,
                    name: group.name,
                    id: group._id
                }
            })
            res.json(group_data.reverse());
        })
        .catch(() => {
            res.status(500).json({ msg: "Internal server error"});
        })
    
})

router.post('/addgroup', authMiddleware, retreatIdMiddleware, (req, res) => {

    const { group_name } = req.body;
    User.findById(req.user.id)
        .then(user => {
            user.retreats.id(req.retreat_id).groups.push({ name: group_name });
            user.save()
                .then(savedUser => {
                    // Get the group we just saved
                    var newGroup = savedUser.retreats.id(req.retreat_id).groups[savedUser.retreats.id(req.retreat_id).groups.length-1];
                    res.json({
                        members: newGroup.members,
                        name: newGroup.name,
                        id: newGroup._id
                    })
                })
                .catch(() => {
                    res.status(500).json({ msg: "Error saving new group"});
                })
        })
        .catch(() => {
            res.status(500).json({ msg: "Internal server error"});
        })

})

router.post('/removegroup', authMiddleware, retreatIdMiddleware, (req, res) => {

    const { group_id } = req.body;
    User.findById(req.user.id)
        .then(user => {
            // Remove that id from any clients part of it
            for(id of user.retreats.id(req.retreat_id).groups.id(group_id).members){
                user.retreats.id(req.retreat_id).clients.id(id).groups = user.retreats.id(req.retreat_id).clients.id(id).groups.filter(each_id => each_id !== group_id);
            }

            // Remove group model
            user.retreats.id(req.retreat_id).groups.id(group_id).remove();
            user.save()
                .then(() => {
                    res.json({ id: group_id });
                })
                .catch(() => {
                    res.status(500).json({ msg: "Internal server error"});
                })
        })
        .catch(() => {
            res.status(500).json({ msg: "Internal server error"});
        })

})

router.post('/editGroupMembers', authMiddleware, retreatIdMiddleware, (req, res) => {
    const { group_id, member_status } = req.body;

    User.findById(req.user.id)
        .then(user => {
            var group = user.retreats.id(req.retreat_id).groups.id(group_id);
            for(var [id, status] of Object.entries(member_status)){

                // Add/remove that group to the client's 'group' list
                if(status && user.retreats.id(req.retreat_id).clients.id(id).groups.indexOf(group_id) === -1){
                    // If the group should exist in their array and it doesn't, add it
                    user.retreats.id(req.retreat_id).clients.id(id).groups.push(group_id);
                } else if(!status && user.clients.id(id).groups.indexOf(group_id) !== -1){
                    // If the group shouldn't exist in the array and it does, remove it
                    var new_group_list = user.retreats.id(req.retreat_id).clients.id(id).groups.filter(each_id => each_id !== group_id);
                    user.retreats.id(req.retreat_id).clients.id(id).groups = new_group_list;
                }

                // Edit group client_id list
                if(status && group.members.indexOf(id) === -1){
                    user.retreats.id(req.retreat_id).groups.id(group_id).members.push(id);
                } else if(!status && group.members.indexOf(id) !== -1) {
                    var new_member_list = user.retreats.id(req.retreat_id).groups.id(group_id).members.filter(each_id => each_id !== id);
                    user.retreats.id(req.retreat_id).groups.id(group_id).members = new_member_list;
                }
            }

            // Save
            user.save()
                .then(() => {
                    res.status(200).json({ msg: "Success!" });
                })
                .catch(() => {
                    res.status(500).json({ msg: "Internal server error" });
                })
        })
        .catch(() => {
            res.status(500).json({ msg: "Internal server error" });
        })
})

module.exports = router;