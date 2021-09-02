const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const magicNum = 5;
  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length <= magicNum) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

module.exports = validatePassword;
