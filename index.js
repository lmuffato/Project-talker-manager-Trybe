const express = require('express');
const bodyParser = require('body-parser');
const { fileReader, fileWrite } = require('./fileManager');
const { validEmail, 
  validPassword, 
  validateName, 
  validateNameSize, 
  validateMinority, 
  validateage, 
  validDate,
  validateRate,
  validateTalk,
  validateToken,
} = require('./validation');

/* const validation = [validEmail, 
  validPassword, 
  validateName, 
  validateNameSize, 
  validateMinority, 
  validateage, 
  validDate,
  validateRate]; */
  
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

 app.post('/login', validEmail, validPassword, (req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' }); 
}); 
// at 4:
app.post('/talker',
validateToken,
validateTalk,
validateName, 
validateNameSize, 
validateMinority, 
validateage, 
validDate,
validateRate,
 async (req, res) => {
  const { name, age, talk } = req.body;
  try {
    const arrayOfTalkers = await fileReader();
    const data = { name, age, talk, id: arrayOfTalkers.length + 1 };
    const dataAdd = [...arrayOfTalkers, data];
    await fileWrite(dataAdd);
    return res.status(201).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});