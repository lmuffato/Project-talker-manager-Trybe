const { Router } = require('express');

const getTalkers = require('../talkers/getTalkers');

const router = new Router();

router.get('/talker', getTalkers);

module.exports = router;