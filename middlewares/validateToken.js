const FAIL_STATUS = 401;

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(FAIL_STATUS).json({ message: 'Token não encontrado' });
  }
  if (authorization.length < 16) {
    return res.status(FAIL_STATUS).json({ message: 'Token inválido' });
  }
  next();  
};

module.exports = validateToken;