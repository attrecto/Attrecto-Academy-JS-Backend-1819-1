'use strict';

const express = require('express');
const router = express.Router();
const {errorHandler} = requireFromRoot('common/error');
const authManager = requireFromRoot('manager/auth');
const {createToken} = requireFromRoot('lib/auth');

router.get('/', function(req, res) {
  res.status(444).end();
});

router.post('/login', async (req, res, next) => {
  try {
    const {name, password} = req.body;

    const {id} = await authManager.authUser(name, password);
    const token = await createToken({name, id});

    res.json({token});
  } catch (e) {
    errorHandler(e, next);
  }
});

module.exports = router;
