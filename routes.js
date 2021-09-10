const express = require('express');

const router = express.Router();
const talker = require('./controllers/talkerController');
const auth = require('./controllers/auth');
const validation = require('./controllers/validation');

router.get('/talker', talker.talkerRoute);
router.get('/talker/:id', talker.searchID);
router.post('/login', auth.validateEmail, auth.validatePWD, auth.validateToken);
router.post(
  '/talker',
  validation.validationToken,
  validation.validationName,
  validation.validationAge,
  validation.validateTalk,
  validation.validateDate,
  validation.validateRate,
  validation.createTalk,

);

module.exports = router;
