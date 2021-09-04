const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const getPalestrantes = async () => {
  const palestrantes = await fs.readFile('./talker.json', 'utf-8');
  if (!palestrantes) {
    return JSON.parse([]);
  } return JSON.parse(palestrantes);
};

router.get('/', async (_req, res) => {
  const palestrantes = await getPalestrantes();
  res.status(200).json(palestrantes);
});

module.exports = router;