const { Router } = require('express');

const {
  requisito1,
  requisito2,
} = require('./crud');

const router = Router();

router.get('/', requisito1);

router.get('/:id', requisito2);

module.exports = router;
