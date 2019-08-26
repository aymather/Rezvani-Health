const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../config/models');
const moment = require('moment');

function formatMoment(date){
    var mlist = [ "Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];
    var date = new moment(date);
    var month = mlist[date.get('month')];
    var year = date.get('year');
    var day = date.get('date');
    return `${month} ${day}, ${year}`.toUpperCase();
}

router.get('/retreats', authMiddleware, (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            var retreats = user.retreats.map(retreat => {
                return {
                    name: retreat.name,
                    id: retreat._id,
                    date_created: formatMoment(retreat.date_created),
                    date_completed: retreat.date_completed ? formatMoment(retreat.date_completed) : null
                }
            })
            res.json({ retreats });
        })
        .catch(() => {
            res.status(500).json({ msg: "Internal Server Error" })
        })
})

router.post('/add-retreat', authMiddleware, (req, res) => {
    const { name } = req.body;
    User.findById(req.user.id)
        .then(user => {
            user.retreats.push({ name });
            user.save()
                .then(savedUser => {
                    var retreat = savedUser.retreats[savedUser.retreats.length - 1];
                    res.json({
                        name: retreat.name,
                        id: retreat._id,
                        date_created: formatMoment(retreat.date_created),
                        date_completed: null
                    })
                })
                .catch(() => {
                    res.status(500).json({ msg: "Internal Server Error" })
                })
        })
        .catch(() => {
            res.status(500).json({ msg: "Internal Server Error" })
        })
})

router.post('/remove-retreat', authMiddleware, (req, res) => {
    const { retreat_id } = req.body;
    User.findById(req.user.id)
        .then(user => {
            user.retreats.id(retreat_id).remove();
            user.save()
                .then(() => {
                    res.json({ retreat_id });
                })
                .catch(() => {
                    res.status(500).json({ msg: "Internal Server Error" })
                })
        })
        .catch(() => {
            res.status(500).json({ msg: "Internal Server Error" })
        })
})

module.exports = router;