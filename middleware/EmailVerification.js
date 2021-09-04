const emailVerification = (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!regex.test(String(email).toLowerCase())) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

module.exports = emailVerification;