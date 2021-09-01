const { StatusCodes } = require('http-status-codes');

module.exports = (req, res, next) => {
  const { email } = req.body;
  const pattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi; // *https://regexr.com/2ri2c *//
  const invalid = 'O "email" deve ter o formato "email@email.com"';
  const noEmail = 'O campo "email" é obrigatório';
  if (!email || email === '') return res.status(StatusCodes.BAD_REQUEST).json({ message: noEmail });
  if (!email.match(pattern)) return res.status(StatusCodes.BAD_REQUEST).json({ message: invalid });
next();
};
