const validateEmail = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;

  if (email === undefined || email.length === 0) {
    return { status: 400, message: 'O campo "email" é obrigatório' };
  }

  if (!regex.test(email)) {
    return { status: 400, message: 'O "email" deve ter o formato "email@email.com"' };
  }

  return '';
};

module.exports = validateEmail;
