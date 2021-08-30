const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const ERROR_404 = {
  message: 'Pessoa palestrante não encontrada',
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Requisito 1
app.get('/talker', async (_req, res) => {
  try {
    const request = await fs.readFile('./talker.json', 'utf-8').then((r) => JSON.parse(r));
    // const talkers = JSON.parse(request);
    res.status(200).json(request);
  } catch (_err) {
    res.status(200).json([]);
  }
});

// Requisito 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const request = await fs.readFile('./talker.json', 'utf-8').then((r) => JSON.parse(r));
  const findTalker = request.find((e) => e.id === Number(id));

  if (!findTalker) return res.status(404).json(ERROR_404);

  res.status(200).json(findTalker);
});