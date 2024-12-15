const express = require('express');
const router = express.Router();
const verifyUser = require('../middlewares/verifyUser');

router.get('/', verifyUser, (req, res) => {
  res.status(200).json({ username: req.username });
});

module.exports = router;
