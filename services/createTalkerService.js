const REGEX_DATE = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

const valitationsTexts = {
  name: {
    notExists: 'O campo "name" é obrigatório',
    errorValidation: 'O "name" deve ter pelo menos 3 caracteres',
  },
  age: {
      notExists: 'O campo "age" é obrigatório',
      errorValidation: 'A pessoa palestrante deve ser maior de idade',
  },
  talk: {
    notExists: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    watchedAt: {
      errorValidation: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    },
    rate: {
      errorValidation: 'O campo "rate" deve ser um inteiro de 1 à 5',
    },
  },
};

const nameValidation = (name) => {
  if (name.length >= 3) return true;
  return false;
};

const ageValidation = (age) => {
  if (age < 18) return false;
  return true;
};

const rateValidation = (rate) => {
  if (rate > 0 && rate <= 5) return true;
  return false;
};

const watchedAtValidation = (watchedAt) => REGEX_DATE.test(watchedAt);

const validAllFalse = (name, age, watchedAt, rate) => {
  const nameValid = nameValidation(name);
  const ageValid = ageValidation(age);
  const rateValid = rateValidation(rate);
  const watchedAtValid = watchedAtValidation(watchedAt);
  if (!nameValid) return { message: valitationsTexts.name.errorValidation };
  if (!ageValid) return { message: valitationsTexts.age.errorValidation };
  if (!rateValid) return { message: valitationsTexts.talk.rate.errorValidation };
  if (!watchedAtValid) return { message: valitationsTexts.talk.watchedAt.errorValidation };
};

const validAll = (name, age, watchedAt, rate) => {
  const nameValid = nameValidation(name);
  const ageValid = ageValidation(age);
  const rateValid = rateValidation(rate);
  const watchedAtValid = watchedAtValidation(watchedAt);
  if (nameValid && ageValid && rateValid && watchedAtValid) {
    return ({ name, age, talk: { watchedAt, rate } });
  }
  return validAllFalse(name, age, watchedAt, rate);
};

const createTalkerService = (talker) => {
  const { name, age, talk: { rate, watchedAt } } = talker;
  if (!name) return { message: valitationsTexts.name.notExists };
  if (!age) return { message: valitationsTexts.age.notExists };
  if (!watchedAt || !rate) return { message: valitationsTexts.talk.notExists };
  return validAll(name, age, watchedAt, rate);
};

module.exports = createTalkerService;
