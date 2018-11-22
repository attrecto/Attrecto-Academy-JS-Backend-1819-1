'use strict';

const express = require('express');
const router = express.Router();
const {errorHandler} = requireFromRoot('common/error');
const authMiddleware = requireFromRoot('middleware/auth');

const userManager = requireFromRoot('manager/user');

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;

    const result = await userManager.createUser(data);

    res.json(result);
  } catch (e) {
    errorHandler(e, next);
  }
});

router.use(authMiddleware());

router.get('/', async (req, res, next) => {
  try {
    const users = await userManager.getUsers();

    res.json(users);
  } catch (e) {
    errorHandler(e, next);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await userManager.getUser(id);

    res.json(user);
  } catch (e) {
    errorHandler(e, next);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const result = await userManager.updateUser(id, data);

    res.json(result);
  } catch (e) {
    errorHandler(e, next);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await userManager.deleteUser(id);

    res.json(result);
  } catch (e) {
    errorHandler(e, next);
  }
});

router.get('/:userId/badges', async (req, res, next) => {
  try {
    const {userId} = req.params;
    const result = await userManager.getUserBadges(userId);

    res.json(result);
  } catch (e) {
    errorHandler(e, next);
  }
});

router.get('/:userId/badges/:badgeId', async (req, res, next) => {
  try {
    const {userId, badgeId} = req.params;
    const result = await userManager.getUserBadge(userId, badgeId);

    res.json(result);
  } catch (e) {
    errorHandler(e, next);
  }
});

router.post('/:userId/badges/:badgeId', async (req, res, next) => {
  try {
    const {userId, badgeId} = req.params;
    const result = await userManager.assignBadgeToUser(userId, badgeId);

    res.json(result);
  } catch (e) {
    errorHandler(e, next);
  }
});

router.delete('/:userId/badges/:badgeId', async (req, res, next) => {
  try {
    const {userId, badgeId} = req.params;
    const result = await userManager.removeBadgeFromUser(userId, badgeId);

    res.json(result);
  } catch (e) {
    errorHandler(e, next);
  }
});

module.exports = router;
