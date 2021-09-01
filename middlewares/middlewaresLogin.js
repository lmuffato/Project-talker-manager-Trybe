const HTTP_BAD_REQUEST_STATUS = 400;
// const HTTP_OK_STATUS = 200;

function createToken(req, _res, next) {
  const random = () => Math.random().toString(36).substr(2);
  const token = (random() + random()).substring(0, 16);
  
  req.token = token;
  next();
}

function validateEmail(req, res, next) {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;
  
  if (!email || email === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!(email.match(regex))) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  // res.staus(HTTP_OK_STATUS);
  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  // res.staus(HTTP_OK_STATUS);
  next();
}

module.exports = { createToken, validateEmail, validatePassword };
