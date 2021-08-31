const express = require('express');

const generateToken = require('../utils/generateToken');
const { checkEmptyLogin, checkInvalidLogin } = require('../utils/checkers');
const { https } = require('../utils/infos');

const route = express.Router();

const { HTTP_OK_STATUS, HTTP_BAD_REQUEST_STATUS } = https;

const authUser = (request, response, next) => {
  const { email, password } = request.body;

  const empty = checkEmptyLogin(email, password);
  if (empty.message) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: empty.message });
  }

  const invalid = checkInvalidLogin(email, password);
  if (invalid.message) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: invalid.message });
  }

  next();
};

const sendToken = (request, response) => {
  const token = generateToken();

  return response.status(HTTP_OK_STATUS).json({ token });
};

route.post('/', authUser, sendToken);

module.exports = route;
