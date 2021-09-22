const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/talker');
const loginRoute = require('./routes/login');
const STATUS = require('./status/http_status');

const app = express();
app.use(bodyParser.json());
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(STATUS.SUCCESS.OK).send();
});
app.use('/talker', routes);
app.use('/login', loginRoute);

app.listen(PORT, () => {
  console.log(`We are running and ready to rock on ${PORT}`);
});
