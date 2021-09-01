const TALK_FIELD_IS_REQUIRED = {
  message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || (!talk.rate && talk.rate !== 0) || !talk.watchedAt) {
    return res.status(400).json(TALK_FIELD_IS_REQUIRED);
  }

  next();
};

module.exports = { validateTalk };