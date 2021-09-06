const verifyEmail = async (req, res, next) => {
  const { email } = req.body;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateEmail = regex.test(email);

  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }

  if (!validateEmail) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"', 
    });
  }

  next();
};

const verifyPassword = async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length <= 5) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
};

module.exports = { verifyEmail, verifyPassword };