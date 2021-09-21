const { HTTP_UNAUTHORIZED } = require('../utils/statusHttp');

const authentication = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED).send({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED).send({
      message: 'Token inválido',
    });
  }

  next();
};

module.exports = {
  authentication,
};