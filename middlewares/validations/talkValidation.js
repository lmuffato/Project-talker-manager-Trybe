// Verifica se o campo 'date' foi enviado vazio
const emptyTalk = (talk) => {
if (!talk || (talk.rate !== 0 && !talk.rate) || !talk.watchedAt) { return true; }
};

const validWatchedAt = (watchedAt) => {
  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  return dateRegex.test(watchedAt);
};

const validRate = (rate) => (rate <= 5 && rate > 0);

// Middleware para validação do objeto talk
const talkValidation = (request, response, next) => {
  const { talk } = request.body;
  try {
    if (emptyTalk(talk)) {
      throw new Error('O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios');
    }
    if (!validWatchedAt(talk.watchedAt)) {
      throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
    }
    if (!validRate(talk.rate)) {
      throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
    }
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
  next();
};

module.exports = { talkValidation };
