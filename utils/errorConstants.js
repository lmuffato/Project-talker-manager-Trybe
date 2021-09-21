const TOKEN_NOT_FOUND = 'Token não encontrado';
const INVALID_TOKEN = 'Token inválido';
const NAME_REQUIRED = 'O campo "name" é obrigatório';
const NAME_LENGTH = 'O "name" deve ter pelo menos 3 caracteres';
const AGE_REQUIRED = 'O campo "age" é obrigatório';
const MINIMUN_AGE = 'A pessoa palestrante deve ser maior de idade';
const TALK = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
const RATE = 'O campo "rate" deve ser um inteiro de 1 à 5';
const DATE_FORMAT = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';

module.exports = {
  TOKEN_NOT_FOUND,
  INVALID_TOKEN,
  NAME_REQUIRED,
  NAME_LENGTH,
  AGE_REQUIRED,
  MINIMUN_AGE,
  TALK,
  RATE,
  DATE_FORMAT,
};
