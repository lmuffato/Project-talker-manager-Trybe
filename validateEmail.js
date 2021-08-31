module.exports = (req, res, next) => {
  const HTTP_NOK_STATUS = 400;
  const { email } = req.body;

  if (!email || !email.length) {
    return res.status(HTTP_NOK_STATUS).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!email.match(/\S+@\S+\.\S+/)) {
    return res.status(HTTP_NOK_STATUS).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
 return next();
};
