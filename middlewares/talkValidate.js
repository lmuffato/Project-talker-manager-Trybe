const talkValidate = (req, res, next) => {
  const { talk } = req.body;
  // console.log(talk.rate);

  if (!talk || talk.watchedAt === undefined || talk.rate === undefined) {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const watchedAtValidate = (req, res, next) => {
  const {
    talk: { watchedAt },
  } = req.body;

  const regexData = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  if (!regexData.test(watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

const rateValidate = (req, res, next) => {
  const {
    talk: { rate },
  } = req.body;

  if (rate < 1 || rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

module.exports = { talkValidate, watchedAtValidate, rateValidate };
