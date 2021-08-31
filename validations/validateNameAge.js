const HTTP_BAD_REQUEST = 400;

const validateNameAge = (request, response, next) => {
  const { name, age } = request.body;
  if (!name) {
    return response.status(HTTP_BAD_REQUEST)
  .json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return response.status(HTTP_BAD_REQUEST)
  .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) {
    return response.status(HTTP_BAD_REQUEST)
  .json({ message: 'O campo "age" é obrigatório' });
  }
  if (age <= 18) {
    return response.status(HTTP_BAD_REQUEST)
  .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

module.exports = validateNameAge;