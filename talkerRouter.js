const fs = require('fs').promises;
const express = require('express');

const router = express.Router();

router.get('/', (_req, res) => {
  fs.readFile('./talker.json')
    .then((result) => res.status(200).json(JSON.parse(result)))
    .catch((err) => res.status(404).json({ message: err.message }));
});

router.get('/:id', (req, res) => {
  fs.readFile('./talker.json')
    .then((result) => JSON.parse(result))
    .then((result) => result.filter((entry) => entry.id === +req.params.id))
    .then((result) => {
      if (result.length > 0) {
        res.status(200).send(result[0]);
      } else {
        throw new Error('Pessoa palestrante não encontrada');
      }
    })
    .catch((err) => res.status(404).json({ message: err.message }));
});

module.exports = router;
