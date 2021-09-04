const express = require('express');

const router = express.Router();
const fs = require('fs').promises;
const {
  verifyLogin,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyDate,
  verifyRate,
} = require('../middlewares/middlewares');

const getPalestrantes = async () => {
  const palestrantes = await fs.readFile('./talker.json', 'utf-8');
  if (!palestrantes) {
    return JSON.parse([]);
  } return JSON.parse(palestrantes);
};

const setPalestrante = async (palestrante) => {
  await fs.writeFile('./talker.json', JSON.stringify(palestrante));
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

router.post(
  '/',
  verifyLogin,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyDate,
  verifyRate,
  async (req, res) => {
  const palestrantes = await getPalestrantes();
  const newPalestrante = { ...req.body, id: palestrantes.length + 1 };
  const updatePalestrante = [...palestrantes, newPalestrante];
  await setPalestrante(updatePalestrante);
  res.status(201).json(newPalestrante);
},
);

router.put('/:id', 
  verifyLogin,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyDate,
  verifyRate,
  async (req, res) => {
    const { id } = req.params;
    const palestrantes = await getPalestrantes();
    const idPalestrantes = palestrantes.filter((idP) => idP.id !== Number(id));
    const newPalestrante = { ...req.body, id: Number(id) };
    const updatePalestrante = [...idPalestrantes, newPalestrante];
    await setPalestrante(updatePalestrante);
  res.status(200).json(newPalestrante);
});

module.exports = router;