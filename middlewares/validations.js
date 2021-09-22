const fs = require('fs').promises;
const STATUS = require('../status/http_status');

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return res.status(STATUS.ERROR.BAD_REQUEST).send({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!validation.test(email)) {
    return res.status(STATUS.ERROR.BAD_REQUEST).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(STATUS.ERROR.BAD_REQUEST).send({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length < 6) {
    return res.status(STATUS.ERROR.BAD_REQUEST).send({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

const validateFields = (req, res, next) => {
  const newTalker = req.body;
  if (!newTalker.name) {
    return res.status(STATUS.ERROR.BAD_REQUEST).send({ message: 'O campo "name" é obrigatório' });
  }    
  if (!newTalker.age) {
    return res.status(STATUS.ERROR.BAD_REQUEST).send({ message: 'O campo "age" é obrigatório' });
  }
  if (!newTalker.talk || !newTalker.talk.watchedAt) {
    return res.status(STATUS.ERROR.BAD_REQUEST).send({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    }); 
}
  next();
};

const validateData = (req, res, next) => {
  const newTalker = req.body;
    if (newTalker.name.length < 3) {
      return res.status(STATUS.ERROR.BAD_REQUEST)
      .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    if (newTalker.age < 18) {
      return res.status(STATUS.ERROR.BAD_REQUEST)
      .send({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const dateValidation = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(STATUS.ERROR.BAD_REQUEST)
    .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!dateValidation.test(talk.watchedAt)) {
    return res.status(STATUS.ERROR.BAD_REQUEST).send({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  });
  }
  if (!talk.rate) {
    return res.status(STATUS.ERROR.BAD_REQUEST).send({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    }); 
  }
  next();
};

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const validTokens = JSON.parse(await fs.readFile('./auth/validTokens.json'));
  const isValid = validTokens.some((token) => token === authorization);
  if (!authorization) {
    return res.status(STATUS.ERROR.UNOTHORIZED).send({ message: 'Token não encontrado' });
  }
  if (!isValid) {
    return res.status(STATUS.ERROR.UNOTHORIZED).send({ message: 'Token inválido' });
  }
  next();
};

module.exports = {
    validateEmail,
    validatePassword,
    validateFields,
    validateData,
    validateTalk,
    validateToken,
};