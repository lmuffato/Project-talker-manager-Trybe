const { Router } = require('express');

const getter = require('../talkers/get');
const getById = require('../talkers/getID');

const router = Router();

router.get('/', getter);
router.get('/:id', getById);

module.exports = router;