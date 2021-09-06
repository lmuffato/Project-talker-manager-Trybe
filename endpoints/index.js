// Arquivo centralizador dos middlewares

const getTalker = require('./getTalker');
const getTalkerID = require('./getTalkerID');
// tokenLogin, validarEmail e validarPassword estão entre {} SOMENTE
// abaixo porque o arquivo postLogin exporta mais de um módulo.
const { tokenLogin } = require('./postLogin');
const { validarEmail } = require('./postLogin');
const { validarPassword } = require('./postLogin');

module.exports = {
  getTalker,
  getTalkerID,
  tokenLogin,
  validarEmail,
  validarPassword,
};
