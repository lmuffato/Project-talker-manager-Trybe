const { StatusCodes } = require('http-status-codes');

module.exports = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(StatusCodes.BAD_REQUEST).json(
      { message: 'O campo "password" é obrigatório' },
);
  }
  next();
};
