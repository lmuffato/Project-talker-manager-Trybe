const express = require('express');

const bodyParser = require('body-parser');

const fs = require('fs');

const getStuff = require('./functions/read');
const { parse } = require('path');
const { error } = require('console');
const { response } = require('express');
const { throws } = require('assert');

const app = express();

app.use(bodyParser.json());

// const routes = require('./routes')(app, fs);

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const TALKER = './talker.json';
const NOT_FOUND = 404;

app.get('/talker', (_request, response) => {
  getStuff(TALKER).then(content => {
    response.status(HTTP_OK_STATUS).send(JSON.parse(content));
  })
});

app.get('/talker/:id', (request, response, next) => {
    const {id} = request.params;
    getStuff(TALKER).then(content => {
      const jsonData = JSON.parse(content);
      const talker = jsonData.find(t => t.id === parseInt(id))
      if(talker){
        response.status(HTTP_OK_STATUS).send(talker); 
      } else {
        response.status(NOT_FOUND).json({message: "Pessoa palestrante não encontrada"})
      }
  })
});


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
