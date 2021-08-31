function validateEmail(req, res, next) {
  const { email } = req.body;
  const emailPatternRegex = /\S+@\S+\.\S+/;
  
  if (!email || email === '') {
 return res
    .status(400)
    .json({ message: 'O campo "email" é obrigatório' }); 
}
  
  if (!emailPatternRegex.test(email)) {
 return res
    .status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}
  
  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  const passwordMinLength = 6;

  if (!password || password === '') {
 return res
    .status(400)
    .json({ message: 'O campo "password" é obrigatório' }); 
}
  
  if (password.length < passwordMinLength) {
 return res
    .status(400)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
}
  
  next();
}

function validateName(req, res, next) {
  const { name } = req.body;
  const nameMinLength = 3;

  if (!name || name === '') {
 return res
    .status(400)
    .json({ message: 'O campo "name" é obrigatório' }); 
}
  
  if (name.length < nameMinLength) {
 return res
    .status(400)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
}
  
  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;
  const minAge = 18;

  if (!age || age === '') {
 return res
    .status(400)
    .json({ message: 'O campo "age" é obrigatório' }); 
}
  
  if (+age < minAge) {
 return res
    .status(400)
    .json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
}
  
  next();
}

function validateTalk(req, res, next) {
  const { talk } = req.body;

  if (!talk || talk === {}) {
 return res
    .status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
}

  if (isTalkObjectEmpty(talk)) {
 return res
    .status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
}
  
  const { watchedAt, rate } = talk;

  if (!verifyDateFormat(watchedAt)) {
 return res
    .status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
}
  
  if (!verifyRate(rate)) {
 return res
    .status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
}

  next();
}

function isTalkObjectEmpty(talk) {
  const { watchedAt, rate } = talk;
  return [watchedAt, rate].includes('');
}

function verifyDateFormat(date) {
  // https://qastack.com.br/programming/15491894/regex-to-validate-date-format-dd-mm-yyyy
  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  return dateRegex.test(date);
}

function verifyRate(rate) {
  const isRateRangeOk = rate >= 1 && rate <= 5;
  return Number.isInteger(rate) && isRateRangeOk;
}

function isTokenValid(token) {
  const tokenLength = 16;
  return token.length !== tokenLength;
}

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
  validateTalk,
  isTokenValid,
};
