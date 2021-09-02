function validateEmail(req, res, next) {
  const { email } = req.body;
  const regex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/i);
  
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!email.match(regex)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}
function validatePassword(req, res, next) {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}
function validateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  } if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
}
function validateName(req, res, next) {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}
function validateAge(req, res, next) {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}
function validateRateAndWhatchedAt(req, res, next) {
  const { talk } = req.body;
  const dateRegex = new RegExp(/^\d{2}\/\d{2}\/\d{4}$/);
  if (!talk.watchedAt.match(dateRegex)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } 
  next();
}
function validateTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
}

module.exports = {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateRateAndWhatchedAt,
  validateTalk,
  
};
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/match
// https://stackoverflow.com/questions/940577/javascript-regular-expression-email-validation
// https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
