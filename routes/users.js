const express = require('express');
const router = express.Router();
const {errorHandler} = requireFromRoot('common/error');

router.get('/', function(req, res, next) {
  try {
    res.send('GET users status OK.');
  } catch (e) {
    errorHandler(e, next);
  }
});

module.exports = router;
