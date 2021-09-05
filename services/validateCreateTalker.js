// 4 - Crie o endpoint POST /talker

const validateName = (name) => {
  if (!name || !name.length) return { status: 400, message: 'O campo "name" é obrigatório' };
  if (name.length < 3) return { status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' };
  return { ok: true };
};

const validateAge = (age) => {
  if (!age || Number.isNaN(age)) return { status: 400, message: 'O campo "age" é obrigatório' };
  if (age < 18) return { status: 400, message: 'A pessoa palestrante deve ser maior de idade' };
  return { ok: true };
};

const validateTalker = (talk) => {
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return {
      status: 400,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    }; 
  }
  return { ok: true };
};

const validatewatchedAtAndRate = (talk) => {
  const rateRegex = /^[1-5]{1}$/;
  const watchedAtRegex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!watchedAtRegex.test(talk.watchedAt)) {
    return { status: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }

  if (!rateRegex.test(talk.rate)) {
    return { status: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }

  return { ok: true };
};

const validateCreateTalker = (name, age, talk) => {
  const isValidName = validateName(name);
  const isValidAge = validateAge(age);
  const isValidTalker = validateTalker(talk);
  const isValidWatchedAtAndRate = validatewatchedAtAndRate(talk);

  if (!isValidName.ok) return isValidName;
  if (!isValidAge.ok) return isValidAge;
  if (!isValidTalker.ok) return isValidTalker;
  if (!isValidWatchedAtAndRate.ok) return isValidWatchedAtAndRate;
  return { ok: true };
};

module.exports = validateCreateTalker;
