const randonCode = require('../services/randonCode');

function geraToken(_req, res) {
  const token = randonCode();
  res.status(200).json({ token });
}

/* regex de validação de email adquirido do site abaixo:
https://stackoverflow.com/questions/61830906/regular-expression-s-s-in-javascript-not-working */
const emailRegex = /\S+@\S+\.\S+/;

function validaEmail(req, res) {
  const { email } = req.body;
  if (email === undefined) {
     return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }
}

function validaPassword(req, res) {
  const { password } = req.body;
  if (password === undefined) {
     return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password >= 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
}

module.exports = {
  geraToken,
  validaEmail,
  validaPassword,
};
