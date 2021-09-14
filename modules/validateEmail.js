module.exports = (email) => {
  const regexp = /\S+@\S+\.\S+/;
  const validateEmail = regexp.test(email);
  if (email === '' || !email) {
    return { message: 'O campo "email" é obrigatório' };
  }
  if (!validateEmail) {
    return { message: 'O "email" deve ter o formato "email@email.com"' };
  }
};
