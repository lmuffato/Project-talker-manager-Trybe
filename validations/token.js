const { StatusCodes } = require('http-status-codes');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // const isValid = /^[\w]{16}$/i;
  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  next();
};
