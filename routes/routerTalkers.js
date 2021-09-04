const express = require('express');

const router = express.Router();
const { getTalkers, getTalkersById } = require('../middlewares/index');

router.get('/', getTalkers);
router.get('/:id', getTalkersById);

module.exports = router;
