const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You have been logged out.');
    res.redirect('/login');
})

module.exports = router;