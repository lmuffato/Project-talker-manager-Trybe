const express = require('express');
const bodyParser = require('body-parser');
const fileReader = require('./fileManager');
/* const validEmail = require('./validEmail'); */

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = await fileReader();
  res.status(200).json(talkers || []);
});

// at2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const arrayOfTalkers = await fileReader();
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

/* app.post('/login', validEmail, (req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' }); 
}); */

// at3
 app.post('/login', (req, res, next) => {
     const { email } = req.body;
    const re = /\S+@\S+\.\S+/;
    const regex = re.test(email);
    if (!email || email === '') {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (regex === false) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
      next();
  },
  (req, res, next) => {
    const { password } = req.body;
    if (!password || password === '') {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
      next();
    }, 
  (req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' }); 
}); 

app.listen(PORT, () => {
  console.log('Online');
});