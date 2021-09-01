const express = require('express');
const bodyParser = require('body-parser');

const getAllTalkers = require('./middlewares/getAllTalkers');
const getTalkersId = require('./middlewares/getTalkersId');
const { validateEmail, validatePassword, validateName } = require('./middlewares/validations');
const { validateAge, validateTalk, validateRate } = require('./middlewares/validations');
const { validateToken, validateWatchedAt } = require('./middlewares/validations');
const generateToken = require('./utils/generateToken');
const talkerCreation = require('./middlewares/talker');
const editTalkers = require('./middlewares/putTalkers');
const delTalkers = require('./middlewares/delTalkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getAllTalkers);

app.get('/talker/:id', getTalkersId);

app.post('/login', validateEmail, validatePassword, generateToken);

const validate = [validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
];
app.post('/talker', validate, talkerCreation);

app.put('/talker/:id', validate, editTalkers);

app.delete('/talker/:id', validateToken, delTalkers);

app.listen(PORT, () => {
  console.log('Online');
});
