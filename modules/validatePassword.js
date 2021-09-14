module.exports = (password) => {
  if (!password) {
    return { message: 'O campo "password" é obrigatório' };
  }
  if (password.toString().length < 6) {
    return { message: 'O "password" deve ter pelo menos 6 caracteres' };
  }
};
