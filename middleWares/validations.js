const BAD_REQUEST = 400;

const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^\w+@\w+\.com$/g;

  if (!email || email === '') {
    return res.status(BAD_REQUEST)
    .json({ message: 'O campo "email" é obrigatório' });
  }

  if (!regexEmail.test(email)) {
    return res.status(BAD_REQUEST)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  const regexPassword = /^.{6,}$/g;

  if (!password || password === '') {
    return res.status(BAD_REQUEST)
    .json({ message: 'O campo "password" é obrigatório' });
  }

  if (!regexPassword.test(password)) {
    return res.status(BAD_REQUEST)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = {
  isValidEmail,
  isValidPassword,
};
