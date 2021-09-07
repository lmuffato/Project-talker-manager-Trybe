const express = require('express');

const status = require('../status');
const generateToken = require('../utils/generateToken');
const validateLogin = require('../validations/login');
const user = require('../utils/user');

const route = express.Router();

route.post('/', (req, res) => {
  const { email, password } = req.body;

  const validation = validateLogin({ email, password });

  switch (validation.status) {
    case status.badRequest:
      return res.status(status.badRequest).json({ message: validation.message });
    case status.ok:
      {
        const token = generateToken();
        user.add({ email, password, token });
        return res.status(status.ok).json({ token });
      }
    default:
  }
});

module.exports = route;
