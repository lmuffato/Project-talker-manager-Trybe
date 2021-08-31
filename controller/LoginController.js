const express = require('express');

const { signIn } = require('../service/LoginService');

const { HTTP_OK_STATUS, HTTP_BAD_REQUEST } = require('../config/Server');
const { ROUTE_BASE } = require('../config/Routes');

const loginController = express();

loginController.post(ROUTE_BASE, async (request, response) => {
  const { email, password } = request.body;

  try {
    const token = await signIn(email, password);
    response.status(HTTP_OK_STATUS).json({ token });
  } catch (error) {
    const { message } = error;
    response.status(HTTP_BAD_REQUEST).json({ message });
  }
});

module.exports = loginController;
