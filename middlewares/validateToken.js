const TOKEN_NOT_FOUND = { message: 'Token não encontrado' };
const INVALID_TOKEN = { message: 'Token inválido' };

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json(TOKEN_NOT_FOUND);

  if (authorization.length !== 16) return res.status(401).json(INVALID_TOKEN);

  next();
};

module.exports = { validateToken };