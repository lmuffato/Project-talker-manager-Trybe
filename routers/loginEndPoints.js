const { Router } = require('express');

const router = Router();

const fsP = require('fs').promises;
const fs = require('fs');
const crypto = require('crypto');

function readLogedUsers(email) {
  const fileLogers = JSON.parse(fs.readFileSync('./logedUsers.json', 'utf8'));
  const logedUsers = fileLogers.filter((user) => user.email !== email);
  return logedUsers;
}

function createToken(req, res) {
  const { email } = req.body;
  const token = crypto.randomBytes(8).toString('hex');
  const logedUsers = readLogedUsers(email);
  const newLog = { email, token };
  logedUsers.push(newLog);
  console.log(logedUsers);
  fsP.writeFile('./logedUsers.json', JSON.stringify(logedUsers))
    .then(() => console.log('token registrado com sucesso'))
    .catch((err) => console.log(err.message));
  return res.status(200).json({ token });
}

function validateEmail(req, res, next) {
  if (req.body === undefined) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const { email } = req.body;
  if (email === undefined) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const validateEmailRegex = RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  if (!validateEmailRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}

function validatePassword(req, res, next) {
  if (req.body === undefined) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  const { password } = req.body;
  if (password === undefined) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length <= 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

router.post('/', validateEmail, validatePassword, createToken);

module.exports = router;
