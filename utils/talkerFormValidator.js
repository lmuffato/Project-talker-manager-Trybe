const { ddmmyyValidator } = require('./dateFormatValidators');
const rateValidator = require('./rateValidator');

function nameValidator(name) {
  if (!name || name === '') {
    return { message: 'O campo "name" é obrigatório' };
  }
  if (name.length < 3) {
    return { message: 'O "name" deve ter pelo menos 3 caracteres' };
  }
  return 0;
}

function ageValidator(age) {
  if (!age || age === '') {
    return { message: 'O campo "age" é obrigatório' };
  }

  if (parseInt(age, 10) < 18) {
    return { message: 'A pessoa palestrante deve ser maior de idade' };
  }

  return 0;
}

function hasFields(talk) {
  if (!talk) {
    return {
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }

  if (!talk.watchedAt || (!talk.rate && talk.rate !== 0)) { // talk.rate !== 0 was inserted to prevent js confusing types. 0 number and 0 boolean.
    return {
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }

  return 0;
}

function talkValidator(talk) {
  const hasAllFields = hasFields(talk);
  if (hasAllFields !== 0) {
    return hasAllFields;
  }

  if (!ddmmyyValidator(talk.watchedAt)) {
    return { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }

  const rateCheck = rateValidator(talk.rate);
  if (rateCheck !== 0) {
    return rateCheck;
  }

  return 0;
}

module.exports = {
  nameValidator,
  ageValidator,
  talkValidator,
};
