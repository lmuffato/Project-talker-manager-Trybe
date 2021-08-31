module.exports = (req, res, next) => {
  const HTTP_NOK_STATUS = 400;
  const MIN_PASSWORD = 5;
  const { password } = req.body;

  if (!password || !password.length) {
    return res.status(HTTP_NOK_STATUS).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length <= MIN_PASSWORD) {
    return res.status(HTTP_NOK_STATUS).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};