const { StatusCodes } = require('http-status-codes');

module.exports = (req, res, next) => {
  const { name } = req.body;
  if (!name || name.length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    const invalidName = 'O "name" deve ter pelo menos 3 caracteres';
    return res.status(StatusCodes.BAD_REQUEST).json({ message: invalidName });
  }
next();
};