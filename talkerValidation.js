const ERRO = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
const validateName = (req, res, next) => {
const { name } = req.body;
if (!name || name === '') {
  return res.status(400)
    .json({ message: 'O campo "name" é obrigatório' }); 
}
if (name.length < 3) {
  return res.status(400)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
  }
    next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400)
      .json({ message: 'O campo "age" é obrigatório' }); 
  }
  if (age < 18) {
    return res.status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
    }
      next();
  };

  const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk || talk === '') {
      return res.status(400)
        .json({ message: ERRO }); 
    }
        next();
    };
  
  const validateRate = (req, res, next) => {
      const { rate } = req.body.talk;
      if (!rate || rate === '') {
        return res.status(400)
          .json({ message: ERRO }); 
      }
      if (rate < 1 || rate > 5) {
        return res.status(400)
          .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
      }
          next();
      };

  const validateWatchedAt = (req, res, next) => {
        const { watchedAt } = req.body.talk;
        const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

        if (!watchedAt || watchedAt === '') {
          return res.status(400)
            .json({ message: ERRO }); 
        }
        if (!regex.test(watchedAt)) {
          return res.status(400)
            .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
        }
            next();
        };

module.exports = { validateName, validateAge, validateTalk, validateRate, validateWatchedAt };
