const isValidName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const isValidAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (parseInt(age, 10) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const isValidTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
    });
  }
  next();
};

const isValidaDate = (req, res, next) => {
  const {
    talk: { watchedAt },
  } = req.body;
  const dateRegex = new RegExp('\\d\\d\\/\\d\\d\\/\\d\\d\\d\\d');
    
  if (!dateRegex.test(watchedAt)) {
    return res
    .status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const isValidaRate = (req, res, next) => {
  const {
    talk: { rate },
  } = req.body;
  const rateRegex = new RegExp('^[1-5]$');
  if (!rateRegex.test(rate)) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = { isValidName, isValidAge, isValidTalk, isValidaDate, isValidaRate };
