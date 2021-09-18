const HTTP_BAD_REQUEST_STATUS = 400;

const talkValidation = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  if ([talk.watchedAt, talk.rate].includes(undefined)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  next();
};

module.exports = talkValidation;
