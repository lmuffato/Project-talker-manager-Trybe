const { getToken } = require('../model/authModel');

function validateEmail(req, res, next) {
  console.log('validateEmail chamada');
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  const emailRegex = /[a-z0-9]+@[a-z0-9]+(\.com)$/gi;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
}

function validatePassword(req, res, next) {
  console.log('validatePassword chamada');
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
}

async function validateToken(req, res, next) {
  console.log('validateToken chamada');
  const { token: currentToken } = await getToken();
  const { authorization: incomingToken } = req.headers;

  if (!currentToken || !incomingToken) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const validToken = incomingToken === currentToken;

  if (!validToken) return res.status(401).json({ message: 'Token inválido' });

  next();
}

module.exports = { validateEmail, validatePassword, validateToken };