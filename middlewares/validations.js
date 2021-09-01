function validateEmail(req, res, next) {
  if (req.body === undefined) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const { email } = req.body;
  if (email === undefined) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const validateEmailRegex = RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  if (!validateEmailRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}

function validatePassword(req, res, next) {
  if (req.body === undefined) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  const { password } = req.body;
  if (password === undefined) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length <= 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

module.exports = { validateEmail, validatePassword };