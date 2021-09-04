const { BAD_REQUEST } = require('./httpStatus');

const validateDate = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const isValidDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  
  if (!watchedAt || !watchedAt === '') {
    return res.status(BAD_REQUEST).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
  if (!(isValidDate.test(watchedAt))) {
    return res.status(BAD_REQUEST).json(
      { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
    );
  }
 
  next();
};

module.exports = validateDate;
