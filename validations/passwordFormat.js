const { StatusCodes } = require('http-status-codes');

module.exports = (req, res, next) => {
  const { password } = req.body;
  const senhaValida = /^.{6,}$/g;
  if (!senhaValida.test(password)) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      { message: 'O "password" deve ter pelo menos 6 caracteres' },
);
  }
  next();
};
