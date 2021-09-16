const HTTP_BAD_REQUEST_STATUS = 400;

const emailValidation = (req, res, next) => {
  const regexEmail = /\S+@\S+\.\S+/;
  const { email } = req.body;
  
  if (!email || email === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!regexEmail.test(email)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O "email" deve ter o formato "email@email.com"' },
    );
  }

  next();
};

module.exports = emailValidation;
