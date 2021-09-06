module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    res.status(401).json({ message: 'Token inválido' });
  }
  next();
};