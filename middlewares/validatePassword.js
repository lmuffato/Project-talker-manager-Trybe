const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const regexValPass = /^.{6,}$/;

  if (!password || password.length === 0) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  
  if (!regexValPass.test(password)) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = validatePassword;