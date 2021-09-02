const express = require('express');
const fs = require('fs').promises;
const rescue = require('express-rescue');

const router = express.Router();

const lerArquivo = async () => {
  const file = await fs.readFile('./talker.json');
  return JSON.parse(file);
};

router.get(
  '/',
  rescue(async (req, res) => {
    const talkers = await lerArquivo();
    if (!talkers) {
      res.status(200).json([]);
    }
    res.status(200).json(talkers);
  }),
);

module.exports = router;
