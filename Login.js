const crypto = require('crypto');

const STATUS_OK = 200;
const STATUS_BAD_REQ = 400;

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

function login(req, res) {
  const { email, password } = req.body;
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!email) { 
    return res.status(STATUS_BAD_REQ).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!email.match(regex)) {
    return res.status(STATUS_BAD_REQ)
    .send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(STATUS_BAD_REQ)
      .send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(STATUS_BAD_REQ)
      .send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.status(STATUS_OK).json({ token: generateToken() });
}

module.exports = login;

// referencia match: https://metring.com.br/expressoes-regulares-em-javascript
// referencia crypto: https://github.com/tryber/sd-09-project-talker-manager/pull/84/files
