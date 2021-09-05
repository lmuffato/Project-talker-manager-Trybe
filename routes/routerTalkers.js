const express = require('express');

const router = express.Router();
const { getTalkers, getTalkersById, createTalker } = require('../middlewares/index');

router.get('/', getTalkers);
router.get('/:id', getTalkersById);
router.post('/', createTalker);

module.exports = router;
