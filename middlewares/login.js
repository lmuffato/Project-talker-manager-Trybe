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
