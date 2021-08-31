const express = require('express');
const generateToken = require('../utils/generateToken');
const status = require('../status');

const route = express.Router();

route.post('/', (req, res) => {
  res.status(status.ok).json({ token: generateToken() });
});

module.exports = route;
