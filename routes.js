const express = require('express');

const router = express.Router();
const talker = require('./controllers/talkerController');

router.get('/talker', talker.talkerRoute);
router.get('/talker/:id', talker.searchID);

module.exports = router;
