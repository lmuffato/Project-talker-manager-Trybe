const HTTP_BAD_REQUEST_STATUS = 400;

const watchedAtValidation = (req, res, next) => {
  const { talk } = req.body;
  const regexDate = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g;
  
  if (!talk || !talk.watchedAt) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  if (!regexDate.test(talk.watchedAt)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
    );
  }

  next();
};

module.exports = watchedAtValidation;
