const checkEmail = (email) => {
  const regex = /\w{3,}@\w{3,}\.\w{2,3}/;

  return regex.test(email);
};

const checkPassword = (password) => {
  const regex = /[\S]{6,}/;

  return regex.test(password);
};

const checkEmptyLogin = (email, password) => {
  if (!email) return { message: 'O campo "email" é obrigatório' };

  if (!password) return { message: 'O campo "password" é obrigatório' };

  return { message: '' };
};

const checkInvalidLogin = (email, password) => {
  const invalidEmail = !checkEmail(email);

  if (invalidEmail) {
    return { message: 'O "email" deve ter o formato "email@email.com"' };
  }

  const invalidPassword = !checkPassword(password);

  if (invalidPassword) {
    return { message: 'O "password" deve ter pelo menos 6 caracteres' };
  }

  return { message: '' };
};

const checkToken = (token) => {
  const regex = /^(\d|\w){16}$/gm;

  return regex.test(token);
};

const checkDate = (date) => {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  return regex.test(date);
};

const checkName = (name) => {
  if (!name) {
    return { message: 'O campo "name" é obrigatório' };
  }

  if (name.length < 3) {
    return { message: 'O "name" deve ter pelo menos 3 caracteres' };
  }

  return { message: '' };
};

const checkAge = (age) => {
  if (!age) {
    return { message: 'O campo "age" é obrigatório' };
  }

  if (age < 18) {
    return { message: 'A pessoa palestrante deve ser maior de idade' };
  }

  return { message: '' };
};

const checkEmptyTalk = (talk) => {
  const message = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
  
  if (!talk) return { message };
  
  if ([talk.watchedAt, talk.rate].includes(undefined)) return { message };

  return { message: '' };
};

const checkRate = (rate) => {
  const isRateBetween1And5 = rate >= 1 && rate <= 5;

  if (!Number.isInteger(rate) || !isRateBetween1And5) {
    return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }

  return { message: '' };
};

const checkTalk = (talk) => {
  const empty = checkEmptyTalk(talk);

  if (empty.message) return { message: empty.message };

  const validDate = checkDate(talk.watchedAt);

  if (!validDate) {
    return { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }

  const rate = checkRate(Number(talk.rate));

  if (rate.message) {
    return { message: rate.message };
  }

  return { message: '' };
};

module.exports = {
  checkEmail,
  checkPassword,
  checkEmptyLogin,
  checkInvalidLogin,
  checkToken,
  checkDate,
  checkName,
  checkAge,
  checkEmptyTalk,
  checkTalk,
};

// https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
