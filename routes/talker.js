const { Router } = require('express');
const getTalker = require('../middleware/getTalker');
const getTlakerById = require('../middleware/getTalkerById');

const router = Router();

router.get('/', getTalker);
router.get('/:id', getTlakerById);

module.exports = router;
