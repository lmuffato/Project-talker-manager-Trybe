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

/* async function getDados(_req, res, next) {
   try { 
    const response = await fs.readFile('./talke.json', 'utf-8');
    res.status(200).json(JSON.parse(response));
   // if (!response || response === '') return res.status(400).json({ message: 'Invalid data!' }); 
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
  next();
}

app.get('/talker', getDados, (req, res) => {
   try { 
       res.status(200).json(JSON.parse(getDados));
} catch (e) {
  res.status(500).json({ message: 'Pessoa palestrante não encontrada' });
} 
}); */
// at1
app.get('/talker', async (req, res) => {
  try {
      const response = await fs.readFile('./talker.json', 'utf-8');
      res.status(200).json(JSON.parse(response));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// at2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const response = await fs.readFile('./talker.json', 'utf-8');
      const arrayOfTalkers = JSON.parse(response);
      const filterId = arrayOfTalkers.find((talker) => talker.id === +id);
      if (!filterId) {
        return res.status(404).json(
            { message: 'Pessoa palestrante não encontrada' },
          );  
      } 
      res.status(200).json(filterId);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// at3
app.post('/login', (req, res) => { 
  /* const { email, senha } = req.body; */

const token = { token: '7mqaVRXJSp886CGr' };
res.status(200).json(token); 
});

app.listen(PORT, () => {
  console.log('Online');
});
