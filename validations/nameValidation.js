const NAME_REQUIRED_ERROR = 'O campo "name" é obrigatório';
const NAME_LENGTH_ERROR = 'O "name" deve ter pelo menos 3 caracteres';

module.exports = (request, response, next) => {
  const { name } = request.body;
  if (!name) return response.status(400).json({ message: NAME_REQUIRED_ERROR });
  if (name.length < 3) return response.status(400).json({ message: NAME_LENGTH_ERROR });
  next();
};
