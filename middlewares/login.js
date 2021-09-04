// 3 - Crie o endpoint POST /login

const { validateEmail, validatePassword } = require('../services');

const login = (req, res, next) => {
  const { password, email } = req.body;
  const validEmail = validateEmail(email);
  const validPassword = validatePassword(password);

  if (validEmail !== '') {
    return res.status(validEmail.status).json({ message: validEmail.message });
  }

  if (validPassword !== '') {
    return res.status(validPassword.status).json({ message: validPassword.message });
  }

  next();
};

module.exports = login;
