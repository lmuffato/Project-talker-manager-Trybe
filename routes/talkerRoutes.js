const express = require('express');

const router = express.Router();
const getTalkers = require('../Middlewares/getTalkers');
const searchIdTalk = require('../Middlewares/searchIdTalk');

router.get('/', getTalkers);
router.get('/:id', searchIdTalk);

module.exports = router;
