const express = require('express');

const router = express.Router();
const { getTalkers } = require('../middlewares/index');

router.get('/', getTalkers);

module.exports = router;
