const express = require('express');

const status = require('../status');
const generateToken = require('../utils/generateToken');
const validateLogin = require('../validations/login');

const route = express.Router();

route.post('/', (req, res) => {
  const { email, password } = req.body;

  const validation = validateLogin({ email, password });

  switch (validation.status) {
    case status.bad:
      return res.status(status.bad).json({ message: validation.message });
    case status.ok:
      return res.status(status.ok).json({ token: generateToken() });
    default:
  }
});

module.exports = route;
