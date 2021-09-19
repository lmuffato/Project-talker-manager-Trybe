const express = require('express');
const tasks = require('../middlewares/tasks');

const login = express.Router();

login.post('/', tasks.createLogin);

module.exports = login;
