const { https } = require('../utils/infos');

const { HTTP_UNAUTHORIZED_STATUS } = https;

const { checkToken } = require('../utils/checkers');

const authToken = (request, response, next) => {
  const { authorization: token } = request.headers;

  if (!token) {
    return response
      .status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token não encontrado' });
  }

  const validToken = checkToken(token);

  if (!validToken) {
    return response
      .status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token inválido' });
  }

  next();
};

module.exports = authToken;
