const { Router } = require('express');

const router = new Router();

const { StatusCodes } = require('http-status-codes');

const { tokenGenerator } = require('../utilities/utilities');

const emailFormat = require('../validations/emailFormat');

const emailRequired = require('../validations/emailRequired');

const passwordFormat = require('../validations/passwordFormat');

const passwordRequired = require('../validations/passwordRequired');

const validations = [emailRequired, emailFormat, passwordRequired, passwordFormat];

router.post('/', ...validations, (_req, res) => {
  const token = tokenGenerator(16);
  res.status(StatusCodes.OK).json({ token });
});

module.exports = router;
