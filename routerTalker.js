const fs = require('fs');
const express = require('express');

const talker = 'talker.json';
const dataTalker = JSON.parse(fs.readFileSync(talker, 'utf-8'));
const router = express.Router();

// requisito 1
router.get('/', (_request, response) => response.status(200).json(dataTalker));

module.exports = router;
