const { tokens } = require('../routes/loginRouter');

const validateToken = (request, response, next) => {
  const { token } = request.headers;

  if (!token || token === '') {
    return response.status(401).json({ message: 'Token inválido' });
  }

  const findToken = tokens.find((t) => t === token);

  if (!findToken) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }

  next();
};

module.exports = validateToken;
