const watchedAtVerification = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (!(dateRegex.test(watchedAt))) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }  
  
  next();
};

module.exports = watchedAtVerification;