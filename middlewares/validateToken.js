module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({
      message: 'Token não encontrado',
    });
  }
  if (authorization.toString().length < 16) {
    return res.status(401).send({ 
      message: 'Token inválido',
    });
  }
  next();
};
