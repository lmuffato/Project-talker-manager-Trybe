const express = require('express');

const router = express.Router();
const talker = require('./controllers/talkerController');
const auth = require('./controllers/auth');

router.get('/talker', talker.talkerRoute);
router.get('/talker/:id', talker.searchID);
router.post('/login', auth.validateEmail, auth.validatePWD, auth.validateToken);

module.exports = router;
