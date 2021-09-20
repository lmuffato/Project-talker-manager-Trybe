// regex https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
// crypto https://www.codegrepper.com/code-examples/javascript/generate+random+string+javascript+stackoverflow
const crypto = require('crypto');

const passwordLogin = (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } return res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
  };

const emailLogin = (req, res, next) => {
  const { email } = req.body;

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValidated = regexEmail.test(email);  

  if (!email) {
  return res.status(400).send({ message: 'O campo "email" é obrigatório' });
} if (!isEmailValidated) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' }); 
    } 

  next();
  };

module.exports = { emailLogin, passwordLogin };