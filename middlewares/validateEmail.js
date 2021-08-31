const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;
  const isValidMail = regex.test(email);
  if (!email || email === '') {
      return res.status(400).json({
        message: 'O campo "email" é obrigatório',
      });
  }

  if (!isValidMail) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
};

module.exports = { validateEmail };

// reference: https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
