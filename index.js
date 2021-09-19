const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const utils = require('./utils/fs-utils');
const validation = require('./utils/validation');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker/search', validation.authenticateRequest, async (req, res) => {
  try {
    let talkers = await utils.getData();

    if (req.query.q) {
      talkers = talkers.filter(({ name }) => name.includes(req.query.q));
    }

    if (!talkers) return res.status(HTTP_OK_STATUS).send([]);

    return res.status(HTTP_OK_STATUS).send(talkers);
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
    console.log(err);
  }
});

app.get('/talker', async (req, res) => {
  try {
    let talkers = await utils.getData();

    if (req.query.search) {
      talkers = talkers.filter(({ name }) => name.includes(req.query.search));
    }

    if (!talkers) return res.status(HTTP_OK_STATUS).send([]);

    return res.status(HTTP_OK_STATUS).send(talkers);
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
    console.log(err);
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await utils.getData();

    const talker = data.find((object) => object.id === Number(id));

    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

    return res.status(HTTP_OK_STATUS).send(talker);
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
    console.log(err);
  }
});

app.post('/login', validation.validateLogin, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  return res.status(HTTP_OK_STATUS).send({ token });
});

app.post('/talker', validation.authenticateRequest, validation.validateTalker, async (req, res) => {
  try {
    const previousTalkers = await utils.getData();
    const lastId = previousTalkers[previousTalkers.length - 1].id;
    const newTalker = {
      id: lastId + 1,
      ...req.body,
    };
    previousTalkers.push(newTalker);
    utils.writeData(previousTalkers);
    return res.status(201).send(newTalker);
  } catch (err) {
    console.log(err);
  }
});

app.put(
  '/talker/:id',
  validation.authenticateRequest,
  validation.validateTalker,
  async (req, res) => {
    const { id } = req.params;
    try {
      const talkers = await utils.getData();
      const others = talkers.filter((object) => object.id !== Number(id));
      const talker = {
      id: Number(id),
        ...req.body,
      };
      utils.writeData([...others, talker]);
      return res.status(200).send(talker);
    } catch (err) {
      console.log(err);
    }
  },
);

app.delete('/talker/:id', validation.authenticateRequest, async (req, res) => {
    const { id } = req.params;
    try {
      const talkers = await utils.getData();
      const others = talkers.filter((object) => object.id !== Number(id));
      utils.writeData([...others]);
      return res.status(200).json({
        message: 'Pessoa palestrante deletada com sucesso',
      });
    } catch (err) {
      console.log(err);
    }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
