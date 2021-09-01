/* eslint-disable max-lines-per-function */
function validateRate(rate) {
  return (+rate < 1 || +rate > 5);
}

// eslint-disable-next-line max-lines-per-function
// eslint-disable-next-line complexity
const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const regx = /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;

  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (validateRate(talk.rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!regx.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = validateTalk;