const express = require('express');

const router = express.Router();

const talkerHandlers = require('./handlers/talker');
const loginHandlers = require('./handlers/login');
const authHandlers = require('./handlers/auth');

router.get('/talker', talkerHandlers.getTalkers);

router.get('/talker/:id', talkerHandlers.getTalkersId);

router.get(
  '/search',
  authHandlers.validateToken,
  talkerHandlers.queryTalker,
);

router.post(
  '/login',
  loginHandlers.loginEmail,
  loginHandlers.loginPassword,
  loginHandlers.tokenauthenticated,
);

router.put(
  '/talker/:id',
  authHandlers.validateToken,
  talkerHandlers.nameValidation,
  talkerHandlers.ageValidation,
  talkerHandlers.talkValidation,
  talkerHandlers.rateValidation,
  talkerHandlers.watValidation,
  talkerHandlers.changeTalker,
);

router.delete(
  '/talker/:id',
  authHandlers.validateToken,
  talkerHandlers.deleteTalker,
);

router.post(
  '/talker',
  authHandlers.validateToken,
  talkerHandlers.nameValidation,
  talkerHandlers.ageValidation,
  talkerHandlers.talkValidation,
  talkerHandlers.rateValidation,
  talkerHandlers.watValidation,
  talkerHandlers.addNewTalker,
);

module.exports = router;
