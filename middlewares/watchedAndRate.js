const { HTTP_BAD_REQUEST } = require('../utils/statusHttp');

const watchedAndRate = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || !talk.watchedAt || typeof talk.rate !== 'number') {
    return res.status(HTTP_BAD_REQUEST).send({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

module.exports = {
  watchedAndRate,
};