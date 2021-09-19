const requiredfield = require('./helpers/requiredFields');

function validateName(name) {
  if (name.length < 3) throw new Error('O "name" deve ter pelo menos 3 caracteres');
}

function validateAge(age) {
  if (age < 18) throw new Error('A pessoa palestrante deve ser maior de idade');
}

function requiredTalk(talk) {
  if (!talk || talk.rate === undefined || !talk.watchedAt) {
    throw new Error('O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios');
  }
}

function validateRate(rate) {
  if (!(typeof rate === 'number' && rate > 0 && rate < 6)) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
}

function validatewatchedAtDay(day) {
  if (!day || day.length !== 2) {
    throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
  }
}

function validatewatchedAtMonth(month) {
  if (!month || month.length !== 2) {
    throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
  }
}

function validatewatchedAtYear(year) {
  if (!year || year.length !== 4) {
    throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
  }
}

function validatewatchedAt(watchedAt) {
  const date = watchedAt.split('/');
  validatewatchedAtDay(date[0]);
  validatewatchedAtMonth(date[1]);
  validatewatchedAtYear(date[2]);
}

function validateTalk(talk) {
  requiredTalk(talk);
  validateRate(talk.rate);
  validatewatchedAt(talk.watchedAt);
}

function validate(data) {
  try {
    requiredfield(['name', 'age'], data);
    validateName(data.name);
    validateAge(data.age);
    validateTalk(data.talk);
  } catch (error) {
    return { message: error.message };
  } 
}

module.exports = validate;