// Verifica se o campo 'email' foi enviado vazio
const emptyEmail = (email) => {
  if (!email || email === '' || email === null) { return true; }
  return false;
};

// Verifica se o email enviado está em um formato válido
const validEmail = (email) => {
  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const emailIsValid = regex.test(email);
  return emailIsValid;
};

// Verifica se o campo 'password' foi enviado vazio
const emptyPassword = (password) => {
  if (!password || password === '' || password === null) { return true; }
  return false;
};

// Verifica se o password enviado tem mais de 6 caracteres
const validPassword = (password) => {
  if (password.length >= 6) { return true; }
  return false;
};

module.exports = { emptyEmail, validEmail, emptyPassword, validPassword };
