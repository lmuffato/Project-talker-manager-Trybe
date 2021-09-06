const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email,
    );
  if (!mailformat) {
    res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
      return;
  }
  next();
};

module.exports = validateEmail;