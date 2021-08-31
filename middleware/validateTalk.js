const validateTalk = (request, response, next) => {
  const { talk } = request.body;

  if (!talk || talk === '') {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const validateWatchedAt = (request, response, next) => {
  const { watchedAt } = request.body.talk;
  const re = /^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$/;

  if (!watchedAt || watchedAt === '') {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (!re.test(String(watchedAt).toLowerCase())) {
    return response
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateRate = (request, response, next) => {
  const { rate } = request.body.talk;

  if (rate < 1 || rate > 5) {
    return response
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!rate || rate === '') {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

module.exports = { validateWatchedAt, validateRate, validateTalk };
