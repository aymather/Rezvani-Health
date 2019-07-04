const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/testchart', authMiddleware, (req, res) => {
    res.json({ msg: "Request succeeded!"});
})

module.exports = router;