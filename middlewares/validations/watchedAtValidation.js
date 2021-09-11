// Verifica se o campo 'date' foi enviado vazio
const emptyWatchedAt = (watchedAt) => {
  if (!watchedAt || watchedAt === '' || watchedAt === null) { return true; }
  return false;
};

// Verifica se a data enviada está no formato dd/mm/aaaa.
const validWatchedAt = (watchedAt) => {
  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  return dateRegex.test(watchedAt);
};

// Middleware para validação da data
const watchedAtValidation = (request, response, next) => {
  const { talk: { watchedAt } } = request.body;
  try {
    if (emptyWatchedAt(watchedAt)) {
      throw new Error('O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios');
    }
    if (!validWatchedAt(watchedAt)) {
      throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
    }
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
  next();
};

module.exports = { watchedAtValidation };
