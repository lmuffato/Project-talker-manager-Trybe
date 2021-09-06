function nameValidation(req, res, next) {
  const { name } = req.body;

  const errLength = { message: 'O "name" deve ter pelo menos 3 caracteres' };

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return res.status(400).json(errLength);

  next();
}

function ageValidation(req, res, next) {
  const { age } = req.body;

  const errAge = { message: 'A pessoa palestrante deve ser maior de idade' };

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(400).json(errAge);

  next();
}

function rateValidation(req, res, next) {
  const { talk: { rate } } = req.body;

  const msgErrTalk = { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };

  if (rate < 1 || rate > 5) return res.status(400).json(msgErrTalk); 

  next();
}

function dateValidation(req, res, next) {
  const { talk: { watchedAt } } = req.body;

  const regexDate = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g;
  const msgErrDate = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };

  if (!watchedAt.match(regexDate)) return res.status(400).json(msgErrDate);

  next();
}

function talkValidationMandatory(req, res, next) {
  const { talk } = req.body;

  const msgErr = { 
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
  };

  if (!talk || !talk.watchedAt || talk.rate === undefined) return res.status(400).json(msgErr);
  
  next();
}

module.exports = {
  nameValidation,
  ageValidation,
  rateValidation,
  dateValidation,
  talkValidationMandatory,
};

// ref validar date : https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy