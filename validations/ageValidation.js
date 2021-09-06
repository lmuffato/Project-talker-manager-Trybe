const AGE_REQUIRED_ERROR = 'O campo "age" é obrigatório';
const MINIMUN_AGE_ERROR = 'A pessoa palestrante deve ser maior de idade';

module.exports = (request, response, next) => {
  const { age } = request.body;
  if (!age) return response.status(400).json({ message: AGE_REQUIRED_ERROR });
  if (age < 18) return response.status(400).json({ message: MINIMUN_AGE_ERROR });
  next();
};
