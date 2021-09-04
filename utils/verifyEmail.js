const { BAD_REQUEST } = require('./httpStatus');

const verifyEmail = (req, res, next) => {
  const { email } = req.body;

  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

  const validEmail = emailRegex.test(email);
  if (!email) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validEmail) {
    return res.status(BAD_REQUEST).json({
      message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

module.exports = verifyEmail;
