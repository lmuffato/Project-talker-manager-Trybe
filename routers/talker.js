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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const palestrantes = await getPalestrantes();
  const idPalestrantes = palestrantes.find((idP) => idP.id === Number(id));
  if (!idPalestrantes) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(idPalestrantes);
});

module.exports = router;