function validateEmail(req, res) {
  const { email } = req.body;
  const regex = /^[\w.]+@[a-z]+\.\w{3}$/g;
  const validEmail = regex.test(email);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
}

module.exports = validateEmail;
