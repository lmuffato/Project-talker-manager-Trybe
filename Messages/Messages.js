const MESSAGE_TOKEN_NOT_FOUND = 'Token não encontrado';
const INVALID_TOKEN = 'Token inválido';
const REQUIRED_FIELD_EMAIL = 'O campo "email" é obrigatório';
const FORMATATION_EMAIL = 'O "email" deve ter o formato "email@email.com"';
const REQUIRED_FIELD_PASSOWRD = 'O campo "password" é obrigatório';
const REQUIRED_PASSWORD_LENGTH = 'O "password" deve ter pelo menos 6 caracteres';
const DELETED_PERSON_SUCESS = 'Pessoa palestrante deletada com sucesso';
const REQUIRED_FIELD_NAME = 'O campo "name" é obrigatório';
const REQUIRED_NAME_LENGTH = 'O "name" deve ter pelo menos 3 caracteres';
const REQUIRED_FIELD_AGE = 'O campo "age" é obrigatório';
const CONDITION_AGE = 'A pessoa palestrante deve ser maior de idade';
const CONDITION_RATE = 'O campo "rate" deve ser um inteiro de 1 à 5';
const FORMATATION_DATE = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
const RF_TWR = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
const NOT_FOUND_PERSON = 'Pessoa palestrante não encontrada';

module.exports = {
   MESSAGE_TOKEN_NOT_FOUND,
   INVALID_TOKEN,
   REQUIRED_FIELD_NAME,
   REQUIRED_FIELD_PASSOWRD,
   REQUIRED_NAME_LENGTH,
   REQUIRED_FIELD_AGE,
   CONDITION_RATE,
   FORMATATION_DATE,
   RF_TWR,
   CONDITION_AGE,
   DELETED_PERSON_SUCESS,
   REQUIRED_PASSWORD_LENGTH,
   REQUIRED_FIELD_EMAIL,
   FORMATATION_EMAIL,
   NOT_FOUND_PERSON,
}; 