const validateName = (name) => {
  if (!name || !name.length) {
    return { status: 400, message: 'O campo "name" é obrigatório' };
  }
  if (name.length < 3) {
    return { status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' };
  }
  return { ok: true };
};

const validateAge = (age) => {
  if (!age || age === null) {
    return { status: 400, message: 'O campo "age" é obrigatório' };
  }
  if (age < 18) {
    return { status: 400, message: 'A pessoa palestrante deve ser maior de idade' };
  }
  return { ok: true };
};

const validateTalk = (talk) => {
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return {
      status: 400,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' };
  }
  return { ok: true };
};

const validatewatchedAtAndRate = (dateRate) => {
  const watchedAtRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  const rateRegex = /^[1-5]{1}$/;

  const date = watchedAtRegex.test(dateRate.watchedAt);
  const rate = rateRegex.test(dateRate.rate);

  if (!date) {
    return { status: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }
  if (!rate) {
    return { status: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
  return { ok: true };
};

const validateCreateTalker = (name, age, talk) => {
  const isValidName = validateName(name);
  if (!isValidName.ok) { return isValidName; }

  const isValidAge = validateAge(age);
  if (!isValidAge.ok) { return isValidAge; }

  const isValidTalk = validateTalk(talk);
  if (!isValidTalk.ok) { return isValidTalk; }

  const isValidatewatchedAtAndRate = validatewatchedAtAndRate(talk);
  if (!isValidatewatchedAtAndRate.ok) { return isValidatewatchedAtAndRate; }

  return { ok: true };
};

module.exports = validateCreateTalker;
