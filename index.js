const express = require('express');
const bodyParser = require('body-parser');

const talkerController = require('./controller/TalkerController');
const loginController = require('./controller/LoginController');

const { HTTP_OK_STATUS, PORT } = require('./config/Server');
const { ROUTE_TALKER_BASE, ROUTE_LOGIN } = require('./config/Routes');

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use(ROUTE_TALKER_BASE, talkerController);
app.use(ROUTE_LOGIN, loginController);

app.listen(PORT, () => {
  console.log('Online');
});
