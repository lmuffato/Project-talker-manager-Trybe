const { unauthorized } = require('../httpStatusCode');

const TOKEN_LENGTH = 16;

const validationToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(unauthorized).json({
      message: 'Token não encontrado',
    });
  }

  if (authorization.length < TOKEN_LENGTH) {
    return res.status(unauthorized).json({
      message: 'Token inválido',
    });
  }

  next();
};

module.exports = validationToken;
