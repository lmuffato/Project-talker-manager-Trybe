const express = require('express');
const bodyParser = require('body-parser');
const { querySearch, queryId, fullQuery, queryPush, queryChange, 
  queryDelete } = require('./controller/controller');
const loginPost = require('./routes/login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/login', loginPost);
app.get('/talker', fullQuery);
app.get('/talker/search', querySearch);
app.get('/talker/:id', queryId);
app.post('/talker', queryPush);
app.put('/talker/:id', queryChange);
app.delete('/talker/:id', queryDelete);

app.listen(PORT, () => {
  console.log('Online');
});
