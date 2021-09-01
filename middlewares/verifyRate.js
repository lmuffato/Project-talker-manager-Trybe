/* Source: https://github.com/tryber/sd-09-project-talker-manager/tree/luizfrodrigues-project-talker-manager */
const verifyRate = (req, res, next) => {
  if (Number.isInteger(req.body.talk.rate) 
  && req.body.talk.rate >= 1 && req.body.talk.rate <= 5) {
    return next();
  } 
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
};

module.exports = verifyRate;