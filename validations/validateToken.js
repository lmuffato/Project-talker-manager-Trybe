const HTTP_UNAUTHORIZED = 401;

const validateToken = (request, response, next) => {
  const token = request.headers.authorization;

  if (!token) return response.status(HTTP_UNAUTHORIZED).json({ message: 'Token não encontrado' });
  if (token.length !== 16) {
    return response.status(HTTP_UNAUTHORIZED)
  .json({ message: 'Token inválido' }); 
  }
  next();
};

module.exports = validateToken;
