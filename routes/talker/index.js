const router = require('express').Router();

const { 
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isTalkDateValid,
  isTalkRateValid,
} = require('../../utils/validations');

const get = require('./get');
const post = require('./post');
const put = require('./put');
const deleteVerb = require('./delete');

router.use(get);

router.use(isTokenValid);
router.use(deleteVerb);

router.use(
  isNameValid,
  isAgeValid,
  isTalkDateValid,
  isTalkRateValid,
  isTalkValid,
);
router.use(post, put);

module.exports = router;
