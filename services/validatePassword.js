const validatePassword = (password) => {
  if (!password || !password.length) {
    return { status: 400, message: 'O campo "password" é obrigatório' };
  }
  if (password.length < 6) {
    return { status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' };
  }
  return { ok: true };
};

module.exports = validatePassword;
