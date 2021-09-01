const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;

function createToken(_req, res, next) {
  const random = () => Math.random().toString(36).substr(2);
  const token = (random() + random()).substring(0, 16);
  
  res.staus(HTTP_OK_STATUS).json({ token });
  next();
}

function validateEmail(req, res, next) {
  const { email } = req.body;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || email === '') {
    return res.staus(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!email.match(regex)) {
    return res.staus(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;

  if (!password || password === '') {
    return res.staus(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.staus(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

module.exports = { createToken, validateEmail, validatePassword };
