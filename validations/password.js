const { StatusCodes } = require('http-status-codes');

module.exports = async (req, res, next) => {
  const { password } = req.body;
  const validPassword = password.length > 5;
  const noP = 'O campo "password" é obrigatório';
  const invalidPassword = 'O "password" deve ter pelo menos 6 caracteres';
if (!password || password === '') return res.status(StatusCodes.BAD_REQUEST).json({ message: noP });
if (!validPassword) return res.status(StatusCodes.BAD_REQUEST).json({ message: invalidPassword });
  res.status(StatusCodes.OK).json();
next();
};
