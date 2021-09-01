/* Source: https://github.com/tryber/sd-09-project-talker-manager/tree/luizfrodrigues-project-talker-manager */
const verifyDate = (req, res, next) => {
  const checkDate = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g;
  if (!checkDate.test(req.body.talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = verifyDate;