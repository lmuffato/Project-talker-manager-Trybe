const { Router } = require('express');
const getTalker = require('../middleware/getTalker');
const getTlakerById = require('../middleware/getTalkerById');
const addTalker = require('../middleware/addTalker');
const nameValidation = require('../Utils/nameValidation');
const ageValidation = require('../Utils/ageValidation');
const talkValidation = require('../Utils/talkValidation');
const talkValidation2 = require('../Utils/talkValidation2');
const tokenValidation = require('../middleware/tokenValidation');
const deleteTalker = require('../middleware/deleteTalker');

const router = Router();

router.get('/', getTalker);
router.get('/:id', getTlakerById);
router.post(
'/', 
tokenValidation, 
nameValidation, 
ageValidation, 
talkValidation2, 
talkValidation, 
addTalker,
);
router.delete('/:id', tokenValidation, deleteTalker);

module.exports = router;
