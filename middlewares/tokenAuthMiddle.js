const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const magicNum = 16;
  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length !== magicNum) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
  next();
};

module.exports = validateToken;
