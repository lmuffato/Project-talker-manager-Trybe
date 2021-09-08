const validate = require('validate.js');
const status = require('../status');

const constraints = {
  email: {
    presence: { message: '^O campo "email" é obrigatório' },
    email: { message: '^O "email" deve ter o formato "email@email.com"' },
  },
  password: {
    presence: { message: '^O campo "password" é obrigatório' },
    length: {
      minimum: 6,
      message: '^O "password" deve ter pelo menos 6 caracteres',
    },
  },
};

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;

  const validation = validate({ email, password }, constraints);

  if (validation) {
    const [[validationMessage]] = Object.values(validation);

    return res.status(status.badRequest).json({ message: validationMessage });
  }

  next();
};

module.exports = loginValidation;
