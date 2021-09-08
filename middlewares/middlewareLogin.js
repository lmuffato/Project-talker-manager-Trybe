const crypto = require('crypto');

const validarEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

const middlewareLogin = (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (!validarEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  const token = generateToken();
  req.headers.authorization = token;

  return res.status(200).json({ token });
};

module.exports = middlewareLogin; 
