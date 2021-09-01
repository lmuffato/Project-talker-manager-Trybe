const { Router } = require('express');
const crypto = require('crypto');
const validateEmailMiddleware = require('../middleware/validateEmail');
const validatePasswordMiddleware = require('../middleware/validatePassword');

const loginRouter = Router();

const HTTP_OK_STATUS = 200;

loginRouter.post('/', validateEmailMiddleware, validatePasswordMiddleware, (req, res) => {
  // https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
  const token = crypto.randomBytes(8).toString('hex');
  res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = loginRouter;