const express = require('express');
const bodyParser = require('body-parser');

const talkerController = require('./controller/TalkerController');

const { HTTP_OK_STATUS, PORT } = require('./config/Server');
const { ROUTE_BASE, ROUTE_TALKER_BASE } = require('./config/Routes');

const app = express();
app.use(bodyParser.json());

app.get(ROUTE_BASE, (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use(ROUTE_TALKER_BASE, talkerController);

app.listen(PORT, () => {
  console.log('Online');
});
