const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const talker = await fs.readFile('./talker.json', 'utf8');
  const result = await JSON.parse(talker);
  response.status(200).json(result);
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talker = await fs.readFile('./talker.json', 'utf-8');
  const result = await JSON.parse(talker);
  const pessoasPalestrantes = result.find((obj) => obj.id === parseInt(id, 0));
  if (!pessoasPalestrantes) {
    return response.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  response.status(200).json(pessoasPalestrantes);
});

const SECRET = 'xablau';

app.post('/login', (request, response) => {
  if (request.body.email === 'email@email.com'
   && request.body.password === '123456') {
    const token = response.sign({ userId: 1 }, SECRET, { expiresIn: 300 });
    response.json({ auth: true, token });
   }
   response.status(401).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
