const HTTP_BAD_REQUEST_STATUS = 400;

const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  
  if (!password || password === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O campo "password" é obrigatório' },
    );
  }

  if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O "password" deve ter pelo menos 6 caracteres' },
    );
  }

  next();
};

module.exports = passwordValidation;
