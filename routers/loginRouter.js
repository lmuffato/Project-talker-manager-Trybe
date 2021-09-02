const express = require('express');
const generateToken = require('../utils/generateToken');
const { isValidEmail, isValidPassword } = require('../middleWares/validations');
const { 
  HTTP_OK_STATUS,
} = require('../utils/statusHTTP');

const router = express.Router();

const VALIDATIONS = [isValidEmail, isValidPassword];

router.post('/', VALIDATIONS, (_req, res) => {
  const token = generateToken(16);

  res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = router;
