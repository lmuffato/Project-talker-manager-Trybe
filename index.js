const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const read = async () => {
const data = await fs.readFile('./talker.json', 'utf8').catch(() => []);
return JSON.parse(data);
};  

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = await read();
  if (data.length === 0) return res.status(HTTP_OK_STATUS).json([]);
return res.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await read();
  const talkerId = data.findIndex((talker) => talker.id === +id);

  if (talkerId === -1) {
 return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
}

  res.status(200).json(data[talkerId]);
});

app.listen(PORT, async () => {
  // console.log(await read());
  console.log('Online');
});
