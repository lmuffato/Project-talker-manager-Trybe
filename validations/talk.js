const { StatusCodes } = require('http-status-codes');

module.exports = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
const checks = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
  return res.status(StatusCodes.BAD_REQUEST).json({ message: checks });
}
  next();
};
