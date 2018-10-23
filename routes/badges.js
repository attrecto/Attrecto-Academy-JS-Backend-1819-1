const express = require('express');
const router = express.Router();
const {errorHandler} = requireFromRoot('common/error');

const badgeManager = requireFromRoot('manager/badge');

router.get('/', async (req, res, next) => {
  try {
    const badges = await badgeManager.getBadges();

    res.send(badges);
  } catch (e) {
    errorHandler(e, next);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const badge = await badgeManager.getBadge(id);

    res.send(badge);
  } catch (e) {
    errorHandler(e, next);
  }
});

module.exports = router;
