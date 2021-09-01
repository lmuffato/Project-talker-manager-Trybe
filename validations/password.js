const { StatusCodes } = require('http-status-codes');

module.exports = (req, res, next) => {
  const { password } = req.body;
  const noP = 'O campo "password" é obrigatório';
  const invalidP = 'O "password" deve ter pelo menos 6 caracteres';
if (!password || password === '') return res.status(StatusCodes.BAD_REQUEST).json({ message: noP });
if (password.length < 6) return res.status(StatusCodes.BAD_REQUEST).json({ message: invalidP });
next();
};
