const randToken = require('rand-token');

const generateToken = () => randToken.generate(16);

// Ref para o random token: https://github.com/tryber/sd-010-a-project-talker-manager/pull/72/files

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailFormat = /\S+@\S+\.\S+/;

  if (!email || email === '') {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }

  if (emailFormat.test(email) === false) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

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

  next();
};

const postToken = (_req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
};

module.exports = {
  validateEmail,
  validatePassword,
  postToken,
};