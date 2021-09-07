function validateWatchedAt(req, res, next) {
  try {
    const { talk: { watchedAt } } = req.body;
    if (!watchedAt) {
      return res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
    }
    // fonte da expressão regex: https://www.regextester.com/99555
    if (!/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(watchedAt)) {
      return res.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
    }
    next();
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = validateWatchedAt;
