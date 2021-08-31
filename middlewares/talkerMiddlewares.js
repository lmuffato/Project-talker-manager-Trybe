// const HTTP_OK_STATUS = 200;
// const HTTP_NOTFOUND_STATUS = 404;
const HTTP_NOTOK_STATUS = 400;
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

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === ' ') {
    res.status(HTTP_NOTOK_STATUS)
      .json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    res.status(HTTP_NOTOK_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

module.exports = {
  validateToken,
  validateName,
};
