// 3 - Crie o endpoint POST /login

const { validateEmail, validatePassword, generateToken } = require('../services');

const login = (req, res) => {
  const { password, email } = req.body;
  const token = generateToken();
  const isValidEmail = validateEmail(email);
  const IsValidPassword = validatePassword(password);

  if (!isValidEmail.ok) {
    return res.status(isValidEmail.status).json({ message: isValidEmail.message });
  }

  if (!IsValidPassword.ok) {
    return res.status(IsValidPassword.status).json({ message: IsValidPassword.message });
  }

  if (isValidEmail.ok && IsValidPassword.ok) {
    return res.status(200).json({ token });
  }
};

module.exports = login;