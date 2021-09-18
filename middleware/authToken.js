const HTTP_UNAUTHORIZED_STATUS = 401;

const authToken = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = authToken;
