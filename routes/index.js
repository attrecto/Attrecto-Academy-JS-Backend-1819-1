const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.status(444).end();
});

module.exports = router;
