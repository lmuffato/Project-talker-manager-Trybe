function validate(data) {
  const validateEmail = /^\S+@\S+\.\S+$/;

  if (!data.email) return { message: 'O campo "email" é obrigatório' };

  if (!data.password) return { message: 'O campo "password" é obrigatório' };

  const validEmail = validateEmail.test(data.email);

  if (!validEmail) return { message: 'O "email" deve ter o formato "email@email.com"' };

  if (data.password.length < 6) return { message: 'O "password" deve ter pelo menos 6 caracteres' };

  return null;
}

module.exports = validate;