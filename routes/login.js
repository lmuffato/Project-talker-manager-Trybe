const express = require('express');
const status = require('../status');

const user = require('../utils/user');
const generateToken = require('../utils/generateToken');

const validateLogin = require('../middlewares/loginValidation');

const route = express.Router();

route.post('/', validateLogin, (req, res) => {
  const { email, password } = req.body;
  const token = generateToken();
  
  user.add({ email, password, token });
  return res.status(status.ok).json({ token });
});

module.exports = route;
