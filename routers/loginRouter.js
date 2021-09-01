const express = require('express');
const generateToken = require('../utils/generateToken');
const { isValidEmail, isValidPassword } = require('../middleWares/validations');

const router = express.Router();

const HTTP_OK = 200;

const VALIDATIONS = [isValidEmail, isValidPassword];

router.post('/', VALIDATIONS, (req, res) => {
  const token = generateToken();

  res.status(HTTP_OK).json({ token });
});

module.exports = router;
