const { Router } = require('express');

const router = new Router();

const getTalkers = require('../middleware/getTalkers');

const talkerByID = require('../middleware/getTalkerByID');

const tokenValidation = require('../validations/tokenValidation');
const nameValidation = require('../validations/nameValidation');
const ageValidation = require('../validations/ageValidation');

router.get('/', getTalkers);

router.get('/:id', talkerByID);

router.post('/', tokenValidation, nameValidation, ageValidation);

module.exports = router;