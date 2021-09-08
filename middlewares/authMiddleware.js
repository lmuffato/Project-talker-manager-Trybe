const authToken = (req, res, next) => {
  const { token } = req.headers;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token !== '7mqaVRXJSp886CGr') {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

module.exports = authToken;