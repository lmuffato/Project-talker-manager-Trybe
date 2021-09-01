const express = require('express');
const bodyParser = require('body-parser');
const talkerRouter = require('./routes/talker');
const loginRouter = require('./routes/login');
const rescue = require('./middleware/rescue');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.use('/talker', rescue(talkerRouter));

app.use('/login', rescue(loginRouter));

app.use('*', (req, res) => { res.status(404).json({ message: 'Page not found' }); });
