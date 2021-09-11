const express = require('express');

const router = express.Router();

const { getTalkers, getTalkersId } = require('./middlewares/getTalkers');
const {
  loginEmail,
  loginPassword,
  tokenauthenticated,
} = require('./middlewares/authenticated');
const authorization = require('./middlewares/authorization');
// const { tokenValidation } = require('./middlewares/tokenValidation');

router.get('/talker', getTalkers);
router.get('/talker/:id', getTalkersId);
router.post('/login', loginEmail, loginPassword, tokenauthenticated);

router.post(
  '/talker',
  authorization.tokenValidation,
  authorization.nameValidation,
  authorization.ageValidation,
  authorization.rateValidation,
  authorization.watValidation,
  authorization.addNewTalke,
);

module.exports = router;
