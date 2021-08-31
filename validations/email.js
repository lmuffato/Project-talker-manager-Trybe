const { StatusCodes } = require('http-status-codes');

module.exports = async (req, res, next) => {
  const { email } = req.body;
  const emailPattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi; // *https://regexr.com/2ri2c *//
  const validEmail = email.match(emailPattern);
  const invalidEmail = 'O "email" deve ter o formato "email@email.com"';
  const noEmail = 'O campo "email" é obrigatório';
  if (!validEmail) return res.status(StatusCodes.BAD_REQUEST).json({ message: invalidEmail });
  if (!email || email === '') return res.status(StatusCodes.BAD_REQUEST).json({ message: noEmail });
  res.status(StatusCodes.OK).json();
next();
};
