const express = require('express');

const router = express.Router();

const {
  createToken,
  validateEmail,
  validatePassword,
} = require('../middlewares/loginMiddlewares');

const loginMiddlewares = [
  validateEmail,
  validatePassword,
  createToken];

router.post('/', loginMiddlewares);

module.exports = router;