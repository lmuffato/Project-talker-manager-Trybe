const validateToken = (req, res, next) => {
  const { Authorization } = req.headers;
  const magicNum = 16;
  if (!Authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (Authorization.length !== magicNum) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
  next();
};

module.exports = validateToken;
