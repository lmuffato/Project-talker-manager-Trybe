const { HTTP_BAD_REQUEST } = require('../utils/statusHttp');

const watchedTalker = (req, res, next) => {
  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  const { talk: { watchedAt } } = req.body;

  if (!dateRegex.test(watchedAt)) {
    return res.status(HTTP_BAD_REQUEST).send({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

module.exports = {
  watchedTalker,
};