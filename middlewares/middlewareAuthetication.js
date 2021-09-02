const middlewareAuthentication = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const validHeaderRegex = new RegExp('0-9a-z', 'i');

  if (authorization.length < 12 || validHeaderRegex.test(authorization)) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = middlewareAuthentication;