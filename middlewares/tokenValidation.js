const validate = require('validate.js');
const readFile = require('../utils/readFile');
const status = require('../status');

const constraints = {
  length: { 
    is: 16,
    message: 'Token inválido',
  },
  presence: { message: 'Token não encontrado' },
};

exports.isTokenValid = (req, res, next) => {
  const { authorization } = req.headers;

  const validation = validate.single(authorization, constraints);
  
  if (validation) {
    const [validationMessage] = Object.values(validation);
    return res.status(status.unauthorized).json({ message: validationMessage });
  }

  next();
};

exports.tokenExists = (req, res, next) => {
  const { authorization } = req.headers;
  const foundedUser = readFile('user.json').find((u) => u.token === authorization);

  if (!foundedUser) {
    return res.status(status.unauthorized).json({ message: 'Token não encontrado' });
  }
  next();
};
