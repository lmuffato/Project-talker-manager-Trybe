const validPassword = (password, req, res) => {
  console.log(password);
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
  return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

const validEmail = (req, res) => {
  const { email, password } = req.headers;
  console.log(email);
  const re = /\S+@\S+\.\S+/;
  const regex = re.test(email);
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (regex === false) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  validPassword(password, req, res);
};

module.exports = validEmail;