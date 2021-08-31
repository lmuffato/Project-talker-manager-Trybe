const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const talkers = await fs.readFile('./talker.json').then((result) => JSON.parse(result));
    if (talkers.length === 0) return res.status(200).send([]);
    
    return res.status(200).send(talkers);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;