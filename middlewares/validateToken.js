const validateToken = (req, res, next) => {
  const { token } = req.headers;
  const regexAlphanumeric = /^[a-zA-Z0-9-_!@#$%^&*]{16,16}$/;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (!regexAlphanumeric.test(token)) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = validateToken;