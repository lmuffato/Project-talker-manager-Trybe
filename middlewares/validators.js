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

  next();
}

function isTalkObjectEmpty(talk) {
  const { watchedAt, rate } = talk;
  return [watchedAt, rate].includes(undefined);
}

function validateDateFormat(req, res, next) {
  // https://qastack.com.br/programming/15491894/regex-to-validate-date-format-dd-mm-yyyy
  const { date } = req.body.talk;
  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  if (!dateRegex.test(date)) {
    return res
       .status(400)
       .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
  }
  
  next();
}

function validateRate(req, res, next) {
  const { rate } = req.body.talk;
  const isRateRangeOk = rate >= 1 && rate <= 5;
  const isRateOk = Number.isInteger(rate) && isRateRangeOk;
  if (!isRateOk) {
    return res
       .status(400)
       .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
  }
  next();
}

function validateToken(req, res, next) {
  const { authorization: token } = req.headers;
  const tokenLength = 16;
  
  if (!token) {
    return res
       .status(401)
       .json({ message: 'Token não encontrado' });
  }
  
  if(token.length !== tokenLength) return res
  .status(401)
  .json({ message: 'Token inválido' });

  next();
}

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
  validateTalk,
  isTokenValid,
  validateDateFormat,
  validateRate,
  validateToken
};
