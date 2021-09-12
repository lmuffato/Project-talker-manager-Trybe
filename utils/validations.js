const { 
  HTTP_BAD_REQUEST,
  HTTP_UNAUTHORIZED,
} = require('./serverStatus');

function isEmailValid(req, res, next) {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  if (!email) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  
  if (!isValid) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
}

function isPasswordValid(req, res, next) {
  const { password } = req.body;

  if (!password) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
}

function isTokenValid(req, res, next) {
  const { token } = req.headers;

  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      message: 'Token não encontrado',
    });
  }

  if (token !== '7mqaVRXJSp886CGr') {
    return res.status(HTTP_UNAUTHORIZED).json({
      message: 'Token inválido',
    });
  }

  next();
}

module.exports = {
  isEmailValid,
  isPasswordValid,
  isTokenValid,
};