const express = require('express');

const router = express.Router();
const { getTalkers, getTalkersById, createTalker, editTalker } = require('../middlewares');

router.get('/', getTalkers);
router.get('/:id', getTalkersById);
router.post('/', createTalker);
router.put('/:id', editTalker);

module.exports = router;
