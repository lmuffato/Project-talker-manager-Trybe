const express = require('express');
const bodyParser = require('body-parser');

const { HTTP_OK_STATUS } = ('./utils/statusHttp');
const { fetchTalker } = require('./middlewares/fetchTalker');
const { validateLogin } = require('./middlewares/validation');
const { talkerById } = require('./middlewares/talkerById');
const { authentication } = require('./middlewares/authentication');
const { newTalker } = require('./middlewares/newTalker');
const { nameTalker } = require('./middlewares/nameTalker');
const { talkerAge } = require('./middlewares/talkerAge');
const { watchedAndRate } = require('./middlewares/watchedAndRate');
const { watchedTalker } = require('./middlewares/watchedTalker');
const { rateTalker } = require('./middlewares/rateTalker');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', fetchTalker);

app.get('/talker/:id', talkerById);

app.post('/login', validateLogin);

app.post('talker', authentication, nameTalker, talkerAge, watchedAndRate, watchedTalker, 
rateTalker, newTalker);

app.listen(PORT, () => {
  console.log('Online');
});
