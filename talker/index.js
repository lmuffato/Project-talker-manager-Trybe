const express = require('express');
const { readFile } = require('fs').promises;

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const data = await readFile('./talker.json', 'utf-8');
    const talkersList = await JSON.parse(data);
    res.status(200).json(talkersList);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
module.exports = router;
