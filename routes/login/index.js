const login = require('express').Router();
const token = require('./token');
const { validateEmail, validatePassword } = require('./validate');

login.post('/', validateEmail);
login.post('/', validatePassword);
login.post('/', token);

module.exports = login;