const BAD_REQUEST = 400;

const validatePasswordMiddleware = (req, res, next) => {
  const { password } = req.body;
  if (password === '' || password === undefined) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = validatePasswordMiddleware;