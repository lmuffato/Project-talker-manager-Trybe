// const HTTP_OK_STATUS = 200;
// const HTTP_NOTFOUND_STATUS = 404;
// const HTTP_NOTOK_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    res.status(HTTP_UNAUTHORIZED_STATUS)
      .json({ message: 'Token inválido' });
  }

  next();
};

module.exports = {
  validateToken,
};
