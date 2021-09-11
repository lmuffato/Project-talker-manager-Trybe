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

// Middleware para validação de password
const passwordValidation = (request, response, next) => {
  const { password } = request.body;
  try {
    if (emptyPassword(password)) { throw new Error('O campo "password" é obrigatório'); }
    if (!validPassword(password)) {
      throw new Error('O "password" deve ter pelo menos 6 caracteres');
    }
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
  next();
};

module.exports = { passwordValidation };
