const validateToken = (req, res, next) => {
  const { token } = req.headers;
  if (token.length < 17) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

function EmailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const valid = EmailIsValid(email);

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  
  if (!valid) {
    return res.status(404).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === ' ') {
    res.status().json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = { validateToken, validateEmail, validatePassword };
