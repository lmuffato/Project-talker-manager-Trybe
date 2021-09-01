const { Router } = require('express');

const { getFilteredTalker, getTalkerList } = require('../middlewares/getTalkers');

const router = Router();

router.get('/', getTalkerList);

router.get('/:id', getFilteredTalker);

module.exports = router;