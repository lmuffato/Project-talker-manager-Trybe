const { generateToken } = require('../promisesFs.js');

const HTTP_OK_STATUS = 200;
const FAIL_STATUS = 400;

const login = (req, res) => {
  const { email, password } = req.body;
  const emailValidated = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  if (!email) {
    return res.status(FAIL_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailValidated) {
   return res
     .status(FAIL_STATUS).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(FAIL_STATUS).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res
      .status(FAIL_STATUS).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(HTTP_OK_STATUS).json({ token: generateToken() });
};

module.exports = login;

// http :3000/login {email="email@email.com",password=123456}
