const rescue = require('express-rescue');

const HTTP_OK_STATUS = 200;

// Requisito 3

const login = rescue(async (request, response) => {
  const rand = () => Math.random(0).toString(36).substr(2);
  const token = (length) => (rand() + rand()).substr(0, length);
  
  response.status(HTTP_OK_STATUS).json({ token: token(16) });
});

module.exports = login;
