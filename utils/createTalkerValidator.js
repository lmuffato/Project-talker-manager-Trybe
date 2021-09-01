const { ddmmyyValidator } = require('./dateFormatValidators');

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

function talkValidator(talk) {
  const { watchedAt, rate } = talk;
  if (!talk || !watchedAt || !rate ) {
    return {
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }
  
  if (!ddmmyyValidator(watchedAt)) {
    return { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }

  if (rate < 1 || rate > 5) {
    return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }

  return 0;
}

module.exports = {
  nameValidator,
  ageValidator,
  talkValidator,
};
