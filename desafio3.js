const crypto = require('crypto');

function validateEmail(email, res) {
  if (!email || email === '') {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  } 
  
  if (!(email.includes('@')) || !(email.includes('.com'))) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  return false;
}

function validatePassword(password, res) {
  if (!password || password === '') {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
}

const generateToken = () => crypto.randomBytes(8).toString('hex');
// Dica do Vinicius Rodrigues :)

const login = (req, res) => {
  const { email, password } = req.body;
  const token = generateToken();

  if (validateEmail(email, res)) return;
  if (validatePassword(password, res)) return;

  res.status(200).json({
    token,
  });
};

module.exports = login;