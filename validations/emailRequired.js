// const { StatusCodes } = require('http-status-codes');

module.exports = (req, res, next) => {
  const { email } = req.body;
  if (!email || email === '') {
    return res.status(400).json(
      { message: 'O campo "email" é obrigatório' },
);
  }
  next();
};
