const validateToken = (req, res, next) => {
  const { token } = req.headers;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token !== '7mqaVRXJSp886CGr') return res.status(401).json({ message: 'Token inválido' });

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt, rate } = talk;

  if (!talk || !watchedAt || !rate) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const validateDate = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;

  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/; // https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
  if (!watchedAt.match(dateRegex)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  validateToken,
  validateTalk,
  validateRate,
  validateName,
  validateDate,
  validateAge,
};