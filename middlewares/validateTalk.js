function validateTalk(req, res, next) {
  try {
    const { talk } = req.body;
    if (!talk || !talk.rate || !talk.watchedAt) {
      return res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
    }
    next();
  } catch (err) {
    return console.error('caiu no catch: ', err.message);
  }
}

module.exports = validateTalk;
