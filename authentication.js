const authentication = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
        return res.status(401).send({ message: 'Token não encontrado' });
  } if (authorization.length !== 16) return res.status(401).send({ message: 'Token inválido' });

  next();
};

module.exports = authentication;