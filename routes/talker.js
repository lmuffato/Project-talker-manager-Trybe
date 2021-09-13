const { Router } = require('express');
const getTalker = require('../middleware/getTalker');
const getTlakerById = require('../middleware/getTalkerById');
const addTalker = require('../middleware/addTalker');
const nameValidation = require('../Utils/nameValidation');
const ageValidation = require('../Utils/ageValidation');
const talkValidation = require('../Utils/talkValidation');
const talkValidation2 = require('../Utils/talkValidation2');
const token = require('../Utils/token');

const router = Router();

router.get('/', getTalker);
router.get('/:id', getTlakerById);
router.post('/', token, nameValidation, ageValidation, talkValidation2, talkValidation, addTalker);

module.exports = router;
