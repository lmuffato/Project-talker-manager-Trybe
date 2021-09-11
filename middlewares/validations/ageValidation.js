// Verifica se o campo 'age' foi enviado vazio
const emptyAge = (age) => { // Se o campo age for vazio, retorna true
  if (!age || age === '' || age === null) { return true; }
  return false;
};

// Verifica se a idade enviada está em um formato válido
const validAge = (age) => (age >= 18);

// Middleware para validação da idade
const ageValidation = (request, response, next) => {
  const { age } = request.body;
  try {
    if (emptyAge(age)) throw new Error('O campo "age" é obrigatório');
    if (!validAge(age)) throw new Error('A pessoa palestrante deve ser maior de idade');
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
  next();
};

module.exports = { ageValidation };
