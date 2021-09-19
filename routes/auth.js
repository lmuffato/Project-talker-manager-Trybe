const express = require('express');
const crypto = require('crypto');
const fs = require('fs').promises;
const validate = require('../validation/loginValidation');

const authRouter = express.Router();
const HTTP_OK_STATUS = 200;
const BAD_REQUEST_STATUS = 400;

authRouter.post('/', async (_request, response) => {
  const validationError = validate(_request.body);
  if (validationError) {
    return response.status(BAD_REQUEST_STATUS).json(validationError);
  }
  const token = crypto.randomBytes(8).toString('hex');
  await fs.writeFile('user.json', 
  JSON.stringify({ email: _request.body.email, token }), 'utf8');
  return response.status(HTTP_OK_STATUS).json({ token });
});

module.exports = authRouter;