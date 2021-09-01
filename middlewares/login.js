const randonCode = require('../services/randonCode');

function validaEmail(req, res, next) {
  /* regex de validação de email adquirido do site abaixo:
  https://stackoverflow.com/questions/61830906/regular-expression-s-s-in-javascript-not-working */
  const emailRegex = /\S+@\S+\.\S+/;

  const { email } = req.body;
  if (!email || email === '') {
     return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }
  next();
}

function validaPassword(req, res, next) {
  const { password } = req.body;
  if (password === undefined || password === '') {
     return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
  next();
}

function geraToken(_req, res) {
  const token = randonCode();
  return res.status(200).json({ token });
}

module.exports = {
  geraToken,
  validaEmail,
  validaPassword,
};
