const rateTalker = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (rate < 1 || rate > 5) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }  

  next();
};

module.exports = rateTalker;