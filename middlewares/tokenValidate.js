module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  const tokenRegex = /^[a-zA-Z0-9]{12}$/;
  const isValid = tokenRegex.test(token);

  if (!token) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  if (!isValid) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }

  next();
};
