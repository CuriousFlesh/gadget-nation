const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "Users API works!" });
});

module.exports = router;
