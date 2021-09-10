const BAD_REQUEST = 400;

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  if (!email || email === '') {
    return res.status(BAD_REQUEST)
      .json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailRegex.test(email)) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const passwordRegex = new RegExp(/[\w\D]{6}/g);

  if (!password || password === '') {
    return res.status(BAD_REQUEST)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (!passwordRegex.test(password)) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = {
  validateEmail,
  validatePassword,
};
