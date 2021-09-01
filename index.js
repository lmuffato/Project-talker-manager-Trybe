const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const { getAllTalkers /* createUserLogin */ } = require('./fsFunctions');
const { createToken, validateEmail, validatePassword } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get(
  '/talker',
  rescue(async (_req, res) => {
    const fileTalkers = await getAllTalkers();
    if (fileTalkers.length === 0) return res.status(HTTP_OK_STATUS).json([]);
    res.status(HTTP_OK_STATUS).json(fileTalkers);
  }),
);

app.get(
  '/talker/:id',
  rescue(async (req, res) => {
    const fileTalkers = await getAllTalkers();
    console.log(fileTalkers);
    const { id } = req.params;
    const talker = fileTalkers.find((t) => t.id === parseFloat(id));
    
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

    res.status(HTTP_OK_STATUS).json(talker);
  }),
);

app.post('/login', createToken, validateEmail, validatePassword, (req, res) => {
  const { token } = req;
  res.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
