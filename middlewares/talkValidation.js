// Verifica se o campo 'date' foi enviado vazio
const emptyTalk = (talk) => {
  if (!talk || talk === '' || talk === null) { return true; }
  return false;
};

// Middleware para validação do objeto talk
const talkValidation = (request, response, next) => {
  const { talk } = request.body;
  try {
    if (emptyTalk(talk)) {
      throw new Error('O campo "talk" é obrigatório e "watchedAt" e "talk" não podem ser vazios');
    }
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
  next();
};

module.exports = { talkValidation };
