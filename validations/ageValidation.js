const { StatusCodes } = require('http-status-codes');

module.exports = (req, res, next) => {
  const { age } = req.body;
  if (!age || Number.isNaN(age) || age === '') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'O campo "age" é obrigatório',
    });
  } if (age < 18) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }

  next();
};
