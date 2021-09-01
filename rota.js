const { Router } = require('express');

const {
  requisito1,
  requisito2,
  requisito4,
  requisito5,
} = require('./crud');

const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatched,
  validateRate,
} = require('./validates');

const router = Router();

router.get('/', requisito1);

router.get('/:id', requisito2);

router.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatched,
  validateRate,
  requisito4,
);

router.put(
  '/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatched,
  validateRate,
  requisito5,
);

module.exports = router;