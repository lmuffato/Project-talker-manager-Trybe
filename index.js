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

const fileTalker = async () => {
  const file = await fs.readFile('talker.json');
  const arrayOfObejct = JSON.parse(file);
  return arrayOfObejct;
};

// Requirement 01
app.get('/talker', async (_req, res) => {
  try {
    const file = await fileTalker();
    res.status(200).json(file);
  } catch (e) {
    return res.status(200).json([]);
  }
});

// Requirement 02

app.get('/talker/:id', async (req, res) => {
   const { id } = req.params;
   const file = await fileTalker();
   const findById = file.find((elem) => elem.id === Number(id));
   if (!findById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
   res.status(200).json(findById); 
});

app.listen(PORT, () => {
  console.log('Online');
});
