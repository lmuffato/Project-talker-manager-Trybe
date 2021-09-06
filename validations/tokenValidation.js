const TOKEN_NOT_FOUND_ERROR = 'Token não encontrado';
const INVALID_TOKEN_ERROR = 'Token inválido';

module.exports = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json({ message: TOKEN_NOT_FOUND_ERROR });
  }
  if (authorization.length !== 16) {
    return response.status(401).json({ message: INVALID_TOKEN_ERROR });
  }
  next();
};
