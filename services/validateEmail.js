const validateEmail = (email) => {
  const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const Email = regex.test(email);
  if (!email || !email.length) {
    return { status: 400, message: 'O campo "email" é obrigatório' };
  }
  if (!Email) {
    return { status: 400, message: 'O "email" deve ter o formato "email@email.com"' };
  }
  return { ok: true };
};

module.exports = validateEmail;
