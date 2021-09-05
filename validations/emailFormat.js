const { StatusCodes } = require('http-status-codes');

function emailFormat(req, res, next) {
  const { email } = req.body;
  const emailValido = /\w+@\w+.\w+/g;
  if (emailValido.test(email) === false) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      { message: 'O "email" deve ter o formato "email@email.com"' },
);
  }
  next();
}

module.exports = emailFormat;