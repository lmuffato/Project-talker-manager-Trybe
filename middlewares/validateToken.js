const http = require('../helper/httpStatus');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(http.UNAUTHORIZED)
      .json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(http.UNAUTHORIZED)
      .json({ message: 'Token inválido' });
  }

  next();
};

module.exports = {
  validateToken,
};
