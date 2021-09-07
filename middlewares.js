const crypto = require('crypto');
const moment = require('moment');

const EMAIL_OBRIGATORIO = 'O campo "email" é obrigatório';
const EMAIL_VALIDO = 'O "email" deve ter o formato "email@email.com"';
const PASSWORD_OBRIGATORIO = 'O campo "password" é obrigatório';
const PASSWORD_VALIDO = 'O "password" deve ter pelo menos 6 caracteres';
const TOKEN_NAO_ENCONTRADO = 'Token não encontrado';
const TOKEN_INVALIDO = 'Token inválido';
const NOME_OBRIGATORIO = 'O campo "name" é obrigatório';
const NOME_VALIDO = 'O "name" ter pelo menos 3 caracteres';
const IDADE_OBRIGATORIO = 'O campo "age" é obrigatório';
const IDADE_VALIDA = 'A pessoa palestrante deve ser maior de idade';
const DATA_VALIDA = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
const RATE_VALIDO = '"O campo "rate" deve ser um inteiro de 1 à 5"';
const RATE_DATA_VALIDO = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

const validarFormatoEmail = /^[\S.]+@[a-z]+\.\w{2,3}$/g;

// consulta repositório Felipe Flores
function gerarToken() {
  return crypto.randomBytes(8).toString('hex');
}
const validarPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password === '') return res.status(400).json({ message: PASSWORD_OBRIGATORIO });
  if (password.length < 5) return res.status(400).json({ message: PASSWORD_VALIDO });
  next();
};

const validarEmail = (req, res, next) => {
  const { email } = req.body;
  const validador = validarFormatoEmail.test(email);
  if (!email || email === '') return res.status(400).json({ message: EMAIL_OBRIGATORIO });
  if (!validador) return res.status(400).json({ message: EMAIL_VALIDO });
  next();
};

const validarToken = (req, res, next) => {
  const { token } = req.headers;
  if (!token || token === '') return res.status(401).json({ message: TOKEN_NAO_ENCONTRADO });
  if (token.length !== 16) return res.status(401).json({ message: TOKEN_INVALIDO });
  next();
};

const validarNome = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') return res.status(400).json({ message: NOME_OBRIGATORIO });
  if (name.length < 2) return res.status(400).json({ message: NOME_VALIDO });
  next();
};

const validarIdade = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') return res.status(400).json({ message: IDADE_OBRIGATORIO });
  if (age < 17) return res.status(400).json({ message: IDADE_VALIDA });
  next();
};

const validarTalk = (req, res, next) => {
  const { talk } = req.body;
  const dataValida = moment(talk.watchedAt, 'DD/MM/YYYY').isValid();
  if (!dataValida) return res.status(400).json({ message: DATA_VALIDA });
  if (talk.rate < 1 || talk.rate > 5) return res.status(400).json({ message: RATE_VALIDO });
  next();
};
const validarTalkRate = (req, res, next) => {
  const { talk } = req.body;
  const dataValida = moment(talk.watchedAt, 'DD/MM/YYYY').isValid();
  if (!dataValida && !talk.rate) return res.status(400).json({ message: RATE_DATA_VALIDO });
  next();
};

module.exports = {
  gerarToken,
  validarPassword,
  validarEmail,
  validarToken,
  validarNome,
  validarIdade,
  validarTalk,
  validarTalkRate,
};
