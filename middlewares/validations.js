const STATUS = require('../status/http_status');

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    res.status(STATUS.ERROR.BAD_REQUEST).send({
      message: 'O campo "email" é obrigatório',
    });
  } else if (!validation.test(email)) {
    res.status(STATUS.ERROR.BAD_REQUEST).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    res.status(STATUS.ERROR.BAD_REQUEST).send({
      message: 'O campo "password" é obrigatório',
    });
  } else if (password < 6) {
    res.status(STATUS.ERROR.BAD_REQUEST).send({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

module.exports = {
    validateEmail,
    validatePassword,
};