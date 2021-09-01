const { Router } = require('express');
const UIDGenerator = require('uid-generator');

const router = Router();

function emailValidation(req, res, next) {
  const { email } = req.body;
  const regexValidation = /^\w+@\w+\.com$/; // Regex feito com base no projeto TrybeWallet. src=https://github.com/tryber/sd-010-a-project-trybewallet/pull/21/files 
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (regexValidation.test(email) === false) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  console.log('Passou pela validação de email');
  next();
}

function passwordValidation(req, res, next) {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  console.log('Passou pela validação de senha');
  next();
}

function tokenGenerator(_req, res) {
  const newToken = new UIDGenerator(UIDGenerator.BASE16); // Src = https://www.npmjs.com/package/uid-generator
  // console.log(newToken);
  console.log('Gerou token')
  return res.status(200).json({ token: newToken.baseEncoding });
}

router.post('/', emailValidation, passwordValidation, tokenGenerator, (_req, res) => {
  res.end();
});

module.exports = router;