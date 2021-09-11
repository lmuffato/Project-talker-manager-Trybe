// Verifica se o campo 'name' foi enviado vazio
const emptyName = (name) => {
  if (!name || name === '' || name === null) { return true; }
  return false;
};

// Verifica se o nome enviado tem mais de 3 caracteres e está em um formato válido
const validName = (name) => {
  if (name.length >= 3 && typeof name === 'string') { return true; }
  return false;
};

// Middleware para validação do nome
const nameValidation = (request, response, next) => {
  const { name } = request.body;
  try {
    if (emptyName(name)) {
      throw new Error('O campo "name" é obrigatório');
    }
    if (!validName(name)) {
      throw new Error('O "name" deve ter pelo menos 3 caracteres');
    }
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
  next();
};

module.exports = { nameValidation };
