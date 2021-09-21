const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./talker');
const talkerId = require('./talkerId');
const { emailLogin, passwordLogin } = require('./login');
const authentication = require('./authentication');
const talkerName = require('./talkerName');
const ageTalker = require('./ageTalker');
const watchedTalker = require('./watchedTalker');
const rateTalker = require('./rateTalker');
const watchedAndRate = require('./watchedAndRate');
const newTalker = require('./newTalker');
const editTalker = require('./editTalker');
const deleteTalker = require('./deleteTalker');
const searchName = require('./searchName'); 

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talker);
app.get('/talker/search', authentication, searchName);
app.get('/talker/:id', talkerId);
app.post('/login', emailLogin, passwordLogin);
app.post(
  '/talker',
  authentication, talkerName, ageTalker, watchedAndRate, watchedTalker, rateTalker, newTalker,
);
app.put(
  '/talker/:id', authentication, talkerName, ageTalker, watchedAndRate, watchedTalker, rateTalker,
  editTalker,
);
app.delete(
  '/talker/:id', 
  authentication,
  deleteTalker,
);
app.listen(PORT, () => {
  console.log('Online');
});
