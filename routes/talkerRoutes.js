const express = require('express');

const router = express.Router();
const getTalkers = require('../Middlewares/getTalkers');

router.get('/', getTalkers);

module.exports = router;
