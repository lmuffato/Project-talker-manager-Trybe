const express = require('express');
const { readFileSync } = require('fs');

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    const talkersList = readFileSync('./talker.json');
    const data = JSON.parse(talkersList);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
