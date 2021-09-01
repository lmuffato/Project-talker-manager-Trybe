const crypto = require('crypto');

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const {
  validateEmail,
  validatePassword,
  validateName,
  validateToken,
  validateWatchedAtAndRate,
  validateAge,
  validateTalk } = require('./validate/index');

const read = async () => {
const data = await fs.readFile('./talker.json', 'utf8').catch(() => []);
return JSON.parse(data);
};
async function write(newFile) {
  const setFile = await fs.writeFile('./talker.json', JSON.stringify(newFile));
  return setFile;
  } 

function generateToken() {
return crypto.randomBytes(8).toString('hex');
}
function maxId(arr) {
  const maxID = arr.reduce(
     (accumulator, currentValue) => (accumulator.id 
      > currentValue.id ? accumulator.id : currentValue.id),
 );
 return maxID;
}

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

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const newToken = generateToken();
  res.status(HTTP_OK_STATUS).json({ token: newToken });
  });

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await read();
  const talkerId = data.findIndex((talker) => talker.id === +id);

  if (talkerId === -1) {
 return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
}

  res.status(HTTP_OK_STATUS).json(data[talkerId]);
});

app.post('/talker', 
validateTalk, validateName, validateToken, validateWatchedAtAndRate, validateAge,
   async (req, res) => {
  const { name, age, talk } = req.body;
  const data = await read();
  const max = maxId(data) || 0;
  const id = max + 1;
  const newObj = ({ name, age, id, talk });
  data.push(newObj);
  write(data);

  return res.status(201).json(newObj);
});

app.put('/talker/:id',
validateToken, validateTalk, validateName, validateWatchedAtAndRate, validateAge, 
async (req, res) => {
  const { id } = req.params;
  const data = await read();
  const { name, age, talk } = req.body;
  const talkerIndex = data.findIndex((talker) => talker.id === +id);
  if (talkerIndex === -1) return res.status(404).json({ message: 'Talker not found!' });

  data[talkerIndex].name = name;
  data[talkerIndex].age = age;
  data[talkerIndex].talk = talk;
  write(data);

  res.status(HTTP_OK_STATUS).json(data[talkerIndex]);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const data = await read();
  const talkerIndex = data.findIndex((talker) => talker.id === +id);
  if (talkerIndex === -1) return res.status(404).json({ message: 'Talker not found!' });
  data.splice(talkerIndex, 1);
  write(data);

  res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, async () => {
  console.log('Online');
});
