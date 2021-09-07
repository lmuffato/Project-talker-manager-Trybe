const { StatusCodes } = require('http-status-codes');

function passwordFormat(req, res, next) {
  const { password } = req.body;
  const senhaValida = /^.{6,}$/g;
  if (senhaValida.test(password) === false) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      { message: 'O "password" deve ter pelo menos 6 caracteres' },
);
  }
  next();
}

module.exports = passwordFormat;