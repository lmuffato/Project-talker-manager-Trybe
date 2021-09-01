const INVALID_DATE = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };

const validateDate = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const regex = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[0-2])[/]\d{4}$/;
  const isValidDate = regex.test(watchedAt);

  if (!isValidDate) return res.status(400).json(INVALID_DATE);

  next();
};

module.exports = { validateDate };

// https://regexland.com/regex-dates/