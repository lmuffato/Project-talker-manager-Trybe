// Verifica se o campo 'date' foi enviado vazio
const emptyRate = (rate) => {
  if (!rate || rate === '' || rate === null) { return true; }
  return false;
};

// Verifica se a data enviada está no formato dd/mm/aaaa.
const validRate = (rate) => ((Number.isInteger(rate) && rate <= 5 && rate >= 0));

// Middleware para validação da data
const rateValidation = (request, response, next) => {
  const { talk: { rate } } = request.body;
  try {
    if (emptyRate(rate)) {
      throw new Error('O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios');
    }
    if (!validRate(rate)) {
      throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
    }
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
  next();
};

module.exports = { rateValidation };
