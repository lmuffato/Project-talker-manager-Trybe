const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

router.get('/', async (_req, res) => {
  try {
    const talker = await fs.readFile('./talker.json', 'utf8');
    res.status(200).json(JSON.parse(talker));
  } catch (err) {
    res.status(500).send(err.message);
  } 
});
    
module.exports = router;