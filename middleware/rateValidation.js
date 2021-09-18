const HTTP_BAD_REQUEST_STATUS = 400;

const rateValidation = (req, res, next) => {
  const { rate } = req.body.talk;

  if (!rate) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  if (rate < 1 || rate > 5) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
    );
  }

  next();
};

module.exports = rateValidation;
