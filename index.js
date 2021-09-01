const express = require('express');
const bodyParser = require('body-parser');
const fsAsync = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

async function showTalkerById(req, res) {
  try {
    const { id } = req.params;
    const resp = await fsAsync.readFile('./talker.json', 'utf-8');
    const respJson = JSON.parse(resp);
    const filteredTalker = respJson.find((e) => e.id === parseInt(id, 10));
    if (!filteredTalker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(filteredTalker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

app.get('/talker/:id', showTalkerById);

async function showTalkers(_req, res) {
  try {
    const resp = await fsAsync.readFile('./talker.json', 'utf-8');
    if (!resp) return res.status(500).json({ message: 'no data found' });
    res.status(200).json(JSON.parse(resp));
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

app.get('/talker', showTalkers);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
