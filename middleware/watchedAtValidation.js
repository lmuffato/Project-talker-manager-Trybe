const watchedAtValidation = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const regex = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/g;

  if (!watchedAt || watchedAt === '') {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!regex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = watchedAtValidation;
