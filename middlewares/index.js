const middlewareAllTalkers = require('./middlewareTalker');
const middlewareTalkerId = require('./middlewareTalkerId');
const middlewareLogin = require('./middlewareLogin');
const middlewareAuthentication = require('./middlewareAuthetication');
const { 
  validaNome, 
  validaIdade, 
  validaTalker, 
  validaCamposTalker, 
  addTalker,
  editTalker,
  deleteTalker,
  } = require('./middlewareInsertEditDeleteTalker');

module.exports = {
  middlewareAllTalkers,
  middlewareTalkerId,
  middlewareLogin,
  middlewareAuthentication,
  validaNome,
  validaIdade,
  validaTalker,
  validaCamposTalker,
  addTalker,
  editTalker,
  deleteTalker,
};