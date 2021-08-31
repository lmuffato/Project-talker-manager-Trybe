// Referencia: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const status = require('../status');

const validateEmail = (email) => {
  const emailRegEx = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const isEmpty = email === undefined || !email.length;
  const isValid = emailRegEx.test(String(email).toLowerCase());

  if (isEmpty) return { status: status.bad, message: 'O campo "email" é obrigatório' };
  if (!isValid) { 
    return { status: status.bad, message: 'O "email" deve ter o formato "email@email.com"' }; 
  }
};

const validatePassword = (password) => {
  const minLength = 6;
  const isEmpty = password === undefined || !password.length;
  const isValid = password.length >= minLength;

  if (isEmpty) return { status: status.bad, message: 'O campo "password" é obrigatório' };

  if (!isValid) { 
    return { status: status.bad, message: 'O "password" deve ter pelo menos 6 caracteres' }; 
  }
};

const validateLogin = (email, password) => {
  const checkEmail = validateEmail(email);
  const checkPassword = validatePassword(password);

  if (!checkEmail && !checkPassword) return true;
  
  return checkEmail || checkPassword;
};

module.exports = validateLogin;
