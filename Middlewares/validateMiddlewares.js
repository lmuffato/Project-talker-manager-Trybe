const moment = require('moment');

const ERROR_AGE_VAZIO = 'O campo "age" é obrigatório';
const ERROR_AGE_INVALID = 'A pessoa palestrante deve ser maior de idade';
const ERROR_NAME_VAZIO = 'O campo "name" é obrigatório';
const ERROR_NAME_INVALID = 'O "name" deve ter pelo menos 3 caracteres';
const ERROR_TOKEN_VAZIO = 'Token não encontrado';
const ERROR_TOKEN_INVALID = 'Token inválido';
const ERROR_RATE_INVALID = 'O campo "rate" deve ser um inteiro de 1 à 5';
const ERROR_DATE_INVALID = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
const ERROR_UNDEFINED = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

const checkToken = (token) => {
    const regex = /^(\d|\w){16}$/gm;
  
    return regex.test(token);
  };

const validadeToken = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token || token === '') return res.status(401).json({ message: ERROR_TOKEN_VAZIO });

  const checked = checkToken(token);

  if (!checked) return res.status(401).json({ message: ERROR_TOKEN_INVALID });

  next();
};

const validadeName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') return res.status(400).json({ message: ERROR_NAME_VAZIO });
  if (name.length < 3) return res.status(400).json({ message: ERROR_NAME_INVALID });

  next();
};

const validadeAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === '') return res.status(400).json({ message: ERROR_AGE_VAZIO });
  if (age < 18) return res.status(400).json({ message: ERROR_AGE_INVALID });

  next();
};

const validadeRate = (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate < 1 || talk.rate > 5) return res.status(400).json({ message: ERROR_RATE_INVALID });
  next();
};

const validadeDate = (req, res, next) => {
  const { talk } = req.body;
  const validDate = moment(talk.watchedAt, 'DD/MM/YYYY').isValid();
  if (!validDate) return res.status(400).json({ message: ERROR_DATE_INVALID });
  next();
};

const validadeTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) return res.status(400).json({ message: ERROR_UNDEFINED });
  if ([talk.watchedAt, talk.rate].includes(undefined)) {
    return res.status(400).json({ message: ERROR_UNDEFINED });
  }
  next();
};

module.exports = {
  validadeAge,
  validadeName,
  validadeToken,
  validadeTalk,
  validadeRate,
  validadeDate,
}; 
