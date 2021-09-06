// Arquivo centralizador dos middlewares

const getTalker = require('./getTalker');
const getTalkerID = require('./getTalkerID');

// Os módulos abaixo estão entre {} porque são exportados
// mais de um módulo dentro do mesmo arquivo JavaScript.
const { tokenLogin, validarEmail, validarPassword } = require('./postLogin');

const {
  addPalestrante,
  validarToken,
  validarNome,
  validarIdade,
  validarTalk,
  validarNota,
  talkWatchedAtValidation } = require('./postTalker');

  const editarPalestrante = require('./editarPalestrante');

module.exports = {
  getTalker,
  getTalkerID,
  tokenLogin,
  validarEmail,
  validarPassword,
  addPalestrante,
  validarToken,
  validarNome,
  validarIdade,
  validarTalk,
  validarNota,
  talkWatchedAtValidation,
  editarPalestrante,
};
