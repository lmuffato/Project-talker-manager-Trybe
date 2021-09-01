const { Router } = require('express');

const { getFilteredTalker, getTalkerList } = require('../middlewares/getTalkers');

const router = Router();

router.get('/', getTalkerList);

router.get('/:id', getFilteredTalker);


// router.post('/', validateToken, validateTalkerName, validateTalkerAge, validateTalker, createTalker);

module.exports = router;