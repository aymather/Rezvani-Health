const express = require('express');
const router = express.Router();

router.get('/testchart', (req, res) => {
    res.redirect('http://localhost:3000');
})

module.exports = router;