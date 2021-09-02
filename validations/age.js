const { StatusCodes } = require('http-status-codes');

module.exports = (req, res, next) => {
  const { age } = req.body;
  
  if (!age || Number.isNaN(age)) {  
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    const underAge = 'A pessoa palestrante deve ser maior de idade';
    return res.status(StatusCodes.BAD_REQUEST).json({ message: underAge });
  }
next();
};
