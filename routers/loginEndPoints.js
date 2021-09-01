const { Router } = require('express');

const router = Router();

const fs = require('fs').promises;
const crypto = require('crypto');

async function createToken(req, res) {
  const { email } = req.body;
  const token = crypto.randomBytes(8).toString('hex');
  const logedUsers = await fs.readFile('../logedUsers.json', 'utf8')
    .then((response) => JSON.parse(response))
    .then((fullList) => fullList.filter((user) => user.email !== email))
    .catch((err) => console.log(err.message));
  const newLog = { email, token };
  logedUsers.push(newLog);
  await fs.writeFile('../logedUsers.json', JSON.stringify(logedUsers))
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
  const { password } = res.body;
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
