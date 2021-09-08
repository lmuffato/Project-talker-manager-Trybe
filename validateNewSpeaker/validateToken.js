const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const regex = /^[\w]{16}/i;

  const isValid = regex.test(authorization);

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (!isValid) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = validateToken;