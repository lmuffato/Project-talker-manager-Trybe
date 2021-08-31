const { Router } = require('express');

const {
  requisito3,
} = require('./crud');

const {
  validateEmail,
  validatePassword,
} = require('./validates');

const router = Router();

router.post(
  '/',
  validateEmail,
  validatePassword,
  requisito3,
);

module.exports = router;