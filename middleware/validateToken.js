const { tokens } = require('../routes/loginRouter');

const validateToken = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }

  const findToken = tokens.find((t) => t === authorization);

  if (!findToken) {
    return response.status(401).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = validateToken;
