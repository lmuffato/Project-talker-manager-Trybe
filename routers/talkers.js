const { Router } = require('express');

const getter = require('../talkers/get');

const router = Router();

router.get('/', getter);

module.exports = router;