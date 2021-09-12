const moment = require('moment');

const EMAIL_OBRIGATORIO = 'O campo "email" é obrigatório';
const EMAIL_VALIDO = 'O "email" deve ter o formato "email@email.com"';
const PASSWORD_OBRIGATORIO = 'O campo "password" é obrigatório';
const PASSWORD_VALIDO = 'O "password" deve ter pelo menos 6 caracteres';
const TOKEN_NAO_ENCONTRADO = 'Token não encontrado';
const TOKEN_INVALIDO = 'Token inválido';
const NOME_OBRIGATORIO = 'O campo "name" é obrigatório';
const NOME_VALIDO = 'O "name" deve ter pelo menos 3 caracteres';
const IDADE_OBRIGATORIO = 'O campo "age" é obrigatório';
const IDADE_VALIDA = 'A pessoa palestrante deve ser maior de idade';
const DATA_VALIDA = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
const RATE_VALIDO = 'O campo "rate" deve ser um inteiro de 1 à 5';
const RATE_DATA_VALIDO = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

const codigo = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

const randomToken = (length) => {
  const token = [];  
  for (let index = 0; index < length; index += 1) {
      const randomIndex = (Math.random() * (codigo.length - 1)).toFixed(0);
      token[index] = codigo[randomIndex];
  }
  return token.join('');
};

// consulta repositório Renzo
const checarToken = (token) => {
  const regex = /^(\d|\w){16}$/gm;

  return regex.test(token);
};

const validarPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') return res.status(400).json({ message: PASSWORD_OBRIGATORIO });
  if (password.length < 5) return res.status(400).json({ message: PASSWORD_VALIDO });
  next();
};

const validarEmail = (req, res, next) => {
  const { email } = req.body;
  // consulta repositório
  const validarFormatoEmail = /^[\S.]+@[a-z]+\.\w{2,3}$/g;
  const validador = validarFormatoEmail.test(email);
  if (!email || email === '') return res.status(400).json({ message: EMAIL_OBRIGATORIO });
  if (!validador) return res.status(400).json({ message: EMAIL_VALIDO });
  next();
};

const validarToken = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token || token === '') return res.status(401).json({ message: TOKEN_NAO_ENCONTRADO });
  const validado = checarToken(token);
  if (!validado) return res.status(401).json({ message: TOKEN_INVALIDO });
  next();
};

const validarNome = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') return res.status(400).json({ message: NOME_OBRIGATORIO });
  if (name.length < 3) return res.status(400).json({ message: NOME_VALIDO });
  next();
};

const validarIdade = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') return res.status(400).json({ message: IDADE_OBRIGATORIO });
  if (age < 18) return res.status(400).json({ message: IDADE_VALIDA });
  next();
};

const validarRate = (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate < 1 || talk.rate > 5) return res.status(400).json({ message: RATE_VALIDO });
  next();
};

const validarData = (req, res, next) => {
  const { talk } = req.body;
  const validDate = moment(talk.watchedAt, 'DD/MM/YYYY').isValid();
  if (!validDate) return res.status(400).json({ message: DATA_VALIDA });
  next();
};

const validarTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) return res.status(400).json({ message: RATE_DATA_VALIDO });
  if ([talk.watchedAt, talk.rate].includes(undefined)) {
    return res.status(400).json({ message: RATE_DATA_VALIDO });
  }
  next();
};

module.exports = {
  validarEmail,
  validarPassword,
  validarIdade,
  validarNome,
  validarToken,
  validarTalk,
  validarRate,
  validarData,
  randomToken,
};