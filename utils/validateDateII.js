const { BAD_REQUEST } = require('./httpStatus');

const validateDateTwice = (req, res, next) => {
  const { talk } = req.body;

   if (!talk.watchedAt || !talk.watchedAt === '' || talk.rate === undefined) {
    return res.status(BAD_REQUEST).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  next();
};

module.exports = validateDateTwice;