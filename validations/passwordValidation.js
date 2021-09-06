const EMPTY_PASSWORD_ERROR = 'O campo "password" é obrigatório';
const INVALID_PASSWORD_ERROR = 'O "password" deve ter pelo menos 6 caracteres';

module.exports = (request, response, next) => {
  const { password } = request.body;
  if (!password || password === '') {
    return response.status(400).json({ message: EMPTY_PASSWORD_ERROR });
  }
  if (password.length < 6) return response.status(400).json({ message: INVALID_PASSWORD_ERROR });
  
  next();
};