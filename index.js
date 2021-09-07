const express = require('express');

const util = require('util');

const fs = require('fs');

const writeFile = util.promisify(fs.writeFile);

const bodyParser = require('body-parser');

// const { parse } = require('path');
// const { error } = require('console');
// const { response } = require('express');
// const { throws } = require('assert');
const getStuff = require('./utils/read');

const { HTTP_OK_STATUS, PORT, TALKER, NOT_FOUND } = require('./utils/consts');

const { generateToken,
  emailValidate,
  passwordValidate,
  tokenValidate,
  nameValidate,
  ageValidate,
  talkValidate } = require('./utils/middlewares');

const app = express();

app.use(bodyParser.json());

// const routes = require('./routes')(app, fs);

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

app.post('/talker', tokenValidate, nameValidate, ageValidate, talkValidate,
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

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
