'use strict';

const express = require('express');
const router = express.Router();
const {errorHandler} = requireFromRoot('common/error');
const authMiddleware = requireFromRoot('middleware/auth');
const badgeManager = requireFromRoot('manager/badge');

router.use(authMiddleware());

router.get('/', async (req, res, next) => {
  try {
    const badges = await badgeManager.getBadges();

    res.json(badges);
  } catch (e) {
    errorHandler(e, next);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;

    const result = await badgeManager.createBadge(data);

    res.json(result);
  } catch (e) {
    errorHandler(e, next);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const badge = await badgeManager.getBadge(id);

    res.json(badge);
  } catch (e) {
    errorHandler(e, next);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const result = await badgeManager.updateBadge(id, data);

    res.json(result);
  } catch (e) {
    errorHandler(e, next);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await badgeManager.deleteBadge(id);

    res.json(result);
  } catch (e) {
    errorHandler(e, next);
  }
});

module.exports = router;
