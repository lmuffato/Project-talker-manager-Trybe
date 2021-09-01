const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;

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

const validateTalks = (request, response, next) => {
  const { talk } = request.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return response.status(HTTP_BAD_REQUEST)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
  }
  next();
};

const validateRates = (request, response, next) => {
  const { talk } = request.body;
  if (talk.rate < 1 || talk.rate > 5) {
    return response.status(HTTP_BAD_REQUEST)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const validateWachedAt = (request, response, next) => {
  const { talk } = request.body;
  const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regexDate.test(talk.watchedAt)) {
    return response.status(HTTP_BAD_REQUEST)
  .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateToken = (request, response, next) => {
  const token = request.headers.authorization;

  if (!token) return response.status(HTTP_UNAUTHORIZED).json({ message: 'Token não encontrado' });
  if (token.length !== 16) {
    return response.status(HTTP_UNAUTHORIZED)
  .json({ message: 'Token inválido' }); 
  }
  next();
};

const validations = [
  validateToken,
  validateNameAge,
  validateTalks,
  validateRates,
  validateWachedAt,
];

module.exports = validations;
