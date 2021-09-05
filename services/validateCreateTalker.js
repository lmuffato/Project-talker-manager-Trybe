// 4 - Crie o endpoint POST /talker

const validateName = (name) => {
  if (name.length < 3) return { status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' };
  if (!name || name.length === 0) return { status: 400, message: 'O campo "name" é obrigatório' };
  return { ok: true };
};

const validateAge = (age) => {
  if (Number(age) < 18) return { status: 400, message: 'O campo "age" é obrigatório' };
  if (!age || Number.isNaN(age)) return { status: 400, message: 'O campo "age" é obrigatório' };
  return { ok: true };
};

const validateTalker = (talker) => {
  if (!talker || !talker.watchedAt || (!talker.rate && talker.rate !== 0)) {
    return {
      status: 400,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    }; 
  }
  return { ok: true };
};

const validatewatchedAtAndRate = (talker) => {
  const watchedAtRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  const rateRegex = /^[1-5]{1}$/;

  if (!watchedAtRegex.test(talker.watchedAt)) {
    return { status: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }

  if (!rateRegex.test(talker.rate)) {
    return { status: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }

  return { ok: true };
};

const validateCreateTalker = (name, age, talker) => {
  const isValidName = validateName(name);
  const isValidAge = validateAge(age);
  const isValidTalker = validateTalker(talker);
  const isValidWatchedAtAndRate = validatewatchedAtAndRate(talker);

  if (isValidName.ok) return isValidName;
  if (isValidAge.ok) return isValidAge;
  if (isValidTalker.ok) return isValidTalker;
  if (isValidWatchedAtAndRate.ok) return isValidWatchedAtAndRate;
  return { ok: true };
};

module.exports = validateCreateTalker;
