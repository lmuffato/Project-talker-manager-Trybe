const express = require('express');

const util = require('util');

const fs = require('fs');

const writeFile = util.promisify(fs.writeFile);

const bodyParser = require('body-parser');

const getStuff = require('./utils/read');

const { HTTP_OK_STATUS, PORT, TALKER, NOT_FOUND } = require('./utils/consts');

const { generateToken,
  emailValidate,
  passwordValidate,
  tokenValidate,
  nameValidate,
  ageValidate,
  talkValidate,
  watchedAtValidate } = require('./utils/middlewares');

const app = express();

app.use(bodyParser.json());

app.get('/talker', (_request, response) => {
  getStuff(TALKER).then((content) => {
    response.status(HTTP_OK_STATUS).send(JSON.parse(content));
  });
});

app.get('/talker/:id', (request, response) => {
    const { id } = request.params;
    getStuff(TALKER).then((content) => {
      const jsonData = JSON.parse(content);
      const talker = jsonData.find((t) => t.id === parseInt(id, 10));
      if (talker) {
        response.status(HTTP_OK_STATUS).send(talker); 
      } else {
        response.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
      }
  });
});

app.post('/login', emailValidate, passwordValidate, (request, response) => {
  const token = generateToken();
  response.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', tokenValidate, nameValidate, ageValidate, talkValidate, watchedAtValidate,
  async (request, response) => {
  const talker = request.body;

  await getStuff(TALKER).then((content) => {
    const jsonData = JSON.parse(content);

    const id = JSON.parse(content).length + 1;

    Object.assign(talker, { id });

    jsonData[id - 1] = talker;
    
    writeFile(TALKER, JSON.stringify(jsonData), 'utf8', (err) => {
      if (err) console.log('Error writing file:', err);
    });
      response.status(HTTP_OK_STATUS).json(talker);
  });
});

app.put('/talker/:id', tokenValidate, nameValidate, ageValidate, talkValidate, watchedAtValidate,
  async (request, response) => {
  const { id } = request.params;
  const { name, age, talk } = request.body;
  getStuff(TALKER).then((content) => {
    const jsonData = JSON.parse(content);
    let updateTalker = jsonData.find((t) => t.id === parseInt(id, 10));
    updateTalker = { id: parseInt(id, 10), name, age, talk };
    Object.assign(jsonData, jsonData.map((el) => (el.id === updateTalker.id ? updateTalker : el)));
    writeFile(TALKER, JSON.stringify(jsonData), 'utf8', (err) => {
      if (err) console.log('Error writing file:', err);
    });
      response.status(HTTP_OK_STATUS).json(updateTalker);
  });
});

app.delete('/talker/:id', tokenValidate, async (request, response) => {
  const { id } = request.params;
  getStuff(TALKER).then((content) => {
    let jsonData = JSON.parse(content);
    jsonData = jsonData.filter((obj) => obj.id !== parseInt(id, 10));
    writeFile(TALKER, JSON.stringify(jsonData), 'utf8', (err) => {
      if (err) console.log('Error writing file:', err);
    });
    response.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
  });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
