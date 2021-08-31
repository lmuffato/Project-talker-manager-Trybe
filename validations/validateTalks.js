const HTTP_BAD_REQUEST = 400;

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

module.exports = { validateTalks, validateRates, validateWachedAt };