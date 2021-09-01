const { Router } = require('express');
const { StatusCodes } = require('http-status-codes');
const { tokenGenerator } = require('../utility.js');
const emailValidation = require('../validations/email');
const passwordValidation = require('../validations/password');

const router = Router();

const Validation = [emailValidation, passwordValidation];

router.post('/', Validation[0], Validation[1], (_req, res) => {
  const token = tokenGenerator();
  return res.status(StatusCodes.OK).json({ token });
});

module.exports = router;
