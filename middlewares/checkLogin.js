const emailValidator = require('../utils/emailValidator');
const passwordValidator = require('../utils/passwordValidator');
const { encryptToString } = require('../utils/encryptScripts'); 

function emailValidation({ body: { email } }, response, next) {
  if (!email || email === '') {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailValidator(email)) {
    return response.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
}

function passwordValidation({ body: { password } }, response, next) {
  if (!password || password === '') {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' }); 
  }
  if (!passwordValidator(password)) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
  next();
}

function tokenDispatch(_request, response) {
  const sizeOfEncryption = 8;
  const token = encryptToString(sizeOfEncryption);
  return response.status(200).json({ token });
}

module.exports = {
  emailValidation,
  passwordValidation,
  tokenDispatch,
};
