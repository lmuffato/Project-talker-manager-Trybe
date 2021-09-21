const { badRequest } = require('../httpStatusCode');

const TALK_LENGHT = 2;

const validationFieldTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || Object.keys(talk).length !== TALK_LENGHT) {
    return res.status(badRequest)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  
  next();
};

module.exports = validationFieldTalk;
