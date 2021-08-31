// Referencia: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const status = require('../status');

const validateEmail = (email) => {
  const isEmpty = email === undefined || !email.length;
  
  if (isEmpty) return { status: status.bad, message: 'O campo "email" é obrigatório' };
  
  const emailRegEx = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const isValid = emailRegEx.test(String(email).toLowerCase());
  
  if (!isValid) { 
    return { status: status.bad, message: 'O "email" deve ter o formato "email@email.com"' }; 
  }
};

const validatePassword = (password) => {
  const isEmpty = password === undefined || !password.length;
  
  if (isEmpty) return { status: status.bad, message: 'O campo "password" é obrigatório' };
  
  const minLength = 6;
  const isValid = password.length >= minLength;

  if (!isValid) { 
    return { status: status.bad, message: 'O "password" deve ter pelo menos 6 caracteres' }; 
  }
};

const validateLogin = (user) => {
  const isEmailWrong = validateEmail(user.email);
  const isPasswordWrong = validatePassword(user.password);

  if (!isEmailWrong && !isPasswordWrong) return { status: status.ok };
  
  return isEmailWrong || isPasswordWrong;
};

module.exports = validateLogin;
