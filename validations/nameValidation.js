const { StatusCodes } = require('http-status-codes');

module.exports = (req, res, next) => {
  const { name } = req.body;
  const nameValid = /^.{3,}$/g;
  if (!name || name === '' || name === undefined) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'O campo "name" é obrigatório',
    });
  } if (nameValid.test(name) === false) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};
