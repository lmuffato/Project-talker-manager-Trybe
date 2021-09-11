// Verifica se o campo 'email' foi enviado vazio
const emptyEmail = (email) => { // Se o campo email for vazio, retorna true
  if (!email || email === '' || email === null) { return true; }
  return false;
};

// Verifica se o email enviado está em um formato válido
const validEmail = (email) => { // Se o email for válido, retorna true
  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return regex.test(email);
};

// Middleware para validação de email
const emailValidation = (request, response, next) => {
  const { email } = request.body;
  try {
    if (emptyEmail(email)) throw new Error('O campo "email" é obrigatório');
    if (!validEmail(email)) throw new Error('O "email" deve ter o formato "email@email.com"');
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
  next();
};

module.exports = { emailValidation };
