const BAD_REQUEST = 400;

const validateEmailMiddleware = (req, res, next) => {
  const { email } = req.body;
  // https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression onde peguei regex
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript onde aprendi a usar o .test
  if (email === '' || email === undefined) { 
    return res.status(BAD_REQUEST)
    .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(BAD_REQUEST)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

module.exports = validateEmailMiddleware;