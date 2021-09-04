const createToken = require('../utils/createToken');
const { HTTP_OK_STATUS, BAD_REQUEST } = require('../utils/statusHttp');

const login = (req, res) => {
  const { email, password } = req.body;
  const emailValidated = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  if (!email) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailValidated) {
   return res
     .status(BAD_REQUEST).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res
      .status(BAD_REQUEST).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(HTTP_OK_STATUS).json({ token: createToken() });
};

module.exports = login;
