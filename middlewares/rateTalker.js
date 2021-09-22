const { HTTP_BAD_REQUEST } = require('../utils/statusHttp');

const rateTalker = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (rate < 1 || rate > 5) {
    return res.status(HTTP_BAD_REQUEST).send({
      message: 'O campo "rate" deve ser inteiro de 1 à 5',
    });
  }

  next();
};

module.exports = {
  rateTalker,
};