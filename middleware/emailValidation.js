const emailValidation = (req, res, next) => {
  const regex = /\S+@\S+\.\S+/;
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

module.exports = emailValidation;